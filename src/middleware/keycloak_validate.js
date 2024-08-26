
const Keycloak = require('keycloak-connect');
const session = require('express-session');
require("dotenv").config()

const kcConfig = {
    clientId: "cli-pedidos",
    bearerOnly:true,
    serverUrl:"https://kc.mindtechpy.net",
    realm:"realm_pedidos",
    realmPublicKey:process.env.REALM_PUBLIC_KEY,
    issuer: 'https://kc.mindtechpy.net/realms/realm_pedidos',
    tokenEndpoint: 'https://kc.mindtechpy.net/realms/realm_pedidos/protocol/openid-connect/token',
    responseType: 'code',
    scope: 'openid profile',
    showDebugInformation: true,
    //clave: 'FjE6UUh6Njj7ALmBpEeJbUPwY1bKCtCF',
}

// Configuración de la sesión para Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore },kcConfig);

module.exports = {
    session: session({
        secret: 'mySecretVendelo',
        resave: false,
        saveUninitialized: false,
        store: memoryStore
    }),
    keycloak
}