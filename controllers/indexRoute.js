
const express = require("express");
const request = require("request");
const router = express.Router();

let activeAndShares = require("../public/javascript/activeData.js");
let addComaAndSign = require("../public/javascript/addComa$.js");


router.get("/", (req, res) => {

	let portfolioData = [];
	// Create Object from Array of Arrays
	activeAndShares().forEach(tick => {
		portfolioData.push({
			ticker: tick[0],
			totalShares: tick[1],
			totalCost: addComaAndSign(tick[2]),
			currentValue: tick[3]
		});
	});

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

	res.render("index", { postValue, onlyTickersArray, valueButton, portfolioData });
});


module.exports = router;