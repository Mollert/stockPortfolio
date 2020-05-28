
let getEntries = require("./readData.js");
let addComaAndSign = require("./addComa$.js");


let tradingResults = () => {

	let zeroedOut = [];
	let buyEntry = 0;	
	let sellEntry = 0;	
	let buy = [];	
	let sell = [];
	let buySellLength = 0;
	let buyTotal = 0;
	let sellTotal = 0;
	let buyCarryover = 0;	
	let sellCarryover = 0;
	let sellPrice = 0;
	let runningTallyBuy = 0;
	let runningTallySell = 0;
	let runningTallyTotal = 0;	
	let tradingEffort = "";

//	Gather only tickers (companies) that have sold all that was bought
	getEntries().forEach((zero) => {
		zero.forEach((entry) => {
			if (entry[2] === "sell") {
				sellEntry = sellEntry + parseFloat(entry[5]);
			} else {
				buyEntry = buyEntry + parseFloat(entry[5]);
			}			
		});
		if (sellEntry === buyEntry) {
			zeroedOut.push(zero);		
		}
	});
//	Adding up all of the "buy" costs
	zeroedOut.forEach((tally) => {
		tally.forEach ((buyTally) => {
			if (buyTally[2] !== "sell") {				
				runningTallyBuy = runningTallyBuy + parseFloat(buyTally[4]);
			}
		});
	});
//	Looping through all closed entries
	for (let i = 0 ; i < zeroedOut.length ; i++) {

		buy = [];	
		sell = [];
		buyCarryover = 0;		
		sellCarryover = 0;
//		Separating the "sell" and "buy" of each entry
		for (let j = 0 ; j < zeroedOut[i].length ; j++) {
			if (zeroedOut[i][j][2] === "sell") {
				sell.push({
					price: parseFloat(zeroedOut[i][j][3]),
					qty: parseFloat(zeroedOut[i][j][5])
				});
			} else {
				buy.push({
					price: parseFloat(zeroedOut[i][j][3]),
					qty: parseFloat(zeroedOut[i][j][5])
				});
			}
		}
//		Getting the longest array so to be sure to cover all transactions 
		if (buy.length > sell.length) {
			buySellLength = buy.length;
		} else {
			buySellLength = sell.length;			
		}
//		This loop tabulates the profit from all sales of entries
		for (let k = 0 ; k < buySellLength ; k++) {	
//			If fewer buys than sells
			if (k >= buy.length) {
				buyTotal = 0;
			} else {
				buyTotal = buy[k].qty;
			}
//			If fewer sells than buys
			if (k >= sell.length) {
				sellTotal = 0;
			} else {
				sellTotal = sell[k].qty;
			}
//			Coving the possible carryover from one sell to the next
			if (buyCarryover > 0) {
				buyTotal = buyTotal + buyCarryover;
				buyCarryover = 0;
			}
			
			if (sellCarryover > 0) {
				sellTotal = sellTotal + sellCarryover;
				sellCarryover = 0;
			}
//			Create sell price is more buys than sells
			if (k >= sell.length) {
				sellPrice = sell[sell.length-1].price;
			} else {
				sellPrice = sell[k].price;
			}
//			Building the total sell profit from each sale
			if (sellTotal < buyTotal) {
				runningTallySell = runningTallySell + (sellTotal * sellPrice);
				buyCarryover = buyTotal - sellTotal;
			} else if (sellTotal > buyTotal) {
				runningTallySell = runningTallySell + (buyTotal * sellPrice);
				sellCarryover = sellTotal - buyTotal;
			} else {
				runningTallySell = runningTallySell + (buyTotal * sellPrice);
			}
		}
	}

	runningTallyTotal = runningTallySell - runningTallyBuy;

	if (runningTallyTotal >= 0) {
		tradingEffort = "gain of " + addComaAndSign(runningTallyTotal.toFixed(2).toString());
	} else {
		runningTallyTotal = runningTallyTotal * -1;
		tradingEffort = "loss of " + addComaAndSign(runningTallyTotal.toFixed(2).toString());
	}

	return tradingEffort;
}


module.exports = tradingResults;