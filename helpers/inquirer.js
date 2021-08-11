const inquirer = require('inquirer');
require('colors');
const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        { value: '1', name: `${'1.'.yellow} ${'Crear Tarea'.white}` },
        { value: '2', name: `${'2.'.yellow} ${'Listar Tareas'.white}` },
        { value: '3', name: `${'3.'.yellow} ${'Listar Tareas Completadas'.white}` },
        { value: '4', name: `${'4.'.yellow} ${'Listar Tareas Pendientes'.white}` },
        { value: '5', name: `${'5.'.yellow} ${'Completar Tareas(s)'.white}` },
        { value: '6', name: `${'6.'.yellow} ${'Borrar Tarea'.white}` },
        { value: '0', name: `${'0.'.red} ${'Salir'.white}\n` }
    ]
}];
const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción'.white);
    console.log('==========================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}
const pausaMenu = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `${'Presione'.white} ${'ENTER'.green} ${'para continuar'.white}\n`
        }
    ];
    console.log('\n');
    await inquirer.prompt(questions);
}
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

const choices = tareas.map((tarea,i)=>{
    const idx = `${i + 1}`.green;
    return {
        value: tarea.id,
        name: `${idx}. ${tarea.desc}`.white}
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'.white
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async (message)=>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`.white,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausaMenu,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}