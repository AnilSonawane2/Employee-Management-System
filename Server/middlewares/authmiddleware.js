import User from "../models/User.js"

const verifyUser = async (req, res, next) => {   // Middleware to check verified user
    try{                                                                                   //  0    ,     1
        const token = req.header.authorization.split(' ')[1] // need only token not bearer ['Bearer', '<token>']
        if(!token){                                          // Check whether we got token
            return res.status(404).json({
                success: false,
                error: "Token not provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)  // decode that token with JWT-key
        if(!decoded){
            return res.status(404).json({   
                success: false,
                error: "Token not valid"
            })
        }

        const user = await User.findById({   // check the id that is decoded (got from token) exist in DB
            _id : decoded._id
        }).select('-password')  // except password

        if(!user){
            return res.status(404).json({
                success: false,
                error: "User not found"
            })
        }

        req.user = user    // if found
        next()
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error : "Server Error"
        })
    }
}

export default verifyUser