import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type Data = {
  message: string;
};

const sendMailHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try {
    const { fullName, email, company, phone, details } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "danielschaaf@skimohan.com", // Use your outlook email
        pass: "LoganEmmett23!!", // Use your email account password
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"Contact Form" <office@skiMohan.com>', // sender address
      to: "office@SkiMohan.com", // list of receivers
      subject: "New Contact Form Submission", // Subject line
      text: `You have a new submission from ${fullName} (${email}):
              Company: ${company}
              Phone: ${phone}
              Details: ${details}`,
    });

    if (info.messageId) {
      res.status(200).json({ message: "Email sent" });
    } else {
      res.status(500).json({ message: "Failed to send email" });
    }
  } catch (error) {
    const e = error as Error;
    res.status(500).json({ message: e.message || "Failed to send email" });
  }
};

export default sendMailHandler;
