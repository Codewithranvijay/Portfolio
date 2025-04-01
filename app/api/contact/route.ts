import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Configure email transporter
// For production, you'd use your actual SMTP credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ranvijay3325778@gmail.com", // Your email
    pass: process.env.EMAIL_PASSWORD, // Store this in your environment variables for security
  },
})

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    // Validate the data
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email content
    const mailOptions = {
      from: email,
      to: "ranvijay3325778@gmail.com",
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    }

    try {
      // Send email
      await transporter.sendMail(mailOptions)

      console.log("Email sent successfully to ranvijay3325778@gmail.com")

      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received. I will get back to you soon!",
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.error("Error sending email:", emailError)

      return NextResponse.json(
        {
          error: "Failed to send email, but your message was received.",
          details: emailError.message,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing contact form:", error)

    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}

