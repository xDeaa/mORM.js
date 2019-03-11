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
            "username": "20180197",
            "password": "",
            "database": "iLovePragmatic", 
            "synchronize": true
            },
            {
                entities: [Student]
            });

        let student = {
          firstname: 'Dora',
          lastname: 'Lexploratrice'
        };
        
        const studentEntity = orm.getEntity('Student');
        const saved = await studentEntity.save(student);
        console.log(`New student ${saved.firstname}`);
        // const count = await studentEntity.count();
        // console.log(`${count} rows in the table ${studentEntity.name}`);
        const students = await studentEntity.findAll({ attributes: student});
        console.log(`All curent ${studentEntity.name}:`,students);
                

    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()
