export default class Entity {
    constructor(dbInstance, name) {
      this.dbInstance = dbInstance;
      this.name = name;
    }

    async save(data) {
      return this.dbInstance.save(this.name,data);
    }
    async count() {
      return this.dbInstance.count(this.name);
    }
    async findByPk(id, { attributes }) {}
    async findAll({ attributes } = {}) {
       return this.dbInstance.findAll(this.name,{ attributes });
    }
    async findOne({ where, attributes }) {}
    async update(data) {}
    async remove(data) {}

  }
