const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust this as needed for your security
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/search', require('./routes/search'));
app.use('/profile', require('./routes/profile'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path, stat) => {
    res.set('Cache-Control', 'no-store');
    console.log(`Serving file: ${req.url}`);
  }
}));

app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
      console.log('user disconnected');
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
