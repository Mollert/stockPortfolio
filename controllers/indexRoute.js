
const express = require("express");
const request = require("request");
const router = express.Router();


let activeAndShares = require("../public/javascript/activeData.js");


router.get("/", (req, res) => {

	let onlyTickersArray = [];
	// Separating the Tickers to its own array
	activeAndShares().forEach(each => {
		onlyTickersArray.push(each[0]);
	});
	// Adding in the "Money Market"
	onlyTickersArray.push("Money Market");
	
	let postValue = {
		total: "Add price to each ticker.",
		size: 1.4 }
	let valueButton = "visible";

	res.render("index", { postValue, onlyTickersArray, valueButton });
});


module.exports = router;