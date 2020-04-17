
const express = require("express");
const request = require("request");
const router = express.Router();


router.get("/", (req, res) => {

//	console.log(req.body);

//	let error = "This error does not  have anything to  do with the function of this website.  It is purly a testing instument in order to check out the CSS the is need for the page.  Don't read anything into this for that reason.";

 	res.render("error", { error });
 });


module.exports = router;