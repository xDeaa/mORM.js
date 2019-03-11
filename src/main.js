import mOrm from "./mOrm";
import Student from "./entities/student";
import Mlog from "./libs/mLog";

(async () => {
    const orm = new mOrm();

    try{
        await orm.createConnection();
        
        let student = {
            firstname: 'Andrea',
            lastname: 'Serrano'
          };
        
        let id = 1;
        
        const studentEntity = orm.getEntity('Student');
        const saved = await studentEntity.save(student);
        console.log(`New student ${saved.firstname}`);
        const count = await studentEntity.count();
        console.log(`${count} rows in the table ${studentEntity.name}`);

        const studentsAttributes = await studentEntity.findAll({ attributes: ["firstname"]});
        const students = await studentEntity.findAll();
        console.log(`All curent ${studentEntity.name}:`,studentsAttributes);
        console.log(`All curent ${studentEntity.name}:`,students);

        const studentByPkAttributes = await studentEntity.findByPk(id,{ attributes: ["firstname", "lastname"]});
        const studentByPk = await studentEntity.findByPk(id);
        console.log(`Student ${id}:`,studentByPkAttributes);
        console.log(`Student ${id}:`,studentByPk);

        const studentByOneAttributes = await studentEntity.findByOne({where : {firstname:'Andrea'}, attributes: ["lastname"]});
        const studentByOne = await studentEntity.findByOne({where : {firstname:'Andrea'},});
        console.log('Student : ', studentByOneAttributes);
        console.log('Student : ', studentByOne);

        const updateStudent = await studentEntity.update(studentByOne)
        console.log(`Update ${updateStudent.firstname} successfully` );

        const removeStudent = await studentEntity.remove(id)
        console.log(`${removeStudent.firstname} delete successfully` );     

    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()
