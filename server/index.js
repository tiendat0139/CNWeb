import express from 'express'
import bodyParser from "body-parser"
import { config } from "dotenv"

import usersRoutes from "./routes/users.routes.js"

config()
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use('/', usersRoutes)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})