const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(morgan('combined'))
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hospital API is running' });
});

app.use('/api/patients', require('./routes/patient'));
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));