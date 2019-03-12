import Entity from './entity';

export default class Student extends Entity {

    constructor(dbInstance){
        super(dbInstance,"Student");
    }

    getPk(){
      return Entity.findPk(Student.meta())
    }
    
    static meta() {
      return {
        name: "Student",
        columns: {
          id: {
            primary: true,
            type: "number",
            generated: true
          },
          firstname: {
            type: "string"
          },
          lastname: {
            type: "string"
          },
          age: {
            type: "number"
          }
        }
      };
    }
  }