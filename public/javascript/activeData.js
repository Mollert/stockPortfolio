
let getEntries = require("./readData.js");


let activeAndShares = () => {

	let allDataArray = getEntries();

	let workingShares = 0;
	let totalShares = 0;
	let activeSharesArray = [];
	// Array lists active tickers and thier total shares
	for (let i = 0 ; i < allDataArray.length ; i++) {
		totalShares = 0;
		for (let j = 0 ; j < allDataArray[i].length ; j++) {
			workingShares = parseFloat(allDataArray[i][j][5]);
			if (allDataArray[i][2] === "sell") {
				totalShares = totalShares - workingShares;
			} else {
				totalShares = totalShares + workingShares;				
			}
		}
		if (totalShares > 0) {
			totalShares = totalShares.toFixed(2);
			activeSharesArray.push([allDataArray[i][0][1], totalShares]);
		}
	}

	return activeSharesArray;
}


module.exports = activeAndShares;