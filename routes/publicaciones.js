let express = require('express');
let router = express.Router();
let models = require('../models/index')

router.get('/listaPublicaciones', function (req, res, next) {
    models.sequelize.query(' SELECT * FROM "Semilleros" INNER JOIN "Publicaciones" ON "Semilleros"."idSemillero" = "Publicaciones"."idSemillero"', 
    {type: models.sequelize.QueryTypes.SELECT})
        .then(lista => {
            console.log(lista);
            res.json({
                "data": lista
            });
        }

).catch(
    (error) => {
        console.log(error);
        res.json(error);
    }
);
});

router.post('/crearPublicacion', function (req, res) {
    let infoPublicacion = {
        "fechaPublicacion": req.body.fechaPublicacion,
        "tituloPublicacion": req.body.tituloPublicacion,
        "imagenPublicacion": req.body.imagenPublicacion,
        "textoPublicacion": req.body.textoPublicacion,
        "idSemillero": req.body.idSemillero
    };
    console.log(infoPublicacion);
    models.Publicaciones.create(infoPublicacion).then(
        (nuevaPublicacion, infoCreacion) => {
            res.json(nuevaPublicacion);
        }
    ).catch(
        (error) => {
            res.json(error);
        }
    );
});

module.exports = router;

router.get('/buscarPublicacion/:id', function (req, res) {
    let idPublicacion = req.params.id;
    models.Publicaciones.find({
        where: {
            "idPublicacion": idPublicacion
        }
    }).then(
        (publicacion) => {
            res.json(publicacion);
        }
    ).catch(
        (error) => {
            res.json(error);
        }
    )
});

router.get('/eliminarPublicacion/:id', function (req, res) {
    let idPublicacion = req.params.id;
    models.Publicaciones.find({
        where: {
            "idPublicacion": idPublicacion
        }
    }).then(
        (publicacion) => {
            publicacion.destroy().then(
                () => {
                    res.json({
                        "msg": "Se elimino la publicación"
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(400).json(error);
        }
    )
});

router.post('/modificarPublicacion', function (req, res) {
    let idPublicacion = req.body.idPublicacion;
    let infoPublicacion = {
        "fechaPublicacion": req.body.fechaPublicacion,
        "tituloPublicacion": req.body.tituloPublicacion,
        "imagenPublicacion": req.body.imagenPublicacion,
        "textoPublicacion": req.body.textoPublicacion,
        "idSemillero": req.body.idSemillero

    };
    models.Publicaciones.find({
        where: {
            "idPublicacion": idPublicacion
        }
    }).then(
        (publicacion) => {
            publicacion.updateAttributes(infoPublicacion).then(
                (publicacion) => {
                    console.log(publicacion);
                    res.json(publicacion);
                }
            );
        }
    ).catch(
        (error) => {
            res.json(error);
        }
    )
});