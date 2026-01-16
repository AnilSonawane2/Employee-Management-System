import bcrypt from 'bcrypt'

import User from "../models/User.js"

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({
                success: false,
                error: "User not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(404).json({
                success: false,
                error: "Wrong Password"
            })
        }

        const token = 
    } 
    catch (error) {
        console.log(error.message)
    }
}

export default login