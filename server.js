const express = require('express'); 


const server = express();

server.use(express.json());

const projectsRouter = require("./routers/projectsRouter.js");

server.use("/api/projects", projectsRouter);

server.get("/", (req, res, next) => {
  res.send(`
    <h1>Welcome to Jeff's API</h1>
    `);
});


module.exports = server;