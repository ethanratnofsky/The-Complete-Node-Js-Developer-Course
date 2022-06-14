const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (request, response, next) => {
    try {
        // Get auth token
        const token = request.header('Authorization').replace('Bearer ', '')

        // Verify and decode token
        const decoded = jwt.verify(token, 'thisismysign')

        // Get user by ID and token
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        })

        // No user found
        if (!user) {
            throw new Error()
        }

        // Pass on token and user and call route handler
        request.token = token
        request.user = user
        next()
    } catch (error) {
        response.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth