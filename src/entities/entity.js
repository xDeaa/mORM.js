export default class Entity {
    constructor(dbInstance, name) {
      this.dbInstance = dbInstance;
      this.name = name;
    }

    async save(data) {
      if (this.name == "Student") {
        const instanceName = this.dbInstance.entities.Student.meta();
        const client = this.dbInstance.client;
        client.query(`INSERT INTO ${instanceName.name} (firstname, lastname) VALUES ('${data.firstname}','${data.lastname}')`,
        (err,res) => {
            if (err){
              console.log(err);
              client.end();
            }
          });

          return data;
      }
    }
    async count() {}
    async findByPk(id, { attributes }) {}
    async findAll({ attributes }) {}
    async findOne({ where, attributes }) {}
    async update(data) {}
    async remove(data) {}
  }
