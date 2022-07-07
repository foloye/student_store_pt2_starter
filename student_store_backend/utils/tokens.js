const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../config")

const generateToken = (data) => jwt.sign(data, SECRET_KEY, { algorithm: "HS256", expiresIn: "24h" })

const createUserJwt = (user) => {
// takes user and creates payload of users email and admin status
//returns result of calling generatetoken on it
    const payload = {
        email:user.email,
        isAdmin: user.isAdmin || false,
    }
    return generateToken(payload)
}

const validateToken = (token) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch (err) {
        return {}
    }
}



module.exports = {
    generateToken,
    createUserJwt,
    validateToken,
}