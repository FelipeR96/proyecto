
//localStorage.setItem('teachers', 'Hola base de datos estudiante');//recibe key:value ser(se crea)
//const teachers = localStorage.getItem('teachers');//obtener datos
//console.log(teachers);
//localStorage.removeItem('teachers');//Permite remover 

//Encargado de acceder al localstorage del navegador
export function getDatabase(dbName) {

    const database = JSON.parse(localStorage.getItem(dbName));//misma estructura de objeto el JSON
    return database === null ? [] : database; //if ternario 
}

export function setDatabase(dbName, jsonData) {
    //convierte JSON en string
    localStorage.setItem(dbName, JSON.stringify(jsonData));
}

