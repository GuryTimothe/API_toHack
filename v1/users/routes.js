const express = require('express');
const getUser = require("./get_user");
const postUser = require("./post_user");
const requireWriteAccess = require("../../middlewares/requireWriteAccess");
const limiters = require("../../middlewares/limiters");

const router = express.Router();

router.get('/users/:id', limiters.OneSec, getUser);
router.post('/users', limiters.FiveSec, requireWriteAccess, postUser);

module.exports = router;