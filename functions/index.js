const functions = require('firebase-functions');
const admin = require('firebase-admin');
const characters = require('./characters');
const creatures = require('./creatures');
const spells = require('./spells');
const weapons = require('./weapons');
const cors = require('cors')({
  origin: true,
});

const settings = {timestampsInSnapshots: true};

/** INITIALIZE DATABASE */
admin.initializeApp(functions.config().firebase);
admin.firestore().settings(settings);

const database = admin.firestore();

/** CHARACTERS API */
exports.characters = functions.https.onRequest((req, res) => {
  return cors(req, res, () => characters.handler(req, res, database))
});

/** CREATURES API */
exports.creatures = functions.https.onRequest((req, res) => {
  return cors(req, res, () => creatures.handler(req, res, database));
});

/** SPELLS API */
exports.spells = functions.https.onRequest((req, res) => {
  return cors(req, res, () => spells.handler(req, res, database));
});

/** WEAPONS API */
exports.weapons = functions.https.onRequest((req, res) => {
  return cors(req, res, () => weapons.handler(req, res, database));
});