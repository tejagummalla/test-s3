var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var pdfFillForm = require('pdf-fill-form');
var fs = require('fs');
var util = require("util");
var spawn = require("child_process").spawn;

var fillSingleBeneficiary = require('./formFillModules/changeBeneficiarySingle.js')
var fillTrustBeneficiary = require('./formFillModules/changeBeneficiaryTrust.js')
var fillMultipleBeneficiary = require('./formFillModules/changeBeneficiaryMultiple.js')
var fillPolicyLoan = require('./formFillModules/policyLoanRequest.js')

var app = express();

// var pdfFillForm = require('pdf-fill-form');
// var fs = require('fs');
// var res;
// pdfFillForm.read('test2.pdf')
// .then(function(result){
//   var res = result;
//   console.log(result)
//   //for(i in re)
// },function(err){
//   console.log(err);
// })


app.post('/',jsonParser, function (req, res) {
   // First read existing users.
   var body = req.body;
   console.log(body.result.parameters)
   //body = extractData(body)
   formFill(body.result)
   res.status(200).json({
        speech: "Thank You for providing your detail",
        displayText: "Thank you for providing your details.",
        source: 'Insurance-Agent'
    });
})

var server = app.listen(8081, function () {

  console.log("Example app listening at")

})

function formFill(data){
  if (data.action == "ChangeBeneficiaryTrust"){
    fillTrustBeneficiary(data.parameters)
  }
  else if (data.action == "ChangeBeneficiarySingle") {
    fillSingleBeneficiary(data.parameters)
  }
  else if (data.action == "ChangeBeneficiaryMultiple") {
    console.log("Here")
    fillMultipleBeneficiary(data.parameters)
  }
  else if (data.action == "input.welcome") {
    fillPolicyLoan(data.parameters)
  }
}
