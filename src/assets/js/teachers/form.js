//Todas las interacciones y configuración del formulario

/**
 * Este objeto contiene las referencias a los elementos clave del formulario 
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    fields: {
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthDate: document.getElementById('txtBirthDate')
    }
};

export function getFormData() {

    // const formData = new FormData(formElements.form);
    // return Object.fromEntries(formData.entries());//otro método para obtener datos

    const teacher = {
        id: new Date().getTime(),
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthDate: formElements.fields.birthDate.value,
    };
    return teacher;
};
/**
 * Array de objetos que contiene información para las validaciones
 * Cada objeto contiene una referencia a cada campo, un array de objetos
 * de validaciones que tendrá, el ID del error, el mensaje y la función de validación
 */
export const fieldConfigurations = [
    {
        input: formElements.fields.name,
        validations: [
            {
                errorId: `${formElements.fields.name.id}Required`,//comillas template literals
                errorMessage: 'El nombre es obligatorio',
                //Las validaciones retornaran un FALSE cuando debe mostrar el mensaje de error
                //y un TRUE cuando no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim()!== '';//trim para quitar espacios derecha izquierda
                }
            }
            
        ]

    },

    {
        input: formElements.fields.description,
        validations: [
            {
                errorId: `${formElements.fields.description.id}Required`,//comillas template literals
                errorMessage: 'La descripción es obligatoria',
                //Las validaciones retornaran un FALSE cuando debe mostrar el mensaje de error
                //y un TRUE cuando no debe mostrarlo
                validationFunction: (value) => {
                    return value.trim()!== '';//trim para quitar espacios derecha izquierda
                }
            }
            
        ]

    },
];

export function resetForm() {
    formElements.form.reset();
};