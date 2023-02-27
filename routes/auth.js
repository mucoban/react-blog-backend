const router = require("express").Router()
const jwt = require("jsonwebtoken")

router.route('/login').get((req, res) => {
    const payload = { userId: 1 }
    token = jwt.sign(payload, '0pRRcYp514z7Cro1QO57sEakfdfKKLBNQsamdaDqKXlqa8oqiVrxSf9iQu00tBYE', {
        expiresIn: 60 * 60
    })

    res.json({
        status: 'success',
        token: token
    })
})

module.exports = router