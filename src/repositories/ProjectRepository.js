const firestore = require('../services/firestore');

class ProjectRepository {
  constructor() {
    this.collectionName = 'project-svc-projects';
    this.projectsCollection = firestore.collection(this.collectionName);
  }

  async get({ id }) {
    const project = await this.projectsCollection.doc(id).get();
  
    return project.data();
  }
  
  async getAll() {
    const projectsRef = await this.projectsCollection.get();

    const projects = [];
    projectsRef.forEach(project => {
      projects.push({ id: project.id, ...project.data() });
    });
  
    return projects;
  }
  
  async create({ name, owner, createdBy }) {
    const project = await this.projectsCollection.add({
      name,
      owner,
      members: [],
      devices: [],
      createdAt: new Date(),
      createdBy
    });
  
    return project.id;
  }

  async update({ id, ...fields }) {
    await this.projectsCollection.doc(id).update({
      ...fields
    });
  }
}

module.exports = new ProjectRepository();
