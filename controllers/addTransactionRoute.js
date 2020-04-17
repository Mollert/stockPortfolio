
const express = require("express");
const request = require("request");
const router = express.Router();
const fs = require("fs");

const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// Selects day description due to number
const tailEnd = (whatDay) => {
	if (whatDay === 1 || whatDay === 21 || whatDay === 31) {
		return "st";
	} else if (whatDay === 2 || whatDay === 22) {
		return "nd";
	} else if (whatDay === 3 || whatDay === 23) {
		return "rd";
	} else {
		return "th";
	}
}
// Package the day of the week and the number day of the month together
const toWeekDay = (entire) => {
	let aWeekDay = "";
	let allDate = "";
	let dayOfWeek = "";
	let day = "";
	let month = "";

	entire = entire.replace(/-/g, ", ");
	allDate = new Date(entire);

	dayOfWeek = daysOfWeek[allDate.getDay()];
	day = allDate.getDate();

	month = monthsOfYear[allDate.getMonth()];

	aWeekDay = dayOfWeek + " the " + day + tailEnd(day) + " of " + month;
	return aWeekDay;
}


router.post("/", (req, res) => {
//	console.log(req.body);
	let forYear = new Date();
	let justYear = forYear.getFullYear();
	let savingDate = req.body.date + "/" + justYear;

	let transType = req.body.select;
	transType = transType.toLowerCase();

	let priceEach = req.body.sharePrice;

	let transCost = req.body.transCost;
	if (transCost === "") {
		transCost = req.body.sharePrice * req.body.shareNumber;
	}

	let shareQty = req.body.shareNumber;
	if (shareQty === "") {
		shareQty = transCost / req.body.sharePrice;
	}

	priceEach = parseFloat(priceEach).toFixed(2);
	transCost = parseFloat(transCost).toFixed(2);
	shareQty = parseFloat(shareQty).toFixed(3);


	let writeString = savingDate + ", " + req.body.ticker + ", " + transType + ", " + priceEach + ", " + transCost + ", " + shareQty + "\n";
//	console.log(writeString);	
	let path = "./portfolioList/inventoryList.txt"

	fs.writeFile(path, writeString, {flag: "a"}, (error) => {
		if (error) {
			console.log(error.message);
			res.render("error", { error });			
		}
	});

	let action = "";
	switch (transType) {
		case "buy":
			action = "made a purchase";
			break;
		case "sell":
			action = "made a sale";
			break;
		case "dividend":
			action = "recieved a dividend";
			break;
		case "capital gain":
			action = "recieved a capital gain";
			break;
		default:
			break;
	}

	let confirm = {
		when: toWeekDay(savingDate),
		what: action,
		howMany: shareQty,
		ofWhat: req.body.ticker,
		totalPrice: transCost
	}

	res.render("conformation", { confirm });
});


module.exports = router;