import app from "./app.js"
import dotenv from "dotenv"
import connectDatabase from "./config/database.js"
dotenv.config()
connectDatabase()
const PORT=process.env.PORT || 4001
app.listen(PORT,()=>{
    console.log(`server is running on Port:${PORT}`)
})