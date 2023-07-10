var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM medicos', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('medicos', { title: 'medicos', medicos: results, option: 'disabled', estado: true })
        }
    });
});

router.get('/enviar/:clave', function (req, res, next) {
    const clave = req.params.clave;
    connection.query('SELECT * FROM medicos', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('medicos', { title: 'medicos', claveSeleccionada: clave, medicos: results, opcion: 'disabled', estado: false })
        }
    });
});

router.get('/agregar-medico', function (req, res, next) {
    connection.query('SELECT especialidad FROM medicos', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {

            let especialidades = ['Medicina general', 'Cardiologia', 'Medicina interna', 'Dermatología', 'Rehabilitación física', 'Psicología', 'Odontología', 'Radiología']
            let resultsEspecialidades = results.map(objeto => objeto.especialidad);//separar packete 
            let resultsSinRepetidos = especialidades.filter((elemento) => {//filtrar repetidos
                return !resultsEspecialidades.includes(elemento);
            });
            res.render('registro-medicos', { layout: 'registro', especialidades: resultsSinRepetidos })
        }
    });
});

//Agregar medicos
router.post('/agregar', (req, res) => {
    const cedulaM = req.body.cedulaM;
    const nombreM = req.body.nombreM;
    const apellidoM = req.body.apellidoM;
    const correo = req.body.correo;
    const consultorio = req.body.consultorio;
    const especialidad = req.body.especialidad;
    connection.query(`INSERT INTO medicos (cedulaM, nombreM, apellidoM, especialidad, consultorio, correo) VALUES (${cedulaM},'${nombreM}', '${apellidoM}', '${especialidad}', '${consultorio}', '${correo}')`, (error, result) => {
        if (error) {
            console.log("Ocurrio un error en la ejecución", error)
            res.status(500).send("Error en la consulta");
        } else {
            res.redirect('/medicos');
        }
    });
})

//eliminar medicos
router.get('/eliminar/:cedulaM', function (req, res, next) {
    const cedulaM = req.params.cedulaM
    connection.query(`DELETE FROM cita_medica WHERE id_medico=${cedulaM}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            connection.query(`DELETE FROM medicos WHERE cedulaM=${cedulaM}`, (error, results) => {
                if (error) {
                    console.log("Error en la consulta", error)
                    res.status(500).send("Error en la consulta")
                } else {
                    res.redirect('/medicos')
                }
            });
        }
    });
});

router.post('/actualizar/:cedulaM', (req, res) => {
    const cedulaM = req.params.cedulaM;
    const nombreM = req.body.nombreM;
    const apellidoM = req.body.apellidoM;
    const especialidad = req.body.especialidad;
    const consultorio = req.body.consultorio;
    const correo = req.body.correo;
    connection.query(`UPDATE medicos SET nombreM='${nombreM}', apellidoM='${apellidoM}', especialidad=${especialidad}, consultorio=${consultorio}, correo=${correo} WHERE cedulaM=${cedulaM}`, (error, result) => {
        if (error) {
            console.log("Ocurrio un error en la ejecución", error)
            res.status(500).send("Error en la consultaf");
        } else {
            res.redirect('/medicos');
        }
    });
})
module.exports = router;