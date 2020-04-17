
// Checks for only numbers and only two decimal points of Present ticker values
document.querySelectorAll(".eachTicker").forEach(el => el.addEventListener("keyup", function(event) {
	let twoDecimal = this.value;
	let check = /^\d+(\.\d{0,2})?$/.test(twoDecimal);
	if (check) {
		this.value = twoDecimal;
	} else {
		let alertNote = "";
		if (twoDecimal.length > 3) {
			let thirdNum = 0;
			let point = twoDecimal.charAt(twoDecimal.length - 4);
			if (point === ".") {
				thirdNum = twoDecimal.charAt(twoDecimal.length - 1);
				twoDecimal = twoDecimal.slice(0, -1);			
				if (thirdNum > 4) {
					twoDecimal = parseFloat(twoDecimal) + .01;
					twoDecimal = twoDecimal.toFixed(2);
				}
			}
			alertNote = "Enter a two decimal point number only.  You typed " + thirdNum + " as a third.";		
		}
		for (let i = 0 ; i < twoDecimal.length ; i++) {
			let isLetter = /[A-Za-z]/.test(twoDecimal.charAt(i));
			if (isLetter) {
				let aLetter = twoDecimal.charAt(i);
				twoDecimal = twoDecimal.replace(twoDecimal.charAt(i), "");
				alertNote = "Only numbers please. You typed a " + aLetter + ".";
				i--;
			}
		}
		this.value = twoDecimal;
		alert(alertNote);
	}
}));

let listNum = 0;
let allList = 0;
// Checks if each ticker has a value associated with it.  If not - reds it out.  Then submits
document.getElementById("postValue").addEventListener("click", function(event) {
	allList = 0;
	listNum = document.querySelectorAll(".eachTicker").length;
	for (let i = 0 ; i < listNum ; i++) {
		if (document.querySelectorAll(".eachTicker")[i].value !== "" && document.querySelectorAll(".eachTicker")[i].value > 1) {
 			allList++;
 			document.querySelectorAll(".tickerName")[i].style.color = "mediumblue";
 			document.querySelectorAll(".eachTicker")[i].style.borderColor = "mediumblue";						
 		} else {
 			document.querySelectorAll(".tickerName")[i].style.color = "red";
			document.querySelectorAll(".eachTicker")[i].style.borderColor = "red";			
 		}
	}
	if (listNum === allList) {	
		document.getElementById("present").submit();		
	}
});


// Get date for Transaction
let monthDay = new Date();
let holderDate =  (monthDay.getMonth() + 1) + "/" + monthDay.getDate();
document.getElementById("date").value = holderDate;

// Check and remove anything other than letters and then upper case them for Transaction Ticker
const checkAndUpperCase = () => {
	let letter = document.getElementById("ticker").value;
	let check = /^[a-zA-Z]+$/.test(letter);
	if (check) {
		letter = letter.toUpperCase();
		document.getElementById("ticker").value = letter;
	} else {
		let wrongType = "";
		for (let i = 0 ; i < letter.length ; i++) {
			noLetter = /[a-zA-Z]/.test(letter.charAt(i));
			if (!noLetter) {
				let newLetter = letter.replace(letter.charAt(i), "");
				wrongType = letter.charAt(i);
				document.getElementById("ticker").value = newLetter;
			}
		}
		alert("Only letters please. You typed a " + wrongType + ".");
	}
}

// Checks for only numbers and only two decimal points of Transcation values
const checkAndTwoPlace = (theID) => {
	let twoDecimal = document.getElementById(theID).value;
	let check = /^\d+(\.\d{0,2})?$/.test(twoDecimal);
	if (check) {
		document.getElementById(theID).value = twoDecimal;
	} else {
		let alertNote = "";
		if (twoDecimal.length > 3) {
			let thirdNum = 0;
			let point = twoDecimal.charAt(twoDecimal.length - 4);
			if (point === ".") {
				thirdNum = twoDecimal.charAt(twoDecimal.length - 1);
				twoDecimal = twoDecimal.slice(0, -1);			
				if (thirdNum > 4) {
					twoDecimal = parseFloat(twoDecimal) + .01;
					twoDecimal = twoDecimal.toFixed(2);
				}
			}
			alertNote = "Enter a two decimal point number only.  You typed " + thirdNum + " as a third.";		
		}
		for (let i = 0 ; i < twoDecimal.length ; i++) {
			let isLetter = /[A-Za-z]/.test(twoDecimal.charAt(i));
			if (isLetter) {
				let aLetter = twoDecimal.charAt(i);
				twoDecimal = twoDecimal.replace(twoDecimal.charAt(i), "");
				alertNote = "Only numbers please. You typed a " + aLetter + ".";
				i--;
			}
		}
		document.getElementById(theID).value = twoDecimal;
		alert(alertNote);
	}
}

