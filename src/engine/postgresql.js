import Core from "./core";
import {Client } from 'pg';
import {isEmpty} from 'lodash';

export default class PostgreSQL extends Core {

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
         
          await this.client.connect();
          if(synchronize){
            const queryDelete = this.dropTable(entities);
            this.client.query(queryDelete, (err,res)=> {
              if(err){
                throw new Error(err);
              }
            })
          }
          const query = this.createTable(entities);

          this.client.query(query,(err,res)=> {
            if(err){
              throw new Error(err)
            }
          })
        
        } catch (e) {
          console.log(e)
          console.log(` Database ${database} doesn't exist`);
        }

    }

    createTable(entities){
      const arrayEntities = Object.values(entities);

          for (const entity of arrayEntities) {
            const { name: tableName, columns } = entity.meta();
            let queryCreate = `CREATE TABLE IF NOT EXISTS ${tableName}( `

            for (const [key, item] of Object.entries(columns)) {
            let type;

              if (item.primary) {
                if (item.generated) {
                queryCreate += `${key} SERIAL`;
                }
                queryCreate += ` PRIMARY KEY`;
                queryCreate += ", ";

              }else{
                switch (item.type) {
                  case "string":
                  type = "VARCHAR(255)";
                    break;
                  case "number":
                    type = "INT";
                    break;
    
                default:
                    type = item.type;
                }
                queryCreate += `${key} ${type}`;
                queryCreate += ", ";
              }
            }
             queryCreate = queryCreate.slice(0, -2) + ")";
             return queryCreate;
          }
    }

    dropTable(entities){
      const arrayEntities = Object.values(entities);

      for (const entity of arrayEntities) {
        const { name: tableName } = entity.meta();
        let queryDelete = `DROP TABLE IF EXISTS ${tableName}`
        return queryDelete;
      }
    
    }

    async save(entity,data){
      const keys = Object.keys(data).join(',');
      const values = Object.values(data);
      const params = values.map((_, i) => `$${i + 1}`).join(',')
      
      const res = await this.client.query(`INSERT INTO ${entity}(${keys}) VALUES(${params}) RETURNING *`, values);
      return res.rows[0];

    }

    async count(entity){
      const res = await this.client.query(`SELECT COUNT(*) FROM ${entity}`);
      return res.rows[0].count;
    }

    async findAll(entity,{attributes = []}){
      const search = isEmpty(attributes) ? '*' : attributes.join(",")
      const res = await this.client.query(`SELECT ${search} FROM ${entity}`);

      return res.rows;  
    }

    async findByPk(entity,id,{attributes = []}){
      const search = isEmpty(attributes) ? '*' : attributes.join(",");
      
      if(id === undefined || id == null ){
        console.log("You must enter a id");

        return;
      }else{
        const res = await this.client.query(`SELECT ${search} FROM ${entity} WHERE id = ${id}`)

        return res.rows[0];
      }      
     }  
     
     async findByOne(entity,{where = {} ,attributes = []}){
       
      const keys = Object.keys(where).map((key, i) => `${key} = $${i + 1}`).join(' AND ');
      const values = Object.values(where)

      const search = isEmpty(attributes) ? '*' : attributes.join(",")
      const res = await this.client.query(`SELECT ${search} FROM ${entity} WHERE ${keys} LIMIT 1 `,values)

      return res.rows[0];
       
     }
}
