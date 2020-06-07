
const express = require("express");
const request = require("request");
const router = express.Router();

let watchThese = require("../public/javascript/readWatchList.js");
let createPromises = require("../public/javascript/getPromises.js");


router.get("/", (req, res) => {

	let tickersNotes = watchThese();
	let tickersOnly = [];
	let expanded = [];
	let standin = "";
	let watching = [];	
//	Gathering only the ticker symbols for the Promises
	tickersNotes.forEach(only => {
		tickersOnly.push(only[0]);
	});

	const letsResolve = (pGroup) => {
		Promise.all(pGroup).then(result => {
			result.forEach(each => {
//				Split each sting into an array
				expanded = each.split('|');			
				standin = "";
//				Capture the notes associated with each ticker
				for (let i = 0 ; i < tickersNotes.length ; i++) {
					if (tickersNotes[i].length > 1 && expanded[1] === tickersNotes[i][0]) {
						standin = tickersNotes[i][1];
					}
				}
//				Loading up an array of objects for Handlebars			
				watching.push({
					company: expanded[0],
					symbol: expanded[1],
					value: expanded[2],
					note: standin
				});
			});
			
			res.render("watchList", { watching });
		})
	}

	letsResolve(createPromises(tickersOnly));
});


module.exports = router;