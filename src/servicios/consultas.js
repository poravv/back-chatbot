const express = require('express');
const router = express.Router();
const DetConsulta = require('../model/model_det_consulta');
const { keycloak } = require('../middleware/keycloak_validate');
const { QueryTypes } = require('sequelize');
const database = require('../database');

// Obtener todos los consulta con sus detalles
router.get('/consultas', keycloak.protect(), async (req, res) => {
    const token = req.kauth.grant.access_token;
    const authData = token.content;
    const username = authData.preferred_username;
    try {
        const resultado = await DetConsulta.findAll({
            where: { idusuario: username }
        });
        res.json({
            estado: "success",
            body: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Crear un nuevo pedido
router.post('/consultas', keycloak.protect(), async (req, res) => {
    try {
        const resultado = await DetConsulta.create(req.body);
        res.status(201).json({
            estado: "success",
            body: resultado
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/consultas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await DetConsulta.update(req.body, {
            where: { idpedido: id }
        });

        if (updated) {
            const updatedDetConsulta = await DetConsulta.findOne({ where: { idpedido: id } });
            res.status(200).json({ pedido: updatedDetConsulta });
        } else {
            res.status(404).json({ message: 'DetConsulta no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
