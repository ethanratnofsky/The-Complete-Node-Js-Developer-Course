const express = require('express')
require('./db/mongoose') // Run mongoose.js file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Register Express middleware
// Run whenever a request is made to the Express application
// app.use((request, response, next) => {
//     // request.method is the HTTP method used
//     // request.path is the path requested
    
//     if (request.method === 'GET') {
//         // Authenticate user for all GET methods
//         response.send('GET requests are disabled')
//     } else {
//         // Continue to route handler
//         next()
//     }
// })

// Maintenance mode middleware
// app.use((request, response, next) => {
//     response.status(503).send('Maintenance mode!')
// })

app.use(express.json())
app.use(userRouter) // Register user router
app.use(taskRouter) // Register task router

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('62a7625e6e60ead4c8960819')
    // await task.populate('owner')
    // console.log(task.owner)

    const user = await User.findById('62a7618b795bac62e2c7ba5b')
    await user.populate('tasks')
    console.log(user.tasks)
}

main()