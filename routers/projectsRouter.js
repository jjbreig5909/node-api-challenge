const express = require("express");

const Projects = require('../data/helpers/projectModel.js')

const router = express.Router();

router.get('/', (req,res) =>{
    Projects.get()
    .then(projects=>{
        res.status(200).json(projects);
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({
            message:"error retrieving projects"
        });
    });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "error retrieving project"
      });
    });
});


module.exports = router;