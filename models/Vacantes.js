const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

const vacantesSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: "El nombre de la vacante es obligatorio",
        trim: true
    },
    empresa: {
        type: String,
        trim: true
    },
    ubicacion: {
        type: String,
        trim: true,
        required: "La ubicacion es obligatoria"
    },
    salario: {
        type: String,
        default: 0,
        trim: true
    },
    contrato: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    url : { // La va a crear slug
        type : String,
        lowercase: true
    },
    skills: [String]
});
vacantesSchema.pre("save", function(next) {
    //Crear la url
    const url = slug(this.titulo);
    this.url = `${url}-${shortid.generate()}`;
    next()
})

module.exports = mongoose.model("Vacante", vacantesSchema);