/*Estado en memoria*/
let tareas = []; //[{id,nombre,completada}]

//---------- EJERCICIO 1: DOM + Eventos ----------
const $saludo = document.querySelector("#saludo");
document.querySelector("#btn-saludo").addEventListener("click", () => {
    const mensajes = ["Hola, mundo", " Bonjour ", " Que onda ", "Hola, equipo "];
    const i = (mensajes.indexOf($saludo.textContent) + 1) % mensajes.length;
    $saludo.textContent = mensajes[i];
});

// ---------- EJERCICIO 2: Mini - agenda ----------
const $form = document.querySelector("#form-add");
const $nombre = document.querySelector("#nombre");
const $lista = document.querySelector("#lista");
function newId() { return "T-" + String(Date.now()).slice(-5); }
function escapeHtml(s) {
    return s.replace(/[&<>"’]/g, m => ({ "&": "&amp;", "<":"&lt;", ">": "&gt;", '"': "&quot;", " '": "&#039;" }[m]));
}
function render() {
    $lista.innerHTML = tareas.length
        ? tareas.map(t => 
            `<li class=" item ${t.completada ? " item-done ": ""}" >
    <span>${t.completada ? "si":"no"} </span>
    <strong >${ escapeHtml (t.nombre )} </strong>
    <div style="margin-left:auto ; display:flex; gap:6px">
    <button data-act="toggle" data-id="${t.id}">Toggle</button>
    <button data-act ="rm" data-id="${t.id }">Eliminar</button>
    </div>
    </li> `).join("")
        : '<li class="muted">No hay tareas </li>';
}
$form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = $nombre.value.trim();
    if (!nombre) return; // validaci ón mí nima
    tareas.push({ id: newId(), nombre, completada: false });
    $form.reset(); $nombre.focus();
    render();
});
$lista.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const { act, id } = btn.dataset;
    if (act === "toggle") {
        const t = tareas.find(x => x.id === id);
        if (t) { t.completada = !t.completada; render(); }
    }
    if (act === "rm") {
        tareas = tareas.filter(x => x.id !== id);
        render();
    }
});
// ---------- EJERCICIO 3 ( opcional ): LocalStorage ----------
const KEY = " practica-js-tareas ";
document.querySelector("#btn-guardar").addEventListener("click", () => {
    localStorage.setItem(KEY, JSON.stringify(tareas));
    alert(" Guardado en LocalStorage ");
});
document.querySelector("#btn-cargar").addEventListener("click", () => {
    try { tareas = JSON.parse(localStorage.getItem(KEY)) ?? []; }
    catch { tareas = []; }
    render();
});
document.querySelector("#btn-limpiar").addEventListener("click", () => {
    localStorage.removeItem(KEY);
    alert(" LocalStorage limpiado ");
});
// Primer render
render();