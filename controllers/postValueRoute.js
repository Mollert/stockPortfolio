
const express = require("express");
const request = require("request");
const router = express.Router();


let activeAndShares = require("../public/javascript/activeData.js");


router.post("/", (req, res) => {

	let postValue = {
		total: "",
		size: 1.8 };

	let priceObjArray = Object.entries(req.body);
	let priceObjLength = priceObjArray.length -1;

	let tickersAndShares = activeAndShares();

	let price = 0;
	let shares = 0;
	let totalTally = 0;
	let lengthMM = 0;
	// Multipling the share price by each tickers share amount and totaling amounts
	for (let i = 0 ; i < tickersAndShares.length ; i++) {
		price = 0;
		shares = parseFloat(tickersAndShares[i][1]);
		for (let j = 0 ; j < priceObjLength ; j++) {
			if (tickersAndShares[i][0] === priceObjArray[i][0]) {
				price = parseFloat(priceObjArray[i][1]);
				totalTally = totalTally + (price * shares);
			}
		}
	}
	// Adding in the Money MArket amount to the total
	lengthMM = priceObjArray.length - 1;
	totalTally = totalTally + parseFloat(priceObjArray[lengthMM][1]);
	totalTally = (totalTally).toFixed(2);
	// Adding a comma if total is large enough
	if (totalTally.length > 6) {
		let theLength = totalTally.length - 6;
		totalTally = totalTally.slice(0, theLength) + "," + totalTally.slice(theLength);
	}	

	postValue.total = "$" + totalTally.toString();

	let valueButton = "hidden";

	res.render("index", { postValue, valueButton });
});


module.exports = router;