import express from 'express'
import keys from './src/config/key.js'
import mongoose from 'mongoose';
import session from 'express-session';
import userRouter from './src/routes/user.js'
import reelRoutes from './src/routes/ReelsRoutes.js'
import shopRoutes from './src/routes/shopRoutes.js'
import connectMongoDBSession from "connect-mongodb-session";
const MONGO_URL = keys.MONGO_URL;
import cors from 'cors';
const app = express();
const Port = keys.PORT;
const MongoDBStore = connectMongoDBSession(session);
//connection
mongoose.set("strictQuery",false);
mongoose.connect(MONGO_URL).then(() => {
  console.log("mongodb connected"); 
})

// cors connection 

const allowedOrigins = [
  "http://localhost:5173",                 // For your local development
  "https://bitezy-client.vercel.app",      // Your Vercel link
  "https://bitezy.indevs.in"               // Your custom domain!
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true 
}));
// middlewares
app.use(express.json())

//  stores user login session in db
var store = new MongoDBStore(
  {
    uri : MONGO_URL,
    collection : "mysessions",
  },
  function(err) {
    if(err){
      console.log(err);
    }
  }
)
//routes
app.use('/api/users', userRouter);
app.use('/api/reels', reelRoutes);
app.use('/api/shop', shopRoutes);

app.listen(Port,()=> {
console.log(`server running on : ${Port}`);
})