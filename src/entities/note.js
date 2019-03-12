import Entity from './entity';

export default class Note extends Entity {

    constructor(dbInstance){
        super(dbInstance,"Note");
    }

    static meta() {
      return {
        name: "Note",
        columns: {
          id: {
            primary: true,
            type: "number",
            generated: true
          },
          note: {
            type: "number"
          }
        }
      };
    }
  }