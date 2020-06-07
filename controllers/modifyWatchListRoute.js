
const express = require("express");
const request = require("request");
const router = express.Router();
const fs = require("fs");


router.post("/", (req, res) => {

	let confirmationMessage = "";
	let modifyString = "";
//	If adding to the list then if with or without a note
	if (req.body.modify === "Add to List") {
		if (req.body.watchNote !== "") {
			modifyString = req.body.watchTicker + "| " + req.body.watchNote + "\n";
			confirmationMessage = "A note was added under the ticker " + req.body.watchTicker + ".";
		} else {
			modifyString = req.body.watchTicker + "\n";
			confirmationMessage = req.body.watchTicker + " was added to the watch list.";
		}
	}
//	If deleting from the list
	if (req.body.modify === "Remove from List") {
		modifyString = req.body.watchTicker + "| delete\n";
		confirmationMessage = req.body.watchTicker + " and its notes were deleted from the watch list.";
	}
//console.log(modifyString);	
	let path = "./portfolioList/watchList.txt"

	fs.writeFile(path, modifyString, {flag: "a"}, (error) => {
		if (error) {
			console.log(error.message);
			res.render("error", { error });			
		}
	});

	res.render("modifyConfirmation", { confirmationMessage });
});


module.exports = router;