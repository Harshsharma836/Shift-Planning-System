const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const authorize = require('./middleware/authorize');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
mongoose.connect('mongodb+srv://harsh:harsh@cluster.c7frmri.mongodb.net/ShiftPlanningSystem?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use('/auth', authRoutes);
app.use('/admin', authorize('admin'), adminRoutes);
app.use('/user', authorize('user') ,userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
