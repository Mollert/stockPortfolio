
const express = require("express");
const request = require("request");
const router = express.Router();

let activeAndShares = require("../public/javascript/activeData.js");
let addComaAndSign = require("../public/javascript/addComa$.js");


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
			if (tickersAndShares[i][0] === priceObjArray[j][0]) {
				price = parseFloat(priceObjArray[j][1]);
				totalTally = totalTally + (price * shares);
			}
		}
	}
	// Adding in the Money MArket amount to the total
	priceObjArray.forEach(value => {
		if (value[0] === "Money") {
			totalTally = totalTally + parseFloat(value[1]);
			totalTally = (totalTally).toFixed(2);			
		}
	});
	// Adding a comma if total is large enough
	postValue.total = addComaAndSign(totalTally);

	let valueButton = "hidden";

	let portfolioData = [];
	// Create Object from Array of Arrays and add current value
	tickersAndShares.forEach(tick => {
		let assessment = 0;
		priceObjArray.forEach(amount => {
			if (tick[0] === amount[0]) {
				assessment = parseFloat(tick[1]) * parseFloat(amount[1]);
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

	res.render("index", { postValue, valueButton, portfolioData });
});


module.exports = router;