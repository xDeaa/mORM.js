import mOrm from "./mOrm";
import Student from "./student";

(async () => {
    const orm = new mOrm();
    try{
        await orm.createConnection(
            {
            // "uri": "postgres://20180197:@localhost:5432/iLovePragmatic"
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "deaa",
            "password": "deaa",
            "database": "iLovePragmatic",
            "synchronize": true,
            "entities": [
                    Student
                    ]
        });
    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()