let nodemailer = require("nodemailer");

const sendEmail = async (email, password) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chakwal.is.city@gmail.com",
      pass: "usama@1234",
    },
  });

  let mailOptions = {
    from: `${email}`,
    to: `${email}`,
    subject: `WELLCOME BY CLUB`,
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            
            <style>
            .main{
              display: block;
              width: 500px;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
          }
          .title{
              font-size: 18px;
              font-weight: 500;
          }
          .message{
              font-size: 14px;
          }
          .code{
            font-size: 18px;
            font-weight: 800;
          }
      
                
        
            </style>
        </head>
        <body>
         
            <div class="main">
               <h1 class="title">Hi Wellcome by the club here your login details</h1>
               <p class="message">Email : ${email}</p>
               <h1 class="code">Password : ${password}</h1>
            </div>
          
        </body>
        </html>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
