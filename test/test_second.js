const bcrypt=require("bcryptjs")
const salt=generateSalt(10)
console.log("generated salt:",salt)