const fs = require('fs');
const path = require('path');
const charactersFilePath = path.join(__dirname, '../characters.json');

var characters = require('../characters.json');
const joi = require('joi');
const initialCharacters = JSON.parse(JSON.stringify(require('../characters.json')));
const randomId = require('random-id');

const schema = joi.object().keys({
    id: joi.any(),
    name: joi.string().min(2).max(100).required(),
    role: joi.string().allow('', null),
    house: joi.string().allow('', null),
    school: joi.string().allow('', null),
    ministryOfMagic: joi.boolean().default(false),
    orderOfThePhoenix: joi.boolean().default(false),
    dumbledoresArmy: joi.boolean().default(false),
    deathEater: joi.boolean().default(false),
    bloodStatus: joi.string().allow('', null),
    species: joi.string().allow('', null),
    wand: joi.string().allow('', null),
    boggart: joi.string().allow('', null),
    patronus: joi.string().allow('', null),
    animagus: joi.string().allow('', null),
    alias: joi.string().allow('', null)
});

function saveCharactersToFile() {
    fs.writeFileSync(charactersFilePath, JSON.stringify(characters, null, 4));
}

exports.characters_list = function (req, res) {
    let result = characters;
    if (typeof req.query.house !== 'undefined') {
        result = result.filter(c => c.house === req.query.house);
    }
    if (typeof req.query.role !== 'undefined') {
        result = result.filter(c => c.role === req.query.role);
    }
    if (typeof req.query.bloodStatus !== 'undefined') {
        result = result.filter(c => c.bloodStatus === req.query.bloodStatus);
    }
    if (typeof req.query.species !== 'undefined') {
        result = result.filter(c => c.species === req.query.species);
    }
    if (typeof req.query.limit !== 'undefined') {
        result = result.slice(0, req.query.limit);
    }

    return res.json(result);
};

exports.specific_character = function (req, res) {
    let result = characters.find(c => c.id == req.params.characterId);
    if (typeof result !== 'undefined') {
        return res.send(result);
    }
    return res.status(404).send({ message: "Character not found" });
};

exports.delete_all = function (req, res) {
    characters = [];
    saveCharactersToFile();
    return res.send({ message: 'All characters deleted' });
};

exports.reset = function (req, res) {
    characters = JSON.parse(JSON.stringify(initialCharacters));
    saveCharactersToFile();
    return res.send({ message: 'Characters reset', characters: characters });
};

exports.delete_character = function (req, res) {
    let result = characters.find(c => c.id == req.params.characterId);
    if (typeof result === 'undefined') {
        return res.status(404).send({ message: "Character not found" });
    }
    characters = characters.filter(c => c.id != req.params.characterId);
    saveCharactersToFile();
    return res.send({ message: 'Character deleted' });
};

exports.update_character = function (req, res) {
    let result = characters.find(c => c.id == req.params.characterId);
    if (typeof result === 'undefined') {
        return res.status(404).send({ message: "Character not found" });
    }

    var newChar = Object.assign({}, req.body, { id: result.id });
    const validation = schema.validate(newChar);
    const { value, error } = validation;

    if (error) {
        return res.status(422).json({
            message: 'Invalid character request',
            data: error
        });
    }

    const formattedCharacter = Object.assign({ id: value.id, name: value.name }, value);

    characters = characters.filter(c => c.id != req.params.characterId);
    characters.push(formattedCharacter);
    saveCharactersToFile();

    return res.status(201).json({
        message: "Character updated",
        character: { id: formattedCharacter.id }
    });
};

exports.new_character = function (req, res) {
    var len = 24;
    var pattern = '0123456789abcdef';

    var newChar = Object.assign({}, req.body, { id: randomId(len, pattern) });

    let existing = characters.find(c => c.name === newChar.name);
    if (typeof existing !== 'undefined') {
        return res.status(400).send({
            message: 'Character ' + newChar.name + ' already exists'
        });
    }

    const validation = schema.validate(newChar);
    const { value, error } = validation;

    if (error) {
        return res.status(422).json({
            message: 'Invalid request',
            data: error
        });
    }

    const formattedCharacter = Object.assign({ id: value.id, name: value.name }, value);

    characters.push(formattedCharacter);
    saveCharactersToFile();

    return res.status(201).json({
        message: "Character created",
        character: { id: formattedCharacter.id }
    });
};
