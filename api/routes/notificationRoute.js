import express from "express";
import { sendPushNotification } from "../utils/webPush.js";
import subscriptionModel from "../models/SubscriptionModel.js";
import quizModel from "../models/quizModel.js";
import assignmentsModel from "../models/assignmentsModel.js";
// import SubscriptionModel from "../models/SubscriptionModel.js";
// import SubscriptionModel from "../models/subscriptionModel.js"; // store subscriptions in DB

const notificationRouter = express.Router();

// Save user subscription
notificationRouter.post("/subscribe", async (req, res) => {
    try {
        const { userId, subscription } = req.body;
        await subscriptionModel.findOneAndUpdate(
            { userId },
            { subscription },
            { upsert: true }
        );
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Trigger notification (example: after uploading resource)
notificationRouter.post("/notify/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, message } = req.body;

        const sub = await subscriptionModel.findOne({ userId });
        if (!sub) return res.status(404).json({ error: "User subscription not found" });

        await sendPushNotification(sub.subscription, { title, message });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


notificationRouter.get("/notifyassignments", async (req, res) => {
    try {
        const now = new Date();

        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);

        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(todayStart.getDate() + 1);

        const tomorrowEnd = new Date(todayEnd);
        tomorrowEnd.setDate(todayEnd.getDate() + 1);

        const twoDaysAfterStart = new Date(todayStart);
        twoDaysAfterStart.setDate(todayStart.getDate() + 2);

        const twoDaysAfterEnd = new Date(todayEnd);
        twoDaysAfterEnd.setDate(todayEnd.getDate() + 2);

        // ---------------------------------
        // 1) Assignments due in 2 days
        // ---------------------------------
        const assignmentsTwoDays = await assignmentsModel.find({
            dueDate: { $gte: twoDaysAfterStart, $lte: twoDaysAfterEnd }
        });

        // ---------------------------------
        // 2) Assignments due tomorrow (Night Reminder)
        // ---------------------------------
        let assignmentsNight = [];
        if (now.getHours() >= 20) {
            assignmentsNight = await assignmentsModel.find({
                dueDate: { $gte: tomorrowStart, $lte: tomorrowEnd }
            });
        }

        // ---------------------------------
        // 3) Assignments due today (Morning Reminder)
        // ---------------------------------
        let assignmentsTodayMorning = [];
        if (now.getHours() >= 8 && now.getHours() <= 12) {
            assignmentsTodayMorning = await assignmentsModel.find({
                dueDate: { $gte: todayStart, $lte: todayEnd }
            });
        }

        // Send function
        const sendReminder = async (assignment, message) => {
            for (let userId of assignment.assignedUsers) {
                const subscription = await subscriptionModel.findOne({ userId });
                if (!subscription) continue;

                await sendPushNotification(subscription.subscription, {
                    title: "Assignment Reminder",
                    message
                });
            }
        };

        // 2 Days before
        for (let assignment of assignmentsTwoDays) {
            await sendReminder(
                assignment,
                `${assignment.title} is due in 2 days! Complete it early.`
            );
        }

        // Tomorrow night
        for (let assignment of assignmentsNight) {
            await sendReminder(
                assignment,
                `${assignment.title} is due tomorrow! Don't forget to finish it.`
            );
        }

        // Today morning
        for (let assignment of assignmentsTodayMorning) {
            await sendReminder(
                assignment,
                `${assignment.title} is due today! Submit before the deadline.`
            );
        }

        return res.status(200).json({
            success: true,
            message: "Assignment reminders processed successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
notificationRouter.get("/notifycheck", async (req, res) => {
    try {
        const now = new Date();

        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);

        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(todayStart.getDate() + 1);

        const tomorrowEnd = new Date(todayEnd);
        tomorrowEnd.setDate(todayEnd.getDate() + 1);

        const twoDaysAfterStart = new Date(todayStart);
        twoDaysAfterStart.setDate(todayStart.getDate() + 2);

        const twoDaysAfterEnd = new Date(todayEnd);
        twoDaysAfterEnd.setDate(todayEnd.getDate() + 2);

        // ------------------------------
        // 1) QUIZZES DUE IN 2 DAYS
        // ------------------------------
        const quizzesTwoDays = await quizModel.find({
            dueDate: { $gte: twoDaysAfterStart, $lte: twoDaysAfterEnd }
        });

        // ------------------------------
        // 2) QUIZZES DUE TOMORROW (Night Reminder)
        // Send only after 8 PM
        // ------------------------------
        let quizzesNight = [];
        if (now.getHours() >= 20) {
            quizzesNight = await quizModel.find({
                dueDate: { $gte: tomorrowStart, $lte: tomorrowEnd }
            });
        }

        // ------------------------------
        // 3) QUIZZES DUE TODAY (Morning Reminder)
        // Send between 8 AM – 12 PM only
        // ------------------------------
        let quizzesTodayMorning = [];
        if (now.getHours() >= 8 && now.getHours() <= 12) {
            quizzesTodayMorning = await quizModel.find({
                dueDate: { $gte: todayStart, $lte: todayEnd }
            });
        }

        // ------------------------------
        // SEND NOTIFICATIONS
        // ------------------------------
        const sendReminder = async (quiz, message) => {
            for (let userId of quiz.assignedUsers) {
                const subscription = await subscriptionModel.findOne({ userId });
                if (!subscription) continue;

                await sendPushNotification(subscription.subscription, {
                    title: "Quiz Reminder",
                    message
                });
            }
        };

        // 2 Days Before
        for (let quiz of quizzesTwoDays) {
            await sendReminder(quiz, `${quiz.title} is due in 2 days!`);
        }

        // 1 Day Before – Night Reminder
        for (let quiz of quizzesNight) {
            await sendReminder(quiz, `${quiz.title} is due tomorrow! Don't forget.`);
        }

        // Today Morning Reminder
        for (let quiz of quizzesTodayMorning) {
            await sendReminder(quiz, `${quiz.title} is due today! Complete it soon.`);
        }

        return res.status(200).json({
            success: true,
            message: "All reminders processed successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});


export default notificationRouter;
