import mOrm from "./mOrm";
import Student from "./entities/student";
import Note from "./entities/note";
import Project from "./entities/project";

(async () => {
    const orm = new mOrm();

    try{
        await orm.createConnection({},{entities: [Student,Note,Project]});

        let student = {
            firstname: 'Andrea',
            lastname: 'Serrano'
          };
        
        let note = {
            note: 15,
        }
        let project =  {
            name: 'test',
            description: 'short text of test...'
        }
        
        let id = 3;
        
        const studentEntity = orm.getEntity('Student');
        const saved = await studentEntity.save(student);
        console.log(`New ${studentEntity.name} ${saved.firstname}`);

        const count = await studentEntity.count();
        console.log(`${count} rows in the table ${studentEntity.name}`);

        const studentsAttributes = await studentEntity.findAll({ attributes: ["firstname"]});
        const students = await studentEntity.findAll();
        console.log(`All curent ${studentEntity.name}:`,studentsAttributes);
        console.log(`All curent ${studentEntity.name}:`,students);

        const studentByPkAttributes = await studentEntity.findByPk(id,{ attributes: ["firstname", "lastname"]});
        const studentByPk = await studentEntity.findByPk(id);
        console.log(`${studentEntity.name} ${id}:`,studentByPkAttributes);
        console.log(`${studentEntity.name}${id}:`,studentByPk);

        const studentByOneAttributes = await studentEntity.findByOne({where : {firstname:'Andrea'}, attributes: ["lastname"]});
        const studentByOne = await studentEntity.findByOne({where : {firstname:'Andrea'},});
        console.log(`${studentEntity.name}: `, studentByOneAttributes);
        console.log(`${studentEntity.name}: `, studentByOne);

        const updateStudent = await studentEntity.update(studentByOne)
        console.log(`Update ${updateStudent.firstname} successfully` );

        const removeStudent = await studentEntity.remove(id)
        console.log(`${studentEntity.name} delete successfully` ); 
        

        const noteEntity = orm.getEntity('Note');
        const noteSaved = await noteEntity.save(note);
        console.log(`New ${noteEntity.name} ${noteSaved.note}`);

        const countNote = await noteEntity.count();
        console.log(`${countNote} rows in the table ${noteEntity.name}`);

        const notesAttributes = await noteEntity.findAll({ attributes: ["note"]});
        const notes = await noteEntity.findAll();
        console.log(`All curent ${noteEntity.name}:`,notesAttributes);
        console.log(`All curent ${noteEntity.name}:`,notes);

        const noteByPkAttributes = await noteEntity.findByPk(id,{ attributes: ["note"]});
        const noteByPk = await noteEntity.findByPk(id);
        console.log(`${noteEntity.name} ${id}:`,noteByPkAttributes);
        console.log(`${noteEntity.name}${id}:`,noteByPk);

        const noteByOneAttributes = await noteEntity.findByOne({where : {note:20}, attributes: ["id"]});
        const noteByOne = await noteEntity.findByOne({where : {note:20},});
        console.log(`${noteEntity.name}: `, noteByOneAttributes);
        console.log(`${noteEntity.name}: `, noteByOne);

        const updateNote = await noteEntity.update(noteByOne)
        console.log(`Update ${updateNote.firstname} successfully` );

        const removeNote = await noteEntity.remove(id)
        console.log(`${noteEntity.name} delete successfully`); 


        const projectEntity = orm.getEntity('Project');
        const projectSaved = await projectEntity.save(project);
        console.log(`New ${projectEntity.name} ${projectSaved.name}`);

        const countProject = await projectEntity.count();
        console.log(`${countProject} rows in the table ${projectEntity.name}`);

        const projectsAttributes = await projectEntity.findAll({ attributes: ["description"]});
        const projects = await projectEntity.findAll();
        console.log(`All curent ${projectEntity.name}:`,projectsAttributes);
        console.log(`All curent ${projectEntity.name}:`,projects);

        const projectByPkAttributes = await projectEntity.findByPk(id,{ attributes: ["name"]});
        const projectByPk = await projectEntity.findByPk(id);
        console.log(`${projectEntity.name} ${id}:`,projectByPkAttributes);
        console.log(`${projectEntity.name}${id}:`,projectByPk);

        const projectByOneAttributes = await projectEntity.findByOne({where : {name:'test'}, attributes: ["name","description"]});
        const projectByOne = await projectEntity.findByOne({where : {name:'test'},});
        console.log(`${projectEntity.name}: `, projectByOneAttributes);
        console.log(`${projectEntity.name}: `, projectByOne);

        const updateProject = await projectEntity.update(projectByOne)
        console.log(`Update ${updateProject.firstname} successfully` );

        const removeProject = await projectEntity.remove(id)
        console.log(`${projectEntity.name} delete successfully`);

    }catch(error){
        console.log(error);
        process.exit(-1);
    }
})()
