require('colors');

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('=================================='.green);
        console.log('   Seleccione una Opción   ');
        console.log('==================================\n'.green);

        console.log(`${'1.'.green} ${'Crear Tarea'.white}`);
        console.log(`${'2.'.green} ${'Listar Tareas'.white}`);
        console.log(`${'3.'.green} ${'Listar Tareas Completadas'.white}`);
        console.log(`${'4.'.green} ${'Listar Tareas Pendientes'.white}`);
        console.log(`${'5.'.green} ${'Completar Tareas(s)'.white}`);
        console.log(`${'6.'.green} ${'Borrar Tarea'.white}`);
        console.log(`${'0.'.green} ${'Salir'.white}\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccione una Opción:', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
}

const pausa = () => {
    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question(`\n${'Presione'.white} ${'ENTER'.green} ${'para continuar'.white}\n`, (opt) => {
            readLine.close();
            resolve();
        });
    });
}

module.exports = { mostrarMenu, pausa }