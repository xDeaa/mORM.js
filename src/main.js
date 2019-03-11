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
            },
            {
                entities: [Student]
            });

        let student = {
          firstname: 'Dora ',
          lastname: 'Lexploratrice'
        };
        
        let id = 5;
        
        const studentEntity = orm.getEntity('Student');
        const saved = await studentEntity.save(student);
        console.log(`New student ${saved.firstname}`);
        // const count = await studentEntity.count();
        // console.log(`${count} rows in the table ${studentEntity.name}`);
        const students = await studentEntity.findAll({ attributes: ["firstname"]});
        const student1 = await studentEntity.findByPk(id,{ attributes: ["firstname", "lastname"]});
        // console.log(`All curent ${studentEntity.name}:`,students);
        // console.log(`Student ${id}:`,student1);
        const studentByOne = await studentEntity.findByOne({where : {firstname:'Dora '}, attributes: ["firstname"]});
        console.log('Student : ', studentByOne);
        
                

    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()
