const router = require("express").Router()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const UserModel = require("../models/user.model")

router.route('/login').post((req, res) => {
    const { username } = req.body

    UserModel.find({ username: username })
        .then(user => {
            if (user && user[0]) {
                const { password } = req.body
                const md5Password = crypto.createHash('md5').update(password).digest('hex')

                if (user[0].password === md5Password) {
                    const payload = { userId: user[0]._id }
                    const token = jwt.sign(payload, process.env.TOKEN_SECRET,
                    { expiresIn: 60 * 60 })

                    user[0].token = token
                    user[0].save().then().catch(error => res.status(400).json('error: ' + error))

                    res.json({ status: 'success', token: token })
                } else {
                    res.status(400).json({ status: 'error', message: 'username or password is wrong - 1' })
                }
            } else {
                res.status(400).json({ status: 'error', message: 'username or password is wrong - 2' })
            }
        })
        .catch(error => res.status(400).json('error: ' + error))
})

module.exports = router