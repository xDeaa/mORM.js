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
            "synchronize": true
        });

        let student = {
          firstname: 'Dora',
          lastname: 'Lexploratrice'
        };

        const studentEntity = orm.getEntity('Student');
        // console.log(studentEntity);
        // console.log(student);
        const saved = await studentEntity.save(student);
        console.log(`New student ${saved.firstname}`);

    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()
