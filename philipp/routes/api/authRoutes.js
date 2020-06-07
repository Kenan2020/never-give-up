const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('config');
module.exports = (app) => {
    //Spicfig thing to access google
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
        })
    );
    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {


            res.redirect('/googlecheck')
        }
    );

    app.use('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })

    app.get('/api/current_user', (req, res) => {
        //Call the session cookies 
        // res.send(req.session)
        const payload = {
            user: {
                id: req.user._id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        // console.log(req.user)
        // res.send(req.user);

    })


    //Facebook Router

    app.get(
        "/auth/facebook",
        passport.authenticate("facebook", {
            scope: ["profile", "email"],
        })
    );
    app.get(
        "/auth/facebook/callback",
        passport.authenticate("facebook"),
        (req, res) => {


            res.redirect('/')
        }
    );

    app.use('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })

    app.get('/api/current_facebook_user', (req, res) => {
        //Call the session cookies 
        // res.send(req.session)
        const payload = {
            user: {
                id: req.user._id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        // console.log(req.user)
        // res.send(req.user);

    })

}
