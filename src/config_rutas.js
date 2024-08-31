const express = require('express');
const rutas = express()

const pedidos = require('./servicios/pedidos')
const consultas = require('./servicios/consultas')

rutas.use('/chatbot/api/pedido',pedidos);
rutas.use('/chatbot/api/consulta',consultas);

module.exports = rutas;
