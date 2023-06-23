const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.formularioNuevaVacante = (req,res) => {
    res.render("nueva-vacante", {
        pagina: "Nueva vacante",
        tagline: "Llena el formulario y publica tu vacante"
    })
}

//Agregar vacante a BD
exports.agregarVacante = async(req,res) => {
    const vacante = new Vacante(req.body)

    //Crear arreglo de habilidades.Este se inyecta del hidden input
    vacante.skills = req.body.skills.split(",");
    console.log(vacante.skills);

    //Almacenarlo en la BD
    const nuevaVacante = await vacante.save();

    //Redireccionar
    res.redirect(`/vacantes/${nuevaVacante.url}`)
}

exports.mostrarVacante = async (req,res,next) => {

    const vacante = await Vacante.findOne({ url: req.params.url }).lean();

    if(!vacante) return next();

    res.render("vacante", {
        vacante : vacante,
        nombrePagina : vacante.titulo,
        barra : true
    })
}

exports.formEditarVacante = async (req,res,next) => {
    const vacante = await Vacante.findOne({ url : req.params.url}).lean();

    if(!vacante) return next();

    res.render("editar-vacante" , {
        vacante,
        nombrePagina : `Editar - ${vacante.titulo}`,

    })
}

exports.editarVacante = async( req,res ) => {
    const vacanteActualizada = req.body;

    vacanteActualizada.skills = req.body.skills.split();

    const vacante = await Vacante.findOneAndUpdate({ url : req.params.url}, vacanteActualizada, {
        new : true,
        runValidators : true
    });
    res.redirect(`/vacantes/${vacante.url}`)
}

exports.eliminarVacante = async( req, res) => {
    const { id } = req.params;

    const vacante = await Vacante.findById(id);
    
    if(vacante){
        await vacante.deleteOne();
        
    }

    res.status(200).send("Vacante eliminada correctamente");
}