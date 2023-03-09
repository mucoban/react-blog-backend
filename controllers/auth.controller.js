const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

const checkUserAuthentication  = async (req, res, next) => {
        const errors = []
        const token = req.header('authorization').replace('Bearer ', '')
        let payload = ''

        if (!token) errors.push('token missing')
        else {
               payload = jwt.decode(token, process.env.TOKEN_SECRET)
               if (!payload) errors.push('invalid token')
               else if (parseInt(payload.exp + '000') < Date.now()) errors.push('token expired')
        }

        if (errors.length) { res.status(401).json({ status: 'error', message: errors[0]}) }
        else {
            UserModel.findById(payload.userId).then(user => {
                if (!user || !user.status) errors.push('user not found')
                else if (user.token !== token) errors.push('invalid token')

                if (errors.length) { res.status(401).json({ status: 'error', message: errors[0]}) }
                else next()
            })
        }

}

module.exports = { checkUserAuthentication }