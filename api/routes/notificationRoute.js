import express from "express";
import { sendPushNotification } from "../utils/webPush.js";
import subscriptionModel from "../models/SubscriptionModel.js";
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

export default notificationRouter;
