const fs = require('fs');
const path = require('path');
const spellsFilePath = path.join(__dirname, '../spells.json');

var spells = require('../spells.json');
const joi = require('joi');
const initialSpells = JSON.parse(JSON.stringify(require('../spells.json')));

const schema = joi.object().keys({
    spell: joi.string().min(3).max(30).required().regex(/^\w+(?:\s+\w+)*$/),
    type: joi.string().valid('Charm', 'Enchantment', 'Curse', 'Spell', 'Hex', 'Jinx'),
    effect: joi.string().min(4),
    isUnforgivable: joi.boolean().required(),
    id: joi.any()
});

const randomId = require('random-id');

function saveSpellsToFile() {
    fs.writeFileSync(spellsFilePath, JSON.stringify(spells, null, 2));
}

exports.spells_list = function (req, res) {
    let result = spells;
    if (typeof req.query.type !== 'undefined') {
        result = spells.filter(spell => spell.type == req.query.type)
    }
    if (typeof req.query.isUnforgivable !== 'undefined') {
        result = result.filter(spell => spell.isUnforgivable == req.query.isUnforgivable)
    }
    if (typeof req.query.limit !== 'undefined') {
        result = result.slice(0, req.query.limit);
    }

    setTimeout(() => {
        return res.json(result);
    }, 100)
}
exports.delete_all = function (req, res) {
    spells = [];
    saveSpellsToFile();
    res.send({ message: 'Mischief managed' })
}

exports.reset = function (req, res) {
    spells = JSON.parse(JSON.stringify(initialSpells));
    saveSpellsToFile();
    res.send({ message: 'Aparecium', spells: spells })
}
exports.specific_spell = function (req, res) {
    let result = spells.find(spell => spell.id == req.params.spellId);
    if (typeof result !== 'undefined') {
        return res.send(result);
    }
    return res.status(404).send({ message: "Spell not found" });
}

exports.delete_spell = function (req, res) {
    let result = spells.find(spell => spell.id == req.params.spellId);
    if (typeof result == 'undefined') {
        return res.status(404).send({ message: "Spell not found" });
    }
    spells = spells.filter(spell => spell.id != req.params.spellId);
    saveSpellsToFile();
    return res.send({
        message: 'spell deleted'
    });
}

exports.update_spell = function (req, res) {
    let result = spells.find(spell => spell.id == req.params.spellId);
    if (typeof result == 'undefined') {
        return res.status(404).send({ message: "Spell not found" });
    }

    var newSpell = {
        spell: req.body.spell,
        type: req.body.type,
        effect: req.body.effect,
        isUnforgivable: req.body.isUnforgivable,
        id: result.id
    }
    const validation = schema.validate(newSpell);


    const { value, error } = validation;
    const valid = error == null;

    if (!valid) {
        return res.status(422).json({
            message: 'Wizard, I\'m sory but your request is invalid',
            data: error
        })
    }

    const formattedSpell = {
        id: value.id,
        spell: value.spell,
        type: value.type,
        effect: value.effect,
        isUnforgivable: value.isUnforgivable
    };

    spells = spells.filter(spell => spell.id != req.params.spellId);
    spells.push(formattedSpell);
    saveSpellsToFile();
    return res.status(201).json({
        message: "Spell updated",
        spell: {
            id: formattedSpell.id
        }
    });
}

exports.new_spell = function (req, res) {
    var len = 30;
    var pattern = 'aA0'

    var newSpell = {
        id: randomId(len, pattern),
        spell: req.body.spell,
        type: req.body.type,
        effect: req.body.effect,
        isUnforgivable: req.body.isUnforgivable
    }

    let result = spells.find((spell) => spell.spell === newSpell.spell);
    if (typeof result !== 'undefined') {
        return res.status(400).send({
            message: 'Spell ' + newSpell.spell + ' already exists'
        })
    }

    const validation = schema.validate(newSpell);

    const { value, error } = validation;
    const valid = error == null;
    if (!valid) {
        return res.status(422).json({
            message: 'Invalid request',
            data: error
        })
    }

    const formattedSpell = {
        id: value.id,
        spell: value.spell,
        type: value.type,
        effect: value.effect,
        isUnforgivable: value.isUnforgivable
    };

    spells.push(formattedSpell);
    saveSpellsToFile();
    return res.status(201).json({
        message: "Spell created",
        spell: {
            id: formattedSpell.id
        }
    });
}