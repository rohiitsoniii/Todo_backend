import nodemailer from "nodemailer";

const sendEmail = async (email, subject, message) => {

    console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
    try {
      const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          user: process.env.EMAIL, 
          pass: process.env.EMAIL_PASSWORD, 
        },
      });
  
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject,
        text: message,
      });
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw new Error('Email could not be sent');
    }
  };

  export default sendEmail