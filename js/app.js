//variables del carrito

const carrito =document.querySelector('#carrito');
const contenedorCarrito =document.querySelector('#lista-carrito');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos=document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventsListeners();
function cargarEventsListeners() {
    listaCursos.addEventListener('click',agregarCurso);//agrego el curso al dar click 
    carrito.addEventListener('click',eliminarCurso);//elimino un curso (o varios del mismo)
    vaciarCarrito.addEventListener('click',() =>{
        articulosCarrito =[];
        limpiarHtml();
    })
}



//funciones
function agregarCurso (e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito') ) {
        const cursoElegido = e.target.parentElement.parentElement;
        leerDatosCurso(cursoElegido);

    }
}

function eliminarCurso (e) {
    console.log (e.target.classList);
    if (e.target.classList.contains("borrar-curso")){
        const cursoId=e.target.getAttribute('data-id');
        //elimino del arreglo en vez de === uso !== 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}
//leer y extraer del hHTML el curso seleccionado
function leerDatosCurso(curso) {
    console.log(curso);
    //creo un nuevo objeto con el contenido del curso elegido
    const infoCurso = {
        imagen: curso.querySelector('img').src, //extraigo la imagen
        titulo: curso.querySelector('h4').textContent,//extraigo el texto
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

//Uso un condicional, para ver si es duplicado se agregue como cantidad extra
const existe = articulosCarrito.some( curso=> curso.id === infoCurso.id);
if(existe) {
    const cursos =articulosCarrito.map(curso=> {
        if(curso.id === infoCurso.id){
            curso.cantidad ++;
            return curso; //retorna el objeto actualizado si se duplico
        }else{
            return curso;
        }
    })
    articulosCarrito=[...cursos];
}else{
    articulosCarrito=[...articulosCarrito,infoCurso];
}
    //creo un evento para generar un nuevo array
    console.log(articulosCarrito);
    carritoHTML();
}

//visualizar el arreglo nuevo en el sitio web
function carritoHTML() {
    //limpio el carrito pára qe no se acumule desde el append child
    limpiarHtml();

    articulosCarrito.forEach(curso => {
        const{imagen,titulo,precio,cantidad,id}=curso
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>    
        <td>${cantidad}</td>
        <td><a href="#" class = "borrar-curso" data-id=${id}>x</a></td>
        `;
        //voy agregando los cursos que agrego
        contenedorCarrito.appendChild(row);
    })
}


function limpiarHtml() {
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}