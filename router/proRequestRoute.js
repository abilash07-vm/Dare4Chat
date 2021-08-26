const express = require("express");
const { addProRequest, deleteProRequest } = require("../controller/ProRequestController");

const router = express.Router();

module.exports = () => {
    router.post('',addProRequest);
    router.delete('/:userid',deleteProRequest);
	return router;
};
