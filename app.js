require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  'origin':'http://localhost:4200',
  'methods':'GET,HEAD,POST,PUT,PATCH,DELETE',
  'preflightContinue':true,
  'optionsSuccessStatus':204
}))

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');

const authMiddleware = require('./middlewares/authMiddleware');

app.use('/api/auth', authRoutes);

app.use('/api', mainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
