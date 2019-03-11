import {isEmpty} from 'lodash';
import {existsSync} from 'fs';
import path from 'path';
import PostgreSQL from './engine/postgresql';
import Entity from './entities/entity';

export default class mOrm {
    configPathName = "./mOrm.config.json";

    async createConnection(dbConfig = {}, extras = {entities: []}) {

      if(isEmpty(dbConfig)){

        if(!existsSync(path.join(__dirname,this.configPathName))){
          throw new Error("Configuration file morm.config.json required");
        }
        this.config = require(this.configPathName);

      }else{
        if(dbConfig.uri){
          const regexp = /^(.*):\/\/(.*):(.*)@(.*):(\d+)\/(.*)$/g
          const [, type, username, password,  host, port, database]= regexp.exec(dbConfig.uri);

          this.config = {
            type,
            host,
            port,
            username,
            password,
            database,

          };

        }else{
          this.config = dbConfig;
        }
      }

      this.entities = {};

      for (const entities of extras.entities) {
        this.entities[entities.prototype.constructor.name] = entities;
      }

     switch(this.config.type){
        case 'postgres':
          this.dbInstance = new PostgreSQL(this.config,this.entities);
          this.dbInstance.dump();
          break;

        default:
          throw new Error(`Engine ${this.config.type} not supported`);
      }

      await this.dbInstance.initialize();

    }

    getEntity(name){
        return new this.entities[name](this.dbInstance);
    }
  }
