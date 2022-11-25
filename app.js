const dotenv = require('dotenv');
dotenv.config()
require('express-async-errors');

//Express
const express = require('express')
const app = express()
//database
const connectDB = require('./db/connect')
//routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter =  require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//rest of the package
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
//routers

app.get('/', (req, res)=>{
  res.send('e-commerce API')
});

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));
app.use(fileUpload());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/review', reviewRouter);

app.use(morgan('tiny'))

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
