const firestore = require('../services/firestore');

class ProjectRepository {
  constructor() {
    this.collectionName = 'projects';
    this.projectsCollection = firestore.collection(this.collectionName);
  }

  async get(key) {
    const project = await this.projectsCollection.doc(key).get();
  
    return project.data();
  }
  
  async getAll() {
    const projectsRef = await this.projectsCollection.get();

    const projects = [];
    projectsRef.forEach(user => {
      projects.push({ id: user.id, ...user.data() });
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
