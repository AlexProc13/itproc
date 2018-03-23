

function sendMail(nodemailer, message) {
    nodemailer.createTestAccount((err, account) => {

        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // send mail with defined transport object
        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }

        });

    });
}

function imap(notifier, callback) {
    const imap = {
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASS,
        host: process.env.IMAP_HOST,
        port: process.env.IMAP_PORT,
        tls: true,
        tlsOptions: { rejectUnauthorized: true }
    };
    return imap;
}

module.exports = {sendMail: sendMail, imap: imap};
