const jwt = require("jsonwebtoken")
const comercio = require("../models/nosql/comercio")
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

const tokenCif = (comercio) => {
    const sign = jwt.sign(
        {
            CIF: comercio.CIF
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )
    return sign
}

const verifyToken = (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { tokenSign, tokenCif, verifyToken }