import Core from "./core";
import {Client } from 'pg';

export default class PostgreSQL extends Core {

    constructor(options){
        super(options);
    }

    async initialize(){

        const {host, port, username, password, database, synchronize, entities} = this;

        this.client = new Client({
            user: username,
            host,
            port,
            database,
            password
        })

        try {
          const student = entities.Student.meta();

          await this.client.connect();
          if (synchronize == true) {
            this.client.query(`DROP TABLE IF EXISTS ${student.name}`, (err,res) => {
                console.log(err, res);
              })

              this.client.query(`CREATE TABLE ${student.name}(
              id INT PRIMARY KEY,
              firstname VARCHAR(100),
              lastname VARCHAR(100),
              age INT
              )`, (err,res) => {
                  console.log(err, res);
                  this.client.end();
                })

          }else {
            this.client.query(`CREATE TABLE IF NOT EXISTS ${student.name}(
            id INT PRIMARY KEY,
            firstname VARCHAR(100),
            lastname VARCHAR(100),
            age INT
            )`, (err,res) => {
                console.log(err, res);
                this.client.end();
              })
          }

        } catch (e) {
            console.log(` Database ${database} doesn't exist`);
        }

    }
}
