import nodemailer from "nodemailer";

async function testSMTP() {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: "info@codeclub.tech",
      pass: "Codeclub@68",
    },
  });

  await transporter.verify();
  console.log("✅ SMTP connected successfully");
}

testSMTP().catch(console.error);
