'use strict';
var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
app.use(express.json());
const tableName = 'request'; // The table created in the Data Store
const columnName1 = 'hospitalName'; // The column created in the table
const columnName2 = 'contactNumber';
const columnName3 = 'mailId';
const columnName4 = 'address'; // The column created in the table

// The POST API that reports the alien encounter for a particular city
app.post('/hrequest', (req, res) => {
  console.log("From index js");
  var requestId=Math.floor((Math.random() * 1000000) + 1);
  console.log("Routed successfully");
  var hospitalJson = req.body;
 // Initializing Catalyst SDK
 var catalystApp = catalyst.initialize(req);
   var rowData={};
   rowData['requestId']=requestId;
   rowData[columnName1]=hospitalJson.hospitalName;
   rowData[columnName2]=hospitalJson.contactNumber;
   rowData[columnName3]=hospitalJson.mailId;
   rowData[columnName4]=hospitalJson.address;
   var rowArr=[];
   rowArr.push(rowData);
   // Inserts the city name as a row in the Catalyst Data Store table
   catalystApp.datastore().table(tableName).insertRows(rowArr).then(requestInsertResp => {
    res.send({
     "message": "Request sent successfully!"
    });
   }).catch(err => {
    console.log(err);
    sendErrorResponse(res);
   });
})




// app.get('/showhospital',(req,res)=>{
//   console.log("In the function")

// })

app.get('/showhospital', (req, res) => {
  // console.log("In the function showhospital");
 
  // Initializing Catalyst SDK
  var catalystApp = catalyst.initialize(req);
 
  // Queries the Catalyst Data Store table and checks whether a row is present for the given city
  getHospitalRequestDataFromCatalystDataStore(catalystApp).then(requestDetails => {
    res.send(requestDetails);
   
    
  }).catch(err => {
   console.log(err);
   sendErrorResponse(res);
  })
 });


 function getHospitalRequestDataFromCatalystDataStore(catalystApp) {
  return new Promise((resolve, reject) => {
   // Queries the Catalyst Data Store table
   catalystApp.zcql().executeZCQLQuery("Select * from request").then(queryResponse => {
    resolve(queryResponse);
   }).catch(err => {
    reject(err);
   })
  });
 
 }



// Admin login
 const adminTable = 'admin'; // The table created in the Data Store
 const adminName = 'AdminId'; // The column created in the table
 const adminPassword= 'AdminPwrd'
 
 app.post('/Alogin',(req,res)=>{
   var catalystApp = catalyst.initialize(req);
   var details=req.body;
   console.log(details);
 
   checkAdmin(catalystApp,details.admin_Id,details.admin_pwrd).then(adminDetails => {
     if(adminDetails!=0){
       console.log("ADMIN RIGHT");
       res.send({"Auth":"Accept"});
     }
     else{
       console.log("ADMIN WRONG");
       res.send({"Auth":"Decline"});
     }
   }).catch(err =>{
     console.log(err);
     sendErrorResponse(res);
   })
 })
 /**
 * @param {*} catalystApp 
  * @param {*} adminId 
  * @param {*} adminPwrd
  */
 
function checkAdmin(catalystApp,adminId,adminPwrd){
   
   var a=catalystApp.zcql().executeZCQLQuery("Select * from "+adminTable+" where "+adminName+"='" + adminId + "'"+"AND "+ adminPassword+"='"+ adminPwrd+"'");
   return a;
 }




//HospitalLogin
const hospitalTable='hospital'; // The table created in the Data Store
const hospitalId='hospitalId';// The column created in the table
const password='hospitalPassword';

app.post('/Hlogin',(req,res)=>{
  var catalystApp = catalyst.initialize(req);
  var details=req.body;
  console.log(details);

  checkHospital(catalystApp,details.hospital_id,details.pass_word).then(hospitalDetails =>{
    if(hospitalDetails != 0){
      console.log("HOSPITAL RIGHT");
      res.send({"Auth":"Accept"});
    }
    else{
      console.log("HOSPITAL WRONG");
      res.send({"Auth":"Decline"});

    }
  }).catch(err =>{
    console.log(err);
    sendErrorResponse(res);
  })
  

})


/**
* @param {*} catalystApp 
 * @param {*} hospital_id
 * @param {*} pass_word
 */


function checkHospital(catalystApp,hospital_id,pass_word){
  var a=catalystApp.zcql().executeZCQLQuery("Select * from "+hospitalTable+" where "+hospitalId+"='" + hospital_id + "'"+"AND "+ password+"='"+ pass_word+"'");
	return a;


}
















// The GET API that checks the table for an alien encounter in that city 




// app.get('/alien', (req, res) => {
//  var city = req.query.city_name;

//  // Initializing Catalyst SDK
//  var catalystApp = catalyst.initialize(req);

//  // Queries the Catalyst Data Store table and checks whether a row is present for the given city
//  getDataFromCatalystDataStore(catalystApp, city).then(cityDetails => {
//   if (cityDetails.length == 0) {
//    res.send({
//     "message": "Hurray! No alien encounters in this city yet!",
//     "signal": "negative"
//    });
//   } else {
//    res.send({
//     "message": "Uh oh! Looks like there are aliens in this city!",
//     "signal": "positive"
//    });
//   }
//  }).catch(err => {
//   console.log(err);
//   sendErrorResponse(res);
//  })
// });
// /**
//  * Checks whether an alien encounter is already reported for the given city by querying the Data Store table
//  * @param {*} catalystApp 
//  * @param {*} 
//  */
// function getDataFromCatalystDataStore(catalystApp, cityName) {
//  return new Promise((resolve, reject) => {
//   // Queries the Catalyst Data Store table
//   catalystApp.zcql().executeZCQLQuery("Select * from "+tableName+" where "+columnName+"='" + cityName + "'").then(queryResponse => {
//    resolve(queryResponse);
//   }).catch(err => {
//    reject(err);
//   })
//  });

// }

/**
 * Sends an error response
 * @param {*} res 
 */
function sendErrorResponse(res) {
 res.status(500);
 res.send({
  "error": "Internal server error occurred. Please try again in some time."
 });
}
module.exports = app;