const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController.js")
const vacantesController = require("../controllers/vacantesController.js")

module.exports = () => {
    router.get("/" , homeController.mostrarTrabajos);

    //Crear vacantes

    router.get("/vacantes/nueva" , vacantesController.formularioNuevaVacante);
    router.post("/vacantes/nueva" , vacantesController.agregarVacante);

    //Mostrar vacante
    router.get("/vacantes/:url", vacantesController.mostrarVacante);

    //Editar vacante
    router.get("/vacantes/editar/:url", vacantesController.formEditarVacante);
    router.post("/vacantes/editar/:url", vacantesController.editarVacante);

    //Eliminar vacante
    router.delete("/vacantes/eliminar/:id", vacantesController.eliminarVacante);

    return router;
}