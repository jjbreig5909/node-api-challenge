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

router.post("/", (req, res) =>{
    Projects.insert(req.body)
    .then(project =>{
        res.status(201).json(project);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error adding project'
        });
    });
});

router.delete('/:id', (req, res) =>{
    Projects.remove(req.params.id)
    .then(project =>{
        res.status(200).json({message: "Project deleted!"});
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"There was an error deleting the project"});
    });
});

router.put('/:id', (req,res)=>{
    Projects.update(req.params.id, req.body)
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({message: 'Error updating the project', error})
    });
});

module.exports = router;