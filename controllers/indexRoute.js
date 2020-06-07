
const express = require("express");
const request = require("request");
const router = express.Router();

let activeAndShares = require("../public/javascript/activeData.js");
let createPromises = require("../public/javascript/getPromises.js");
let tradingResults = require("../public/javascript/tradingRecord.js");
let addComaAndSign = require("../public/javascript/addComa$.js");


router.get("/", (req, res) => {

	let onlyTickersArray = [];
	let currentPort = [];
	let portfolioData = [];

	// Separating the Tickers to its own array
	activeAndShares().forEach(each => {
		onlyTickersArray.push(each[0]);
	});

	const letsResolve = (pGroup) => {
		Promise.all(pGroup).then(result => {
//			return result;
			// Split result array into strings then split strings into parts at commas.
			result.forEach(entry => {
				let temp = entry.split('|');		
				currentPort.push({
					name: temp[0],
					ticker: temp[1],
					price: temp[2]
				});
			});
			// Find and post current price
			// Create Object from Array of Arrays
			activeAndShares().forEach(tick => {
				let assessment = 0;
				currentPort.forEach(amount => {
					if (tick[0] === amount.ticker) {
						assessment = parseFloat(tick[1]) * parseFloat(amount.price);
						assessment = assessment.toFixed(2);				
					}
				});

				portfolioData.push({
					ticker: tick[0],
					totalShares: tick[1],
					totalCost: addComaAndSign(tick[2]),
					currentValue: addComaAndSign(assessment)
				});
			});

			res.render("index", { currentPort, tradingResults, portfolioData });	
		})
	}

	letsResolve(createPromises(onlyTickersArray));

});


module.exports = router;