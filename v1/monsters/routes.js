const express = require('express');
const getMonsters = require("./get_monsters");
const getMonster = require("./get_monster");
const postMonster = require("./post_monster");
const putMonster = require("./put_monster");
const deleteMonster = require("./delete_monster");
const requireWriteAccess = require("../../middlewares/requireWriteAccess");
const limiters = require("../../middlewares/limiters");

const router = express.Router();

router.get('/monsters', limiters.OneSec, getMonsters);
router.get('/monsters/:id', limiters.OneSec, getMonster);
router.post('/monsters', limiters.FiveSec, requireWriteAccess, postMonster);
router.put('/monsters/:id', limiters.FiveSec, requireWriteAccess, putMonster);
router.delete('/monsters/:id', limiters.FiveSec, requireWriteAccess, deleteMonster);

module.exports = router;