//se va a encargar de GUARDAR,ACTUALIZAR,LEER O ELIMINAR los datos es el storage CRUD
import {getDatabase, setDatabase} from './../utils/storage';

const dbName = 'db_teachers';

export function createTeacher(teacher) {
    const arrayTeachers = getDatabase(dbName);
    arrayTeachers.push(teacher);
    setDatabase(dbName, arrayTeachers);

}