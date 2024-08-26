const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que este archivo apunta a tu configuración de Sequelize

const Pedido = sequelize.define('Pedido', {
    idpedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idusuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_insercion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_proceso: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'pedido',
    timestamps: false
});

module.exports = Pedido;
