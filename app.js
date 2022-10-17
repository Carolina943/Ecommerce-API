require('express-async-errors')
//Express
const express = require('express')
const app = express()
//dotenv
const dotenv = require('dotenv')
dotenv.config()

//rest of the package
const morgan = require('morgan')

//database
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/authRoutes')

//route

app.get('/', (req, res)=>{
  res.send('e-commerce API')
});

//middleware


const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//app.use
app.use('/api/v1/auth', authRouter)
app.use(morgan('tiny'))
app.use(express.json())

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



//PORT
const port = process.env.PORT

const start = async()=>{
  try{
    await connectDB()
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  }catch(error){
    console.log(error)
  }
}

start()
