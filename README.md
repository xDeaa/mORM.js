# mORM.js
It's my first orm

For connect to the database you have to use createConnection() from mOrm.js you add params two param in the method the config and the entities you want to create. If you not add a config for the database the code take the file morm.conf.js.

For insert a user in database you have to get the entity where you want to insert the user with the methode getEntity() in morm.js and call the methode save() in entity you take data to insert.

For count the lines in the database you have to call the methode count() of the methode where you want to count the rows.

For findAll the user in the database you have to call the methode findAll() you can add attributes or not if you not enter attributes all field of the table are show.

For findByPk the user in the database you have to call the methode findByPk() you have to enter a id to find and you can add attributes or not if you not enter attributes all field of the table are show .

For findByOne the user in the database you have to call the methode findByOne() you have to enter a field to find and you can add attributes or not if you not enter attributes all field of the table are show .

For update the user in the database you have to call the methode update() you have to enter a id to update the user you want.

For remove the user in the database you have to call the methode remove() you have to enter a id to remove the user you want.

For add relation one to one you have to call the methode hasOne() and pass the entity you want for foreignKey.
