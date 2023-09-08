
document.addEventListener("DOMContentLoaded", function () {
    const inputTarea = document.getElementById("inputTarea");
    const btnAgregar = document.getElementById("btnAgregar");
    const listaTareas = document.getElementById("listaTareas");
    const totalTareas = document.getElementById("totalTareas");
    const totalTareasRealizadas = document.getElementById("totalTareasRealizadas");
    const tareas = [
        { id: 1, descripcion: "Estudiar JS", completada: true },         //para poner ue la tarea esta hecha o no
        { id: 2, descripcion: "Terminar el DF", completada: false },
        { id: 3, descripcion: "Comprar la entrada a la fonda permanente", completada: true }
    ];

    function actualizarResumen() {
        totalTareas.textContent = tareas.length;
        totalTareasRealizadas.textContent = tareas.filter(tarea => tarea.completada).length;
    }

    function renderizarTareas() {
        listaTareas.innerHTML = "";
        tareas.forEach((tarea, index) => {
            const li = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarea.completada;
            
            // para crear  columnas para ID y Descripción 
            const idColumn = document.createElement("div");
            idColumn.classList.add("id-column");
            idColumn.textContent = tarea.id;

            const descripcionColumn = document.createElement("div");
            descripcionColumn.classList.add("descripcion-column");
            descripcionColumn.textContent = tarea.descripcion;

            // con esto podemos estableser ue las tareaas fueron realizadas 
            
            if (tarea.completada) {
                li.classList.add("completed");
            }

            const btnBorrar = document.createElement("button");
            btnBorrar.textContent = "Borrar";
            
            checkbox.addEventListener("change", () => {
                tarea.completada = checkbox.checked;
                li.classList.toggle("completed", tarea.completada);
                actualizarResumen();
            });

            btnBorrar.addEventListener("click", () => {
                tareas.splice(index, 1);
                renderizarTareas();
                actualizarResumen();
            });

            li.appendChild(checkbox); // Agregar columna del ticket
            li.appendChild(idColumn); // Agregar columna de id 
            li.appendChild(descripcionColumn); // Agregar columna de Descripción
            li.appendChild(btnBorrar);  // boton para borrar la tarea
            listaTareas.appendChild(li);
        });
    }

    btnAgregar.addEventListener("click", () => {
        const descripcion = inputTarea.value.trim();
        if (descripcion) {
            const nuevaTarea = {
                id: tareas.length + 1, // con esto podemos sumar 1 al id ue partira de 1....
                descripcion,
                completada: false
            };
            tareas.push(nuevaTarea);
            inputTarea.value = "";
            renderizarTareas();
            actualizarResumen();
        }
    });

    renderizarTareas();
    actualizarResumen();
});
