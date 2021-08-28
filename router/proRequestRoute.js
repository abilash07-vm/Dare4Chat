const express = require("express");
const { addProRequest, deleteProRequest, getAllProRequest } = require("../controller/ProRequestController");

const router = express.Router();

module.exports = () => {
    router.route('').post(addProRequest).get(getAllProRequest);
    router.delete('/:userid',deleteProRequest);
	return router;
};
