const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const app = express();

app.use(express.json());
app.use(express.static("public")); // serves index.html

// Gmail transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "YOUR_GMAIL@gmail.com",
        pass: "YOUR_APP_PASSWORD"
    }
});

// Send ticket route
app.post("/send-ticket", async (req, res) => {
    const email = req.body.email;
    const ticket = crypto.randomBytes(20).toString("hex");

    const verifyLink = `http://localhost:3000/verify.html?ticket=${ticket}`;

    await transporter.sendMail({
        from: "YOUR_GMAIL@gmail.com",
        to: email,
        subject: "Your Verification Ticket",
        html: `
            <h2>Your Verification Ticket</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyLink}">Verify Account</a>
        `
    });

    res.json({ message: "Verification ticket sent to your email!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
