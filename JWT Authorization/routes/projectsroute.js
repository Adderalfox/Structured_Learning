
import express from "express";
import data from "../data.js";
import auth from "../basicAuth.js";
import projectPermissions from "../permissions/project.js";

const { canViewProject, scopedProjects } = projectPermissions;
const { authUser } = auth;
const { projects } = data;
const router = express.Router();

router.get('/', (req, res) => {
    res.json(scopedProjects(req.user, projects));
})

router.get('/:projectId', setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project);
})

//functions & middlewares
function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId);
    req.project = projects.find(project => project.id === projectId);

    if (req.project == null) {
        res.status(404);
        return res.send('Project not found');
    }
    next();
}

function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        res.status(401);
        return res.send('Not Allowed');
    }
    next();
}

export default router;
