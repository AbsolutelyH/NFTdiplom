const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection Shutting down application");
  process.exit(1);
});

dotenv.config({path:"./config.env"});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((con)=> {
  //console.log(con.connection);
  console.log("DB Connection Successfully");
}) 
//.catch((err) => console.log("ERROR"));
console.log(process.env.NODE_ENV);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection Shutting down application");
  server.close(() => {
    process.exit(1);
  });
});

