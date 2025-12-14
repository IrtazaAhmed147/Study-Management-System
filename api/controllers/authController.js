import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import { errorHandler, successHandler } from '../utils/responseHandler.js'
import bcrypt, { compare } from "bcryptjs";
import { generateEmail, generateForgotPassEmail, GenerateToken, VerifyEmailToken } from '../utils/commonFunctions.js';
import { nanoid } from 'nanoid'

export const register = async (req, res, next) => {

    const { username, email, password, fullname } = req.body

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
        if (user.isSuspend) {
            return successHandler(
                res,
                200,
                "Your account is suspended"
            );
        }
        if (user.isDeactivate) {
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

          let savedUser=  await user.save();

            // Send email
            const token = GenerateToken({ data: savedUser, expiresIn: '10m' });
            await generateEmail(user.email, otp);

            return successHandler(
                res,
                200,
                "Account exists but not verified. OTP sent for verification.",
                {tempToken:token}
            );
        }

        // 5. If verified → generate login token
        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: user.isAdmin },
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
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return errorHandler(res, 404, "User not found");

        // Create JWT token with 10 min expiry
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT,
            { expiresIn: "10m" }
        );

        // Store token in DB (optional but can be used to invalidate old tokens)
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        const link = `http://localhost:5173/reset-password?token=${token}`;
        
        // Send email
        await generateForgotPassEmail(user.email, link);

        return successHandler(res, 200, "Password reset link sent to your email");
    } catch (error) {
        console.error(error);
        return errorHandler(res, 500, "Something went wrong");
    }
};
export const resetPass = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token) return errorHandler(res, 400, "Token is required");

        // Verify JWT token
        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return errorHandler(res, 401, "Link has expired");
            }
            return errorHandler(res, 400, "Invalid link");
        }

        // Find user by token and check expiry
        const user = await User.findOne({
            _id: payload.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) return errorHandler(res, 400, "Invalid or expired token");

        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        user.password = hash;

        // Remove reset token
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        return successHandler(res, 200, "Password changed successfully");
    } catch (error) {
        console.error(error);
        return errorHandler(res, 500, "Something went wrong");
    }
};

