const sgMail = require('../services/sendgridService')

exports.sendEmail = async (req, res) => {
  const {
    to,
    subject,
    text,
    html,
    sandboxMode = false,
  } = req.body

  const msg = {
    to,
    from: 'dariomaximilianojimenez@gmail.com',
    subject,
    text,
    html,
    mail_settings: {
      sandbox_mode: {
        enable: sandboxMode,
      },
    },
  }

  try {
    await sgMail.send(msg)
  } catch (err) {
    return res.status(400).json({ ok: false, msg: 'ERROR SENDING E-MAIL WITH THE SENDGRID API' })
  }

  return res.status(201).json({ ok: true, msg: 'SUCCESS SENDING E-MAIL WITH THE SENDGRID API' })
}
