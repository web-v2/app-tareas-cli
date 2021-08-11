const Tarea = require('./tarea');
class Tareas {
    _listado = {};
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    cargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            console.log(`${idx}.`, `${desc}`.white, `:: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        let idx = 0;
        this.listadoArr.forEach((tarea, i) => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red;
            if (completadas) {
                if (completadoEn) {
                    idx += 1;
                    console.log(`${idx}.`.green, `${desc}`.white, `:: ${completadoEn}`.green);
                }
            } else {
                if (!completadoEn) {
                    idx += 1;
                    console.log(`${idx}.`.green, `${desc}`.white, `:: ${estado}`);
                }
            }

        });
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea => {
                if(!ids.includes(tarea.id)){
                   this._listado[tarea.id].completadoEn = null;
                }
        });
    }
}

module.exports = Tareas;