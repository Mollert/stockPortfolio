
const fs = require("fs");

let getEntries = () => {
	let path = "./portfolioList/inventoryList.txt"
	let readArray = [];
	let workingArray = [];
	let transferArray = [];
	let allActivityArray = [[]];
	let aMatch = false;


	let data = fs.readFileSync(path, "utf8");

	readArray = data.split(/\n/);
	//Remove "new line" from array that was left from the writing process
	if (readArray[readArray.length - 1] === "") {
		readArray.pop();
	}
	// Turns array of transactions into a workable array
	readArray.forEach(each => {
		workingArray = each.split(", ");
		transferArray.push(workingArray);
	});
	// Loads up the allActivityArray with first array
	allActivityArray[0].push(transferArray[0]);
	// This groups transactions by ticker symbol
	for (let i = 1 ; i < transferArray.length ; i++) {
		aMatch = false
		for (let j = 0 ; j < allActivityArray.length ; j++) {
			if (transferArray[i][1] === allActivityArray[j][0][1]) {
				allActivityArray[j].push(transferArray[i]);
				aMatch = true;
			}
		}
		if (!aMatch) {
			allActivityArray.push([transferArray[i]]);
		}
	}
	// This sorts transactions by date per each ticker
	for (let i = 0 ; i < allActivityArray.length ; i++) {
		allActivityArray[i].sort((a,b) => {
			return new Date(a[0]).getTime() - new Date(b[0]).getTime();
		});
	}

	return allActivityArray;
}


module.exports = getEntries;