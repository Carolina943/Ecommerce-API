require('express-async-errors')
//Express
const express = require('express')
const app = express()
//database
const connectDB = require('./db/connect')
//dotenv
const dotenv = require('dotenv')
dotenv.config()

//rest of the package
const morgan = require('morgan')

//routers
const authRouter = require('./routes/authRoutes')

//route

app.get('/', (req, res)=>{
  res.send('e-commerce API')
});

//app.use
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use(morgan('tiny'))

//middleware

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')



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
