
// Check and remove anything other than letters and then upper case them for Watch List Ticker
const checkAndUpperCase = () => {
	let letter = document.getElementById("watchTicker").value;
	let check = /^[a-zA-Z]+$/.test(letter);
	if (check) {
		letter = letter.toUpperCase();
		document.getElementById("watchTicker").value = letter;
	} else {
		let wrongType = "";
		for (let i = 0 ; i < letter.length ; i++) {
			noLetter = /[a-zA-Z]/.test(letter.charAt(i));
			if (!noLetter) {
				let newLetter = letter.replace(letter.charAt(i), "");
				wrongType = letter.charAt(i);
				document.getElementById("watchTicker").value = newLetter;
			}
		}
		alert("Only letters please. You typed a " + wrongType + ".");
	}
}
