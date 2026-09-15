const express = require('express');
const router = express.Router();
const charactersController = require('../controllers/charactersController.js');
var basicAuth = require('express-basic-auth');

router.use(basicAuth({
    users: { 'admin': 'supersecret' },
    unauthorizedResponse: {
        message: "Sorry Wizard, can't let you in."
    }
}));

router.get('/', charactersController.characters_list);
router.post('/', charactersController.new_character);
router.delete('/actions/deleteAll', charactersController.delete_all);
router.get('/actions/reset', charactersController.reset);
router.get('/:characterId', charactersController.specific_character);
router.delete('/:characterId', charactersController.delete_character);
router.put('/:characterId', charactersController.update_character);

module.exports = router;