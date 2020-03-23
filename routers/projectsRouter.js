const express = require("express");

const Projects = require('../data/helpers/projectModel.js');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();


//CRUD FOR PROJECTS

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

router.get("/:id", validateId, (req, res) => {
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

router.delete("/:id", validateId, (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json({ message: "Project deleted!" });
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ message: "There was an error deleting the project" });
    });
});

router.put('/:id', validateId, (req,res)=>{
    Projects.update(req.params.id, req.body)
    .then(project =>{
        res.status(200).json(project)
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({message: 'Error updating the project', error})
    });
});

//CRUD FOR PROJECT ACTIONS 

router.get("/:id/actions", validateId, (req, res) => {
  Projects.getProjectActions(req.params.id)
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

router.post('/:id/actions', validateId, (req, res) =>{
    Projects.get(req.params.id)
    .then(action=>{
        Actions.insert(req.body)
        .then(newAction=>{
            res.status(201).json({message:"action created"})
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({error: "error creating action"})
        });
    });
});

router.delete("/:id/actions/:actionid", validateId, (req, res) => {
  Projects.get(req.params.id).then(action => {
    Actions.remove(req.params.actionid)
      .then(deleteAction => {
        res.status(200).json({ message: "action deleted" });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "error creating action" });
      });
  });
});

router.put("/:id/actions/:actionid", validateId, (req, res) => {
  Projects.get(req.params.id).then(action => {
    Actions.update(req.params.actionid, req.body)
      .then(newAction => {
        res.status(200).json(newAction);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "error creating action" });
      });
  });
});

router.get("/:id/actions/:actionid", validateId, (req, res) => {
  Projects.get(req.params.id).then(actions => {
    Actions.get(req.params.actionid)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "error creating action" });
      });
  });
});



// MIDDLEWARE FUNCTIONS

function validateId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: 'project does not exist' });
        next();
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "exception", err });
    });
}

module.exports = router;