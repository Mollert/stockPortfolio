
const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");


const createPromises = (theGroup) => {

	let allPs = [];
	let thePrice = 0;
	let theName = "";
	let company = "";

	theGroup.forEach((tick) => {
		let startP = new Promise((resolve, reject) => {
			fetch("https://finance.yahoo.com/quote/" + tick + "?p=" + tick)			
			.then(response => {
				return response.text();
			})
			.then(reply => {
				const $ = cheerio.load(reply);
				if (tick === "^GSPC") {
					thePrice = $('.quote-header-section').find('span').eq(3).text();
				} else {
//					thePrice = $('.quote-header-section').find('span').eq(1).text();
					thePrice = $('.quote-header-section').find('span').eq(11).text();
				}
				let transfer = $('.quote-header-section').find('h1').text();

//				let dash = (transfer.search("-")) + 2;
				// Find where to start erasing to remove ticker in parentheses
				let dash = (transfer.search(/\(/)) - 1;

				// Remove everything after period in Inc
				theName = transfer.slice(0, dash);
				// Check and remove a comma if in the company name
				for (let i = 0 ; i < theName.length ; i++) {
					if (theName.charAt(i) === ",") {
						theName = theName.replace(", ", " ");
					}
				}
				// Concatenate in order for promise to resolve.  No array or object
				company = theName + "|" + tick + "|" + thePrice;

				resolve(company);
			})
		})
		allPs.push(startP);
	})
	return allPs;
}


module.exports = createPromises;