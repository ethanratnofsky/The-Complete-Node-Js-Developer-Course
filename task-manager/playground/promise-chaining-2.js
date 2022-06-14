require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

// Task.findByIdAndDelete('62a23ac4d361122c02c67065').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

/*
    Goal: Use async/await

    1. Create deleteTaskAndCount as an async function
        - Accept id of task to remove
    2. Use await to delete task and count up incomplete tasks
    3. Return the count
    4. Call the function and attach then/catch to log results
    5. Test your work!
*/

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('62a2583e2eaf733ab5a51b7f').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})