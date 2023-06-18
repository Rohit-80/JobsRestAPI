const express = require('express');
const connectDB = require('./db/connect');
const app = express();
require('dotenv').config()
require('express-async-errors')
const errorHandlerMiddleware =  require('./middleware/middlewareError')
app.use(express.json())


// extra security packages
// const helmet = require('helmet');
// const cors = require('cors');
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');

// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );
// app.use(express.json());
// app.use(helmet());
// app.use(cors());
// app.use(xss());



//Route
const jobsrouter = require('./route/jobs')
const authrouter = require('./route/auth');
const notfound = require('./middleware/notfound');

app.use('/api/v1/auth',authrouter);
app.use('/api/v1/jobs',jobsrouter);


//Error Middleware
app.use(errorHandlerMiddleware);
app.use(notfound);



const PORT = process.env.PORT || 3000;

const start = async ()=>{
try {
    await connectDB(process.env.MONGO_URL)     
    app.listen(PORT,()=>console.log(`Server is Listening on ${PORT}...`))
} catch (e) {
     console.log(e);
}
}

start()
