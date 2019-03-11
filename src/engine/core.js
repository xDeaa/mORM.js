import Student from "../entities/student"

export default class Core {

    constructor({host, port, username, password, database, synchronize=false}, entities){

        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
        this.synchronize = synchronize;
        this.entities = entities;
    }

    dump(){
        console.log(`Database Informations:
        host: ${this.host}
        port: ${this.port}
        username: ${this.username}
        password: ${this.password}
        database: ${this.database}
        synchronize: ${this.synchronize}
        entities: ${this.entities}
        `);
    }
}
