const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que este archivo apunta a tu configuración de Sequelize
const Pedido = require('./model_pedido'); // Importa el modelo Pedido

const DetConsulta = sequelize.define('DetConsulta', {
    idconsulta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_apellido: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true
    },
    consulta: {
        type: DataTypes.STRING,
        allowNull: true
    },
    documento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idusuario: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fecha_insercion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_procesado: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'det_consulta',
    timestamps: false
});

module.exports = DetConsulta;
