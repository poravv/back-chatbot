const express = require('express');
const router = express.Router();
const Pedido = require('../model/model_pedido');
const DetPedido = require('../model/model_det_pedido');
const { keycloak } = require('../middleware/keycloak_validate');
const { QueryTypes } = require('sequelize');
const database = require('../database');

// Obtener todos los pedidos con sus detalles
router.get('/pedidos', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    const username = authData.preferred_username;
    try {
        const pedidos = await Pedido.findAll({
            include: [{
                model: DetPedido,
                //as: 'detalles'
            }],
            where: { idusuario: username }
        });
        res.json({
            estado: "success",
            body: pedidos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/getsql', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    const username = authData.preferred_username;
    try {
        await database.query(`select * from dbchatbot.vw_pedidos where idusuario='${username}'`, { type: QueryTypes.SELECT })
        .then((response) => {
            res.json({
                mensaje: "successfully",
                authData: authData,
                body: response
            });
        }).catch(error => {
            res.json({
                mensaje: "error",
                error: error,
                detmensaje: `Error en el servidor, ${error}`
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo pedido
router.post('/pedidos', keycloak.protect(), async (req, res) => {
    try {
        const pedido = await Pedido.create(req.body, {
            include: [{ model: DetPedido, as: 'detalles' }]
        });
        res.status(201).json({
            estado: "success",
            body: pedido
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Pedido.update(req.body, {
            where: { idpedido: id }
        });

        if (updated) {
            const updatedPedido = await Pedido.findOne({ where: { idpedido: id } });
            res.status(200).json({ pedido: updatedPedido });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
