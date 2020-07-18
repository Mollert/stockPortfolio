
const fs = require("fs");

let watchThese = () => {
	let path = "./portfolioList/watchList.txt"
	let readArray = [];
	let workingArray = [];
	let transferArray = [];
	let deleteThese = [];
	let watchWithNotes = [[]];
	let aMatch = false;


	let data = fs.readFileSync(path, "utf8");

	readArray = data.split(/\n/);
	//Remove "new line" from array that was left from the writing process
	if (readArray[readArray.length - 1] === "") {
		readArray.pop();
	}
	// Turns array of transactions into a workable array

	readArray.forEach(each => {
		workingArray = each.split("| ");
		transferArray.push(workingArray);
	});
	//  Check if any elements in array are labled "delete"
	//  and if there are any labeled "delete", delete them
	transferArray.forEach(destroy => {	
		if (destroy[1] === "delete") {
			deleteThese.push(destroy[0]);
		}
	});
	if (deleteThese.length > 0) {
		for (let i = 0 ; i < transferArray.length ; i++) {
			for (let j = 0 ; j < deleteThese.length ; j++) {
				if (transferArray[i][0] === deleteThese[j]) {
					transferArray.splice(i, 1);
					i--;
				}
			}
		}
	}
	// Load watchWithNotes with first ticker
	watchWithNotes[0].push(transferArray[0][0]);
	// This adds each ticker symbol to their own array
	for (let i = 1 ; i < transferArray.length ; i++) {
		aMatch = false
		for (let j = 0 ; j < watchWithNotes.length ; j++) {
			if (transferArray[i][0] === watchWithNotes[j][0]) {
				aMatch = true;
			}
		}
		if (!aMatch) {
			watchWithNotes.push([transferArray[i][0]]);
		}
	}
	//  This adds each tickers notes (in an array) to its array
	for (let i = 0 ; i < transferArray.length ; i++) {
		if (transferArray[i].length === 2) {
			for (let j = 0 ; j < watchWithNotes.length ; j++) {
				if (transferArray[i][0] === watchWithNotes[j][0]) {
					if (watchWithNotes[j].length === 1) {
						watchWithNotes[j].push([transferArray[i][1]]);
					} else {
						watchWithNotes[j][1].push(transferArray[i][1]);						
					}
				}
			}		
		}
	}

	return watchWithNotes;
}


module.exports = watchThese;