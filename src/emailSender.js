var nodemailer = require('nodemailer');

module.exports = function sendEmail (newItem) {

  if (newItem.email === undefined) {
    return;
  }

  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cis197project@gmail.com',
        pass: 'javascript'
      }
    });

    let mailOptions = {
        from: '"CIS 197" <cis197project@gmail.com>', // sender address
        to: newItem.email, // list of receivers
        subject: 'REMINDER: ' + body.newItem + ' is due soon!', // Subject line
        text: 'Hello ' + body.user + ', this is a reminder that your task ' + body.newItem + ' is due soon!', // plain text body
        html: 'Hello ' + body.user + ', <br /> <br /> this is a reminder that your task ' + body.newItem + ' is due soon!' // html body
    };

    let delayTime = 100;

    let d_now = Date.now();
    let dueDate = Date.parse(body.newDate) + (new Date()).getTimezoneOffset() * 60 * 10000;

    if (dueDate - d_now > 0) {
      delayTime = dueDate - d_now;
    }

  setTimeout(() => {transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                      });
    }, delayTime);
}