
let addComaAndSign = (dull) => {

	if (dull.length > 6) {
		let theLength = dull.length - 6;
		dull = "$" + dull.slice(0, theLength) + "," + dull.slice(theLength);
	} else {
		dull = "$" + dull;
	}

	return dull;
}


module.exports = addComaAndSign;