import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.js'
import connectToDB from './config/db.js'

const app = express()
const PORT = process.env.PORT || 8000

connectToDB().then(() => {
    console.log(`Database Connected Successfully!`)
}).catch((e) => {
    console.log(e.message)
})

app.use(cors())
app.use(express.json()) 

app.use('/api/auth',authRouter)
 
app.listen(PORT, () => {
    console.log(`Server is Started !!`)
})