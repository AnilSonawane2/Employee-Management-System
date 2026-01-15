import express from 'express'
import cors from 'cors'

import connectToDB from './config/db.js'

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server is Started !!`)
})