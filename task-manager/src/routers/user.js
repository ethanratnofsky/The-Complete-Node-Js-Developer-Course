const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

// Create user route
router.post('/users', async (request, response) => {
    const user = new User(request.body)

    try {
        await user.save()
        
        // Generate token for user
        const token = await user.generateAuthToken()

        // Only here until save Promise is fulfilled or rejected
        response.status(201).send({ user, token })
    } catch (error) {
        response.status(400).send(error)
    }
})

// Login user
router.post('/users/login', async (request, response) => {
    try {
        const user = await User.findByCredentials(request.body.email, request.body.password)

        // Generate token for user
        const token = await user.generateAuthToken()
        
        response.send({ user, token })
    } catch (error) {
        response.status(400).send()
    }
})

// Log out user
router.post('/users/logout', auth, async (request, response) => {
    try {
        // Remove token from user's tokens array
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token !== request.token
        })

        await request.user.save()

        response.send()
    } catch (error) {
        response.status(500).send()
    }
})

// Log out all sessions
router.post('/users/logoutAll', auth, async (request, response) => {
    try {
        // Remove all tokens from user's tokens array
        request.user.tokens = []

        await request.user.save()

        response.send()
    } catch (error) {
        response.status(500).send()
    }
})

// Read user self profile route
router.get('/users/me', auth, async (request, response) => {
    response.send(request.user)
})

// Update self user route
router.patch('/users/me', auth, async (request, response) => {
    const updates = Object.keys(request.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return response.status(400).send({
            error: 'Invalid updates!'
        })
    }

    try {
        updates.forEach((update) => {
            request.user[update] = request.body[update]
        })

        await request.user.save()

        response.send(request.user)
    } catch (error) {
        response.status(400).send()
    }
})

// Delete single user route
router.delete('/users/me', auth, async (request, response) => {
    try {
        await request.user.remove()
        response.send(request.user)
    } catch (error) {
        response.status(500).send()
    }
})

module.exports = router