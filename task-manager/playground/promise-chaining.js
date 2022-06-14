require('../src/db/mongoose')
const User = require('../src/models/user')

// 62a239138d2cf99bad1e7568

// User.findByIdAndUpdate('62a23e7760377664fdb4e1ec', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('62a23e7760377664fdb4e1ec', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})