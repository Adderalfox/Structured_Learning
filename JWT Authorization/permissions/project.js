// const { ROLE } = require('../data')
import data from "../data.js";
const { ROLE } = data;

function canViewProject(user, project) {
    return (
        user.role === ROLE.ADMIN ||
        project.userId === user.id
    )
}
function scopedProjects(user, projects) {
    if (user.role === ROLE.ADMIN) {
        return projects;
    }
    return projects.filter(project => project.userId === user.id);
}

export default {
    canViewProject,
    scopedProjects
}
