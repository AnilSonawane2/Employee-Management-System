import connectToDB from "./config/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt"

const userRegister = async () => {
    connectToDB().then(() => {
        console.log(`Database Connected !!`)
    })
    try {
        const hashedPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@email.com",
            password: hashedPassword,
            role: "admin"
        })
        newUser.save().then(() => {
            console.log(`Admin Created !`)
        })
        
    } catch (error) {
        console.log(`${error.message}`)
    }
}

userRegister()