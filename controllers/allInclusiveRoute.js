
const express = require("express");
const request = require("request");
const router = express.Router();

let getEntries = require("../public/javascript/readData.js");
let addComaAndSign = require("../public/javascript/addComa$.js");

const whichColor = (that) => {
	if (that === "sell") {
		return "firebrick";
	} else if (that === "dividend" || that === "capital gain") {
		return "goldenrod";		
	} else {
		return "mediumblue";
	}
}


router.get("/", (req, res) => {

	allActivityArray = getEntries();

	let newTick = allActivityArray[0][0][1];

	let allTrans = [];

	for (let i = 0 ; i < allActivityArray.length ; i++) {

		for (let j = 0 ; j < allActivityArray[i].length ; j++) {
			if (allActivityArray[i][j][1] !== newTick) {
				allTrans[allTrans.length - 1].divHeight = 6;
			}

			allTrans.push({
				divHeight: 4.2,
				ticker: allActivityArray[i][j][1],
				type: allActivityArray[i][j][2],
				typeColor: whichColor(allActivityArray[i][j][2]),
				date: allActivityArray[i][j][0],
				shares: allActivityArray[i][j][5],
				perShare: addComaAndSign(allActivityArray[i][j][3]),
				total: addComaAndSign(allActivityArray[i][j][4])
			});
			newTick = allActivityArray[i][j][1];		
		}
	}

	res.render("allInclusive", { allTrans });
});


module.exports = router;