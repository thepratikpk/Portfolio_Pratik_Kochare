import express from 'express'
import cors from 'cors'
import videoRouter from './routes/video.route.js'

const app=express()

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
  }));
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://portfolio-pratik-kochare.vercel.app'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }));


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use("/api",videoRouter)

export {app}