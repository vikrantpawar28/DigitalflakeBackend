// Express server configuration
require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// mongodb config
const { connect } = require('mongoose');
async function main() {
  await connect(process.env.MONGO_URI)
}
main().then(() => console.log('MongoDB connected'))
main().catch(err => console.error(err));


//cors config
const cors = require('cors');
app.use(cors({
  'origin': 'http://localhost:4200',
  'methods': 'GET,HEAD,POST,PUT,PATCH,DELETE',
  'preflightContinue': true,
  'optionsSuccessStatus': 204
}))
app.use(express.json());



const authRoutes = require('./routes/authRoutes');
const mainRoutes = require('./routes/mainRoutes');
app.use('/api/auth', authRoutes);
app.use('/api', mainRoutes);


const path = require('path');
const multer = require('multer')
app.use('/uploads', express.static(path.join(__dirname, '../', 'public', 'uploads')));
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
      res.status(400).json({ error: 'Multer error: ' + err.message });
  } else {
      res.status(500).json({ error: 'An error occurred' });
  }
});