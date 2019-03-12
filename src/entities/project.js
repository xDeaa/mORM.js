import Entity from './entity';

export default class Project extends Entity {

    constructor(dbInstance){
        super(dbInstance,"Project");
    }

    static meta() {
      return {
        name: "Project",
        columns: {
          id: {
            primary: true,
            type: "number",
            generated: true
          },
          name: {
            type: "string"
          },
          description: {
            type: "text"
          }
        }
      };
    }
  }