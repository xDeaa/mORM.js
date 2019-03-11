
export default function Config(){

  const confDb = {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "deaa",
    "password": "deaa",
    "database": "iLovePragmatic",
    
  }
  const entities = {
        "entities":[Student],
  }
  return (confDb,entities);
}

