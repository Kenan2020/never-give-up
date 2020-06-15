const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.get("SENDGRID_API_KEY"));

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('userName', 'User Name is required').not().isEmpty(),
    // check('name', 'Name is required').not().isEmpty(),
    // check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userName,
      email,
      password
    } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      const token = jwt.sign({
        userName,
        email
      }, config.get('JWT_ACCOUNT_ACTIVATION'), {
        expiresIn: '6h'
      });

      user = new User({
        userName,
        email,
        avatar,
        password,
        activateLink:token
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();


         const emailData = {
           from: config.get('EMAIL_FROM'),
           to: email,
           subject: `Account activation link`,
           html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${config.get('CLIENT_URL')}/user/activate/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${config.get('CLIENT_URL')}</p>
            `
         };

         sgMail
           .send(emailData)
           .then(sent => {
             // console.log('SIGNUP EMAIL SENT', sent)
             return res.json({
               message: `Email has been sent to ${email}. Follow the instruction to activate your account`
             });
           })
           .catch(err => {
             // console.log('SIGNUP EMAIL SENT ERROR', err)
             return res.json({
               message: err.message
             });
           });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }





  }
);

router.post('/account-activation', (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, config.get('JWT_ACCOUNT_ACTIVATION'), (err, decoded) => {
      if (err) {
        console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
        return res.status(401).json({
          error: 'Expired link. Signup again'
        });
      }
    });


    let user = User.findOne({activateLink:token})

    user.updateOne({
      activated: true,
      activateLink:''
    });

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'), {
        expiresIn: '5 days'
      },
      (err, token) => {
        if (err) throw err;
        res.json({
          token
        });
      }
    );

  } else {
    return res.json({
      message: 'Something went wrong. Try again.'
    });
  }

})


router.post('/forgotpassword', [
  check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be a valid email address')
],

  async (req, res) => {

    console.log(req.body.email)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    let user = await User.findOne({ email });

    if (user) {


      const token = jwt.sign({
            _id: user._id,
            userName: user.userName
          }, config.get('JWT_RESET_PASSWORD'), {
        expiresIn: '8h'
      });

      const emailData = {
        from: config.get('EMAIL_FROM'),
        to: email,
        subject: `Password Reset link`,
        html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${config.get('CLIENT_URL')}/user/resetpassword/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${config.get('CLIENT_URL')}</p>
            `
      };

      user.updateOne({ resetPasswordLink: token }, (err, success) => {
        if (err) {
          console.log('RESET PASSWORD LINK ERROR', err);
          return res.status(400).json({
            error: 'Database connection error on user password forgot request'
          });
        } else {
          sgMail
            .send(emailData)
            .then(sent => {
              // console.log('SIGNUP EMAIL SENT', sent)
              return res.json({
                message: `Email has been sent to ${email}. Follow the instruction to activate your account`
              });
            })
            .catch(err => {
              // console.log('SIGNUP EMAIL SENT ERROR', err)
              return res.json({
                message: err.message
              });
            });
        }
      });



    } else {

      return res.status(400).json({
        error: 'User with that email does not exist'
      });

    }

  })


router.post('/resetpassword', [
  check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least  6 characters long')
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { resetPasswordLink, newPassword } = req.body


  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, config.get('JWT_RESET_PASSWORD'), (err, decoded) => {
      if (err) {
        return res.status(400).json({
          error: 'Expired link. Try again'
        });
      }
    });

    let user = User.findOne({ resetPasswordLink });

    if (!user) {
      return res.status(400).json({
        error: 'Token is not valid'
      });
    }

    const salt = await bcrypt.genSalt(10);

    newPasswordHashed = await bcrypt.hash(newPassword, salt);

    const updatedFields = {
      password: newPasswordHashed,
      resetPasswordLink: ''
    };

    user.updateOne(updatedFields, (err, result) => {
      if (err) {
        return res.status(400).json({
          error: 'Error resetting user password'
        });
      }
      res.json({
        message: `Great! Now you can login with your new password`
      });
    });
  }

})

module.exports = router;
