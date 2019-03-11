import Core from "./core";
import {Client } from 'pg';
import {isEmpty} from 'lodash';
import Mlog from "../libs/mLog";

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
          Mlog.log(`Successfully connect to ${this.database}`);

          if(synchronize){
            this.dropTable(entities);
      
          }
          this.createTable(entities);

        } catch (e) {
          console.log(e)
          console.log(` Database ${database} doesn't exist`);
        }

    }

    async createTable(entities){
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
            try{
              await this.client.query(queryCreate)
              Mlog.log(`Table ${tableName} created successfully`);
            }catch(e){
              throw new Error(e);
            }

          }
    }

    async dropTable(entities){
      const arrayEntities = Object.values(entities);

      for (const entity of arrayEntities) {
        const { name: tableName } = entity.meta();
        let queryDelete = `DROP TABLE IF EXISTS ${tableName}`
        try {
          await this.client.query(queryDelete);
          Mlog.log(`Table ${tableName} deleted successfully`);
        } catch (e) {
          throw new Error(e);
        }
      }
    }

    async save(entity,data){
      const keys = Object.keys(data).join(',');
      const values = Object.values(data);
      const params = values.map((_, i) => `$${i + 1}`).join(',')
      
      const res = await this.client.query(`INSERT INTO ${entity}(${keys}) VALUES(${params}) RETURNING *`, values);
      Mlog.log(`${entity} successfully created`);
      return res.rows[0];

    }

    async count(entity){
      const res = await this.client.query(`SELECT COUNT(*) FROM ${entity}`);
      Mlog.log(`${res.rows[0].count} in table ${entity}`);
      return res.rows[0].count;
    }

    async findAll(entity,{attributes = []}){
      const search = isEmpty(attributes) ? '*' : attributes.join(",")
      const res = await this.client.query(`SELECT ${search} FROM ${entity}`);
      Mlog.log(`${entity}  successfully find`);
      return res.rows;  
    }

    async findByPk(entity,id,{attributes = []}){
      const search = isEmpty(attributes) ? '*' : attributes.join(",");
      
      if(id === undefined || id == null ){
        console.log("You must enter a id");

        return;
      }else{
        const res = await this.client.query(`SELECT ${search} FROM ${entity} WHERE id = ${id}`)
        Mlog.log(`${entity} successfully find`);
        return res.rows[0];
      }      
     }  
     
     async findByOne(entity,{where = {} ,attributes = []}){

      const keys = Object.keys(where).map((key, i) => `${key} = $${i + 1}`).join(' AND ');
      const values = Object.values(where)

      const search = isEmpty(attributes) ? '*' : attributes.join(",")
      const res = await this.client.query(`SELECT ${search} FROM ${entity} WHERE ${keys} LIMIT 5 `,values)
      Mlog.log(`${entity}  successfully find`);
      return res.rows[0];
       
     }

     async update(entity,data){
       const values = Object.values(data)
       const keys = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(',');
        
       if(!data.id){
         console.log('Please enter a Id to update');

       }else{
        const res = await this.client.query(`UPDATE ${entity} SET ${keys} WHERE id = ${data.id} RETURNING *`, values);
        Mlog.log(`${entity} successfully updated`);
        return res.rows[0];
       }
    }

    async remove(entity,data){

      if(data === null || data === undefined){
       console.log('Please enter a Id to remove');
      }else{
      const res = await this.client.query(`DELETE FROM ${entity} WHERE id = ${data} RETURNING *`);
      Mlog.log(`${entity} successfully deleted`);
      return res.rows[0];
      }

    }


}
