import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './db/db.js'

dotenv.config()

connectDB()
.then(()=>{
    app.listen(process.env.PORT||3000,()=>{
        console.log(`Server is Up: `,process.env.PORT)
    })
})
.catch((eeror)=>{
    console.log("MONGO db connection failed !!! ", err);
})