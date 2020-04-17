
const express = require("express");
const request = require("request");
const router = express.Router();


let getEntries = require("../public/javascript/readData.js");


router.get("/", (req, res) => {

	allActivityArray = getEntries();
	
	res.render("allInclusive", { allActivityArray });
});


module.exports = router;