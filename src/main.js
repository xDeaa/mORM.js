import mOrm from "./mOrm";
import Student from "./entities/student";

(async () => {
    const orm = new mOrm();
    try{
        await orm.createConnection(
            {
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "root",
            "database": "iLovePragmatic",
            "synchronize": true,
        });
    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()
