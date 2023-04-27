//Se encarga de la interacción de javascript con html
//Third Libraries
import alertify from 'alertifyjs';
import Swal from 'sweetalert2';
//Own Libraries
import{validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields, removeErrorMessageElements}from './../utils/validations';
//Module Libraries
import{formElements,fieldConfigurations, getFormData, resetForm, setFormData} from './form';
import{ createTeacher, readTeachers, findTeacherById } from './repository';


export function listeners() {

    window.addEventListener('load', () => {

        listenFormSubmitEvent();
        listTeacher();
        listenFormFieldsChangeEvent();
        listenFormResetEvent();
        listenTableClickEvent();
    });

}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        alertify.dismissAll();
        
        if (validateForm(fieldConfigurations)){
            createTeacher(getFormData());
            resetForm();
            removeErrorClassNameFields('is-valid')
            alertify.success('Profesor guardado correctamente');
            listTeacher();
        }else {
            alertify.error('Verificar los datos del formulario');
        }

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
        editIcon.dataset.id = id;
        editButton.appendChild(editIcon);

        colButtons.appendChild(editButton);

        //btn trash
        const editButton_trash = document.createElement('button');
        editButton_trash.classList.add('btn', 'btn-danger', 'btn-delete', 'm-1');
        editButton_trash.dataset.id = id;
        editButton_trash.setAttribute('title', 'Eliminar');

        const editIcon_trash = document.createElement('em');
        editIcon_trash.classList.add('fa', 'fa-trash');
        editIcon_trash.dataset.id = id
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

function listenFormFieldsChangeEvent(){

    fieldConfigurations.forEach(({input, validations}) =>{
        input.addEventListener('change', () => {
            removeInputErrorMessage(input);
            validations.forEach((validationConfig) => {
                validateField(input, validationConfig);
            })
        })
    });
}

function listenFormResetEvent() {
    formElements.form.addEventListener('reset', () => {
        removeErrorMessageElements();
        removeErrorClassNameFields('is-valid');
        resetForm();
        alertify.dismissAll();
    });
}

function listenTableClickEvent() {
    const table = document.getElementById('tblTeachers');
    table.addEventListener('click', ({target}) => {

        const idTeacher = target.getAttribute('data-id');

        if(target.classList.contains('btn-edit') || target.classList.contains('fa-pencil')) {

            editTeacher(idTeacher);

        } else if(target.classList.contains('btn-delete') || target.classList.contains('fa-trash')) {
            Swal.fire({
                title: '¿Estas seguro que quieres eliminar el profesor: ?',
                text: 'No podrás deshacer esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#b2b2b2',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'Cerrar'
            }).then((resultConfirm) => {

                if(resultConfirm.isConfirmed) {
                    console.log('Confirma que elimina')
                }else {
                    alertify.dismissAll();
                    alertify.message('Acción cancelada')
                }

            })
        }
    });
};

function editTeacher(idTeacher) {
    const teacher = findTeacherById(idTeacher);
    
    if (teacher) {
        setFormData(teacher);
        window.scrollTo({top : 0, behavior: 'smooth'})
    } else {
        alertify.error('profesor que seleccionaste no existe, verifique la información')
    }
}

