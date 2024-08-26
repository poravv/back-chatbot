const express = require('express');
const rutas = express()

const pedidos = require('./servicios/pedidos')

rutas.use('/chatbot/api/pedido',pedidos);

module.exports = rutas;
