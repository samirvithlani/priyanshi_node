const nodemailer = require("nodemailer");

// ---------- CONFIG ----------
const EMAIL_USER = "info.grownited@gmail.com";
const EMAIL_PASS = "fjbp arfu ewil qtne"; // Gmail App Password

// ---------- TRANSPORTER ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

// ---------- SEND MAIL FUNCTION ----------
async function sendMailFn(data) {
  const {
    email,
    fullName,
    projectTitle,
    mentor,
    definitionMentor,
    //labName,
    abstractLink
  } = data;

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return transporter.sendMail({
    from: `"Grownited Project Team" <${EMAIL_USER}>`,
    to: email,
    subject: projectTitle, // ✅ SUBJECT = PROJECT TITLE
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .email-wrapper {
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      letter-spacing: 1px;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 14px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 35px;
    }
    .greeting {
      font-size: 16px;
      color: #2d3748;
      margin-bottom: 25px;
    }
    .greeting strong {
      color: #667eea;
      font-weight: 600;
    }
    .info-card {
      background: linear-gradient(135deg, #f6f8fb 0%, #eef2f7 100%);
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border-left: 5px solid #667eea;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
    }
    .info-row {
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
    }
    .info-row:last-child {
      margin-bottom: 0;
    }
    .info-label {
      font-weight: 700;
      color: #4a5568;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .info-value {
      color: #2d3748;
      font-size: 15px;
      font-weight: 500;
    }
    .link-section {
      background: #fff9e6;
      border-radius: 10px;
      padding: 20px;
      margin: 25px 0;
      border-left: 4px solid #f59e0b;
    }
    .link-section strong {
      display: block;
      color: #92400e;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .link-section a {
      color: #2563eb;
      text-decoration: none;
      word-break: break-all;
      font-size: 14px;
      font-weight: 500;
    }
    .link-section a:hover {
      text-decoration: underline;
    }
    .note-section {
      background: #f0fdf4;
      border-radius: 10px;
      padding: 20px;
      margin: 25px 0;
      border-left: 4px solid #10b981;
    }
    .note-section strong {
      display: block;
      color: #065f46;
      margin-bottom: 12px;
      font-size: 15px;
    }
    .note-section ul {
      margin: 0;
      padding-left: 20px;
      color: #064e3b;
    }
    .note-section li {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      background: #f9fafb;
      padding: 30px 35px;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .signature {
      color: #374151;
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 4px;
    }
    .company {
      color: #667eea;
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    @media only screen and (max-width: 600px) {
      body {
        padding: 20px 10px;
      }
      .header h1 {
        font-size: 26px;
      }
      .content {
        padding: 30px 25px;
      }
      .footer {
        padding: 25px 25px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    
    <div class="header">
      <h1>Grownited</h1>
      <p>Project Assignment Notification</p>
    </div>

    <div class="content">
      <p class="greeting">Hello <strong>${fullName}</strong>,</p>

      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Project Title : </span>
          <span class="info-value">${projectTitle}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Project Mentor : </span>
          <span class="info-value">${mentor}</span>
        </div>
        
        <div class="info-row">
          <span class="info-label">External Guide : </span>
          <span class="info-value">Rahul Kirpekar : </span>
          <span class="info-label">External Guide No : 78740 14621 </span>
        </div>
      </div>

      <div class="link-section">
        <strong>Abstract Link:</strong>
        <a href="${abstractLink}" target="_blank">${abstractLink}</a>
      </div>

      <div class="note-section">
        <strong>Note:</strong>
        <ul>
          <li>If any issue in definition, coordinate with the <strong>Definition Mentor</strong>.</li>
          <li>If any technical / coding / understanding issue, contact the <strong>Overall Mentor</strong>.</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">Best regards,</p>
      <p class="signature">Project Team</p>
      <p class="company">Grownited</p>
    </div>

  </div>
</body>
</html>
`
  });
}

module.exports = sendMailFn;