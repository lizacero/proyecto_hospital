var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    connection.query('SELECT cm.id,cm.fecha, cm.id_paciente, pa.nombreP, med.nombreM, med.apellidoM, med.consultorio FROM cita_medica cm, pacientes pa, medicos med WHERE cm.id_paciente = pa.cedulaP AND cm.id_medico= med.cedulaM', (error, results) => {
        if (error) {
            console.log("Error en la consulta1", error)
            res.status(500).send("Error en la consulta1")
        } else {
            res.render('citas', { title: 'citas', citas: results })
        }
    });
});

router.get('/agregar-cita', function (req, res, next) {
    connection.query('SELECT cedulaP FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta2", error)
            res.status(500).send("Error en la consulta2")
        } else {
            connection.query('SELECT especialidad FROM medicos', (error, results2) => {
                if (error) {
                    console.log("Error en la consulta3", error)
                    res.status(500).send("Error en la consulta3")
                } else {
                    res.render('registro-citas', { layout: 'registro', pacientes: results, medicos: results2 })
                }
            });
        }
    });
});

router.post('/agregar', function (req, res, next) {
    const cedulaP = req.body.cedulaP;
    const fecha = req.body.fecha;
    const especialidad = req.body.especialidad;
    connection.query(`SELECT cedulaM FROM medicos WHERE especialidad='${especialidad}'`, (error, results) => {
        if (error) {
            console.log("Error en la consulta4", error)
            res.status(500).send("Error en la consulta4")
        } else {
            let cedulaM = results[0].cedulaM
            connection.query(`INSERT INTO cita_medica (id_paciente, id_medico, fecha) VALUES (${cedulaP},${cedulaM}, '${fecha}')`, (error, result) => {
                if (error) {
                    console.log("Ocurrio un error en la ejecución", error)
                    res.status(500).send("Error en la consulta5");
                } else {
                    res.redirect('/citas');
                }
            });
        }
    });
})
//eliminar citas
router.get('/eliminar/:id', function (req, res, next) {
    const id = req.params.id
    connection.query(`DELETE FROM cita_medica WHERE id=${id}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta6", error)
            res.status(500).send("Error en la consulta6")
        } else {
            res.redirect('/citas')
        }
    });
});

module.exports = router;