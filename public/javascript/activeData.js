
let getEntries = require("./readData.js");


let activeAndShares = () => {

	let allDataArray = getEntries();

	let workingShares = 0;
	let totalShares = 0;
	let workingCost = 0;
	let totalCost = 0;	
	let activeSharesArray = [];
	// Array lists active tickers and thier total shares
	for (let i = 0 ; i < allDataArray.length ; i++) {
		totalShares = 0;
		totalCost = 0;		
		for (let j = 0 ; j < allDataArray[i].length ; j++) {
			workingShares = parseFloat(allDataArray[i][j][5]);
			workingCost = parseFloat(allDataArray[i][j][4]);
			if (allDataArray[i][j][2] === "sell") {
				totalShares = totalShares - workingShares;
				totalCost = totalCost - workingCost;
			} else {
				totalShares = totalShares + workingShares;
				totalCost = totalCost + workingCost;
			}
		}
		if (totalShares > 0) {
			totalShares = totalShares.toFixed(2);
			totalCost = totalCost.toFixed(2);			
			activeSharesArray.push([allDataArray[i][0][1], totalShares, totalCost, "0.00"]);
		}
	}

	return activeSharesArray;
}


module.exports = activeAndShares;