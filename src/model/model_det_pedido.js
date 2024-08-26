const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Asegúrate de que este archivo apunta a tu configuración de Sequelize
const Pedido = require('./model_pedido'); // Importa el modelo Pedido

const DetPedido = sequelize.define('DetPedido', {
    iddet_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    producto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.STRING,
        allowNull: true
    },
    idpedido: {
        type: DataTypes.INTEGER,
        references: {
            model: Pedido,
            key: 'idpedido'
        }
    }
}, {
    tableName: 'det_pedido',
    timestamps: false
});

Pedido.hasMany(DetPedido, {
    foreignKey: 'idpedido',
    sourceKey: "idpedido",
    primaryKey: "idpedido",
});
DetPedido.belongsTo(Pedido, {
    foreignKey: 'idpedido',
    sourceKey: "idpedido",
    primaryKey: "idpedido",
});

module.exports = DetPedido;
