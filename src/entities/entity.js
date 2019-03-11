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
    async findByPk(id, { attributes } = {}) {
      return this.dbInstance.findByPk(this.name,id,{ attributes });
    }
    async findAll({ attributes } = {}) {
       return this.dbInstance.findAll(this.name,{ attributes });
    }
    async findByOne({ where, attributes } = {}) {
      return this.dbInstance.findByOne(this.name,{ where, attributes })
    }
    async update(data) {
      return this.dbInstance.update(this.name,data);
    }
    async remove(data) {
      return this.dbInstance.remove(this.name,data);
    }

  }
