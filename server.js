const expressApp = express();
var catalyst = require('zcatalyst-sdk-node');
const express = require('express');
expressApp.get('/',(req,res)=>{
	var app = catalyst.initialize(req);
    
