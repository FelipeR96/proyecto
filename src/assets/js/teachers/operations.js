//Se encarga de la interacción de javascript con html
import{formElements, getFormData} from './form'
import{ createTeacher, readTeachers } from './repository';

export function listeners() {

    window.addEventListener('load', () => {

        listenFormSubmitEvent();
        listTeacher();
    });

}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        createTeacher(getFormData());
        listTeacher();
        
    });
}

function listTeacher() {// listar los profesores
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';//El inner borra

    if(arrayTeachers.length > 0){

        arrayTeachers.forEach( (teacher) => {// forEach lee todo el array retorna el objeto y cada posición del objeto

        // DESTRUCTURACION (OJO ESTUDIARLO) convierte objetos en variables
        const {id, name, description, email, birthDate} = teacher;

        //creo la fila de la tabla
        const row = document.createElement('tr');
        row.classList.add('align-middle');

        // creo las columnas
        const colId = document.createElement('td');
        colId.textContent = id;// textcontent ingresa texto
        colId.classList.add('text-center')

        const colName = document.createElement('td');
        colName.textContent = name;

        const colDescription = document.createElement('td');
        colDescription.textContent = description;

        const colEmail = document.createElement('td');
        colEmail.textContent = email;

        const colBirthDate = document.createElement('td');
        colBirthDate.textContent = birthDate

        const colButtons = document.createElement('td');
        colButtons.classList.add('text-center')
        //btn primary
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
        editButton.dataset.id = id;
        editButton.setAttribute('title', 'Editar');

        const editIcon = document.createElement('em');
        editIcon.classList.add('fa', 'fa-pencil');
        editButton.appendChild(editIcon);

        colButtons.appendChild(editButton);

        //btn trash
        const editButton_trash = document.createElement('button');
        editButton_trash.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
        editButton_trash.dataset.id = id;
        editButton_trash.setAttribute('title', 'Eliminar');

        const editIcon_trash = document.createElement('em');
        editIcon_trash.classList.add('fa', 'fa-trash');
        editButton_trash.appendChild(editIcon_trash);

        colButtons.appendChild(editButton_trash);

        //agrego las columnas a la fila
        row.appendChild(colId);
        row.appendChild(colName);
        row.appendChild(colDescription);
        row.appendChild(colEmail);
        row.appendChild(colBirthDate);
        row.appendChild(colButtons);

        //agrego la fila al tbody
        tbody.appendChild(row);
        });


    } else{
        const rowEmpty = document.createElement('tr');
        const colEmpty = document.createElement('td');
        colEmpty.setAttribute('colspan', '6');
        colEmpty.textContent = "No se encuentran registros disponibles";
        colEmpty.classList.add('text-center');
        rowEmpty.appendChild(colEmpty);

        tbody.appendChild(rowEmpty)
    }

}
