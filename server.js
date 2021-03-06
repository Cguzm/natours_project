const mongoose = require('mongoose');
const dotenv = require('dotenv');

// mongoose.connect('mongodb://localhost:27017/natours', {
//   useNewUrlParser: true
// });

process.on('uncaughtException', err => {
  console.log('UNHANDLED EXCEPTION! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({
  path: './config.env'
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB = process.env.DATA_BASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// .catch(() => console.log('ERROR'));

// SERVER INITIALIZER
// const timeout = app.listen();
// timeout.setTimeout(500000);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVING Shutting down safely');
  server.close(() => {
    console.log('Process terminated!');
  });
});