// Checks for only numbers and only three decimal points of Transcation values
const checkAndThreePlace = () => {
	let threeDecimal = document.getElementById("shareNumber").value;
	let check = /^\d+(\.\d{0,3})?$/.test(threeDecimal);
	if (check) {
		document.getElementById("shareNumber").value = threeDecimal;
	} else {
		let alertNote = "";
		if (threeDecimal.length > 4) {
			let fourthNum = 0;
			let point = threeDecimal.charAt(threeDecimal.length - 5);
			if (point === ".") {
				fourthNum = threeDecimal.charAt(threeDecimal.length - 1);
				threeDecimal = threeDecimal.slice(0, -1);
				if (fourthNum > 4) {
					threeDecimal = parseFloat(threeDecimal) + .001;
					threeDecimal = threeDecimal.toFixed(3);
				}
			}
			alertNote = "Enter a three decimal point number only.  You typed " + fourthNum + " as a fourth.";
		}
		for (let i = 0 ; i < threeDecimal.length ; i++) {
			let isLetter = /[A-Za-z]/.test(threeDecimal.charAt(i));
			if (isLetter) {
				let aLetter = threeDecimal.charAt(i);
				threeDecimal = threeDecimal.replace(threeDecimal.charAt(i), "");
				alertNote = "Only numbers please. You typed a " + aLetter + ".";
				i--;
			}
		}
		document.getElementById("shareNumber").value = threeDecimal;
		alert(alertNote);
	}
}

// These check to make sure the inputs are filled in with something before submitting Transaction form
let theTicker = false;
let thePrice = false;
let theCost = false;
let theShares = false;

const goingRed = (tag, which) => {
	document.getElementById(tag).style.color = "red";
	document.getElementById(which).style.borderColor = "red";
}
// These four Event Listeners turn variable true if something is in each inbox
// and if there is something, the lable color is medium blue
document.getElementById("ticker").addEventListener("keyup", function(event) {
	if (document.getElementById("ticker").value !== "") {
 		theTicker = true;
 	}
 	if (theTicker) {
		document.getElementById("tickerLabel").style.color = "mediumblue";
		document.getElementById("ticker").style.borderColor = "mediumblue";
 	}
});

document.getElementById("sharePrice").addEventListener("keyup", function(event) {
	if (document.getElementById("sharePrice").value !== "" && document.getElementById("sharePrice").value > 1) {
 		thePrice = true;
 	}
  	if (thePrice) {
		document.getElementById("priceLabel").style.color = "mediumblue";
		document.getElementById("sharePrice").style.borderColor = "mediumblue";
 	}
});

document.getElementById("transCost").addEventListener("keyup", function(event) {
	if (document.getElementById("transCost").value !== "" && document.getElementById("transCost").value > 1) {
		theCost = true;
	}
 	if (theCost) {
		document.getElementById("transLabel").style.color = "mediumblue";
		document.getElementById("transCost").style.borderColor = "mediumblue";
 	}
});

document.getElementById("shareNumber").addEventListener("keyup", function(event) {
	if (document.getElementById("shareNumber").value !== "") {	
 		theShares = true;
 	}
  	if (theShares) {
		document.getElementById("numberLabel").style.color = "mediumblue";
		document.getElementById("shareNumber").style.borderColor = "mediumblue";
 	}
});
// This Event Listener checks if each box variable is true
// if they are true it submits form.  If not it changes input label and line to red
document.getElementById("addTrans").addEventListener("click", function(event) {
	if (theTicker && thePrice && (theCost || theShares)) {
		document.getElementById("transaction").submit();	
	} else {
		if (!theTicker) {
			goingRed("tickerLabel", "ticker");		
		}
		if (!thePrice) {
			goingRed("priceLabel", "sharePrice");			
		}
		if (!theCost && !theShares) {
			if (!theCost && !theShares) {
				goingRed("transLabel", "transCost");
				goingRed("numberLabel", "shareNumber");									
			} else if (!theCost) {
				goingRed("transLabel", "transCost");
			} else {
				goingRed("numberLabel", "shareNumber");
			}
		}
	}
//	console.log(theTicker + " : " + thePrice + " : " + theCost + " : " + theShares);
});