export default class Entity {
    constructor(dbInstance, name) {
      this.dbInstance = dbInstance;
      this.name = name;
    }

    async save(data) {
      return this.dbInstance.save(this,data);
    }
    async count() {}
    async findByPk(id, { attributes }) {}
    async findAll({ attributes }) {}
    async findOne({ where, attributes }) {}
    async update(data) {}
    async remove(data) {}

  }
