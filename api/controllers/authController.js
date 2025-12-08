import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'
import bcrypt, { compare } from "bcryptjs";
import { generateEmail, GenerateToken, VerifyEmailToken } from '../utils/commonFunctions.js';
import { nanoid } from 'nanoid'

export const register = async (req, res, next) => {

    const { username, email, password,fullname } = req.body

    if (!username || !email || !password) return errorHandler(res, 400, "missing fields")

    try {

        const user = await User.findOne({ $or: [{ email: email }, { userName: username }] })
        if (user) {

            return errorHandler(res, 400, "UserName or Email Address already exists, please change and retry")
        }
        if (password.length < 8) {
            return errorHandler(res, 400, "Password length should be minimum 8 characters long")

        }




        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const doc = await User({
            fullname,
            username,
            email,
            password: hash
        })


        const otp = nanoid().slice(0, 6)
        doc.otp = otp
        doc.otpExpires = Date.now() + 600000; // OTP expires in 10 minutes
        doc.isVerified = false

        let savedUser = await doc.save();

        const token = GenerateToken({ data: savedUser, expiresIn: '10m' });

        if (savedUser) {
            const emailSent = await generateEmail(email, otp)

            return successHandler(res, 200, "Signed up Successfully, OTP send to your email address please verify", { ...savedUser, token: token })
        } else {
            return errorHandler(res, 500, "User did not saved")
        }

    } catch (error) {
        errorHandler(res, 500, error.message)
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Check missing fields
        if (!username || !password) {
            return errorHandler(res, 400, "Missing fields");
        }

        // 2. Check user exists
        const user = await User.findOne({ username });
        if (!user) {
            return errorHandler(res, 400, "Invalid Credentials");
        }

        // 3. Check password
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return errorHandler(res, 400, "Invalid Credentials");
        }

        // 4. Check if user is verified
        if(user.isSuspend){
            return successHandler(
                res,
                200,
                "Your account is suspended"
            );
        }
        if(user.isDeactivate){
            return successHandler(
                res,
                200,
                "Your account is deactivated"
            );
        }
        if (!user.isVerified) {

            // Generate OTP
            const otp = nanoid().slice(0, 6);

            user.otp = otp;
            user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

            await user.save();

            // Send email
            await generateEmail(user.email, otp);

            return successHandler(
                res,
                200,
                "Account exists but not verified. OTP sent for verification."
            );
        }

        // 5. If verified → generate login token
        const token = jwt.sign(
            { id: user._id, username: user.username ,isAdmin: user.isAdmin},
            process.env.JWT,
            { expiresIn: "7d" }
        );

        // Remove password before sending
        const { password: _, ...otherDetails } = user._doc;

        return res.status(200).json({
            success: true,
            status: 200,
            token,
            data: otherDetails,
            message: "User logged in successfully"
        });

    } catch (error) {
        return errorHandler(res, 500, error.message);
    }
};


export const logout = (req, res) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};



export const verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const token = req.header('Authorization');

    try {
        if (!token || !token.startsWith('Bearer')) {
            return errorHandler(res, 401, "No token provided");
        }

        const tokenString = token.split(" ")[1];

        let verifyingUser;
        try {
            verifyingUser = VerifyEmailToken(tokenString);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return errorHandler(res, 401, "Token has expired");
            }
            return errorHandler(res, 400, "Invalid token");
        }

        if (!verifyingUser) {
            return errorHandler(res, 404, "Invalid or expired verification data");
        }

        const userDetails = await User.findOne({
            _id: verifyingUser.result._id,
            otp,
            otpExpires: { $gt: new Date() }
        });

        if (!userDetails) {
            return errorHandler(res, 400, "OTP is invalid or expired");
        }

        await User.findByIdAndUpdate(userDetails._id, {
            isVerified: true,
            $unset: {
                otp: "",
                otpExpires: ""
            }
        });

        return res.status(200).json({ success: true, message: "OTP verified successfully" });

    } catch (error) {
        console.error("Server Error:", error);
        return errorHandler(res, 500, "Something went wrong");
    }
}