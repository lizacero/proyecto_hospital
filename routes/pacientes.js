var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('pacientes', { title: 'pacientes', pacientes: results, opcion: 'disabled', estado: true })
        }
    });
});

router.get('/enviar/:clave', function (req, res, next) {
    const clave = req.params.clave;
    connection.query('SELECT * FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('pacientes', { title: 'pacientes', claveSeleccionada: clave, pacientes: results, opcion: 'disabled', estado: false })
        }
    });
});


router.get('/agregar-paciente', function (req, res, next) {
    res.sendFile('registro-pacientes.html', { root: 'public' })
});
//Agregar pacientes
router.post('/agregar', (req, res) => {
    const cedulaP = req.body.cedulaP
    const nombreP = req.body.nombreP
    const apellidoP = req.body.apellidoP
    const edad = req.body.edad
    const telefono = req.body.telefono
    connection.query(`INSERT INTO pacientes (cedulaP,nombreP,apellidoP,edad,telefono) VALUES (${cedulaP},'${nombreP}','${apellidoP}',${edad},${telefono});`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.redirect('/pacientes')
        }
    });

})
//eliminar pacientes
router.get('/eliminar/:cedulaP', function (req, res, next) {
    const cedulaP = req.params.cedulaP
    connection.query(`DELETE FROM cita_medica WHERE id_paciente=${cedulaP}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            connection.query(`DELETE FROM pacientes WHERE cedulaP=${cedulaP}`, (error, results) => {
                if (error) {
                    console.log("Error en la consulta", error)
                    res.status(500).send("Error en la consulta")
                } else {
                    res.redirect('/pacientes')
                }
            });
        }
    });
});

router.post('/actualizar/:cedulaP', (req, res) => {
    const cedulaP = req.params.cedulaP;
    const nombreP = req.body.nombreP;
    const apellidoP = req.body.apellidoP;
    const edad = req.body.edad;
    const telefono = req.body.telefono;
    connection.query(`UPDATE pacientes SET nombreP='${nombreP}', apellidoP='${apellidoP}', edad=${edad}, telefono=${telefono} WHERE cedulaP=${cedulaP}`, (error, result) => {
        if (error) {
            console.log("Ocurrio un error en la ejecución", error)
            res.status(500).send("Error en la consulta");
        } else {
            res.redirect('/pacientes');
        }
    });
})
module.exports = router;