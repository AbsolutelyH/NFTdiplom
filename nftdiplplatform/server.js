const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const next = require("next");


const dev = process.env.NODE_ENV !=="production";
const server = next({ dev });
const handle = server.getRequestHandler();


dotenv.config({path:"./config.env"});
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
 // useUnifiedTopology: true
}).then((con)=> {
  console.log("DB Connection Successfully");
}) 
console.log(process.env.NODE_ENV);
const port = process.env.PORT || 3000;

server.prepare().then(() => {
    app.get("*", (req, res) => {
        return handle(req, res);
    });

    app.listen(port, () => {
        console.log(`App running on port ${port}....`);
    });
});


process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandledRejection Shutting down application");
  server.close(() => {
    process.exit(1);
  });
});

