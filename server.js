const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//require routers
const userRouter = require('./routes/use')
const adminRouter = require('./routes/admin')
const movieRouter = require('./routes/movie')

dotenv.config();

const app = express();

//midleware
app.use(express.json());
app.use(cors());
app.use(express.static('./uploads'));
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//display msg
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/movie', movieRouter)

const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });    
  })
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running...');
});

