import axios from "axios";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded" , () => {
    const skills = document.querySelector(".lista-conocimientos");

    if(skills) {
        skills.addEventListener("click", agregarSkills);

        //Una vez que estamos en editar, llamar de vuelta la funcion
        skillsSeleccionados();
    }

    const vacantesListado = document.querySelector(".panel-administracion");

    if(vacantesListado) {
        vacantesListado.addEventListener("click", accionesListado);
    }
});

const skills = new Set();
const agregarSkills = e => {
    if(e.target.tagName === "LI") {
        if(e.target.classList.contains('activo')){
            //Remover clase
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
        } else {
            skills.add(e.target.textContent);
            e.target.classList.add('activo');
        }
    }
    const skillsArray = [...skills];
    document.querySelector("#skills").value = skillsArray;

    console.log(skills)
}

const skillsSeleccionados = () => {
    const seleccionadas = Array.from(document.querySelectorAll(".lista-conocimientos .activo"));


    //LLenar el set con cada uno de los activos
    seleccionadas.forEach( seleccionada => {
        skills.add(seleccionada.textContent)
    } )

    //Inyectar en el hidden
    const skillsArray = [...skills];
    document.querySelector("#skills").value = skillsArray;
}

//Eliminar vacantes

const accionesListado = e => {
    e.preventDefault();

    if(e.target.dataset.eliminar){
        //Eliminar con axios

        Swal.fire({
            title: '¿Confirmar eliminacion?',
            text: "Una vez eliminado, no se podra recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText : "No, no eliminar"
          }).then((result) => {
            if (result.isConfirmed) {

                //Enviar la peticion con axios

                const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`;

                //Axios para eliminar el registro

                axios.delete(url, { params: {url}})
                    .then(function(respuesta){
                        if(respuesta.status === 200){
                            Swal.fire(
                                'Eliminado',
                                respuesta.data,
                                'success'
                              );
                            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                        }
                    });
                  
            }
          })

            }else if(e.target.tagName === "A"){
                window.location.href = e.target.href;
            }
}