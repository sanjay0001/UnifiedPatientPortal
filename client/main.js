const { application } = require("express");
// This function runs when hospital sends request for access 
function postHospitalDetails(){
    
    var hospitalname=document.getElementById("hospitalnameId").value;
    var hospitalcontact=document.getElementById("contactnumberId").value;
    var emailId = document.getElementById("emailId").value;
    var address = document.getElementById("addressId").value;
    console.log(hospitalname);

    $.ajax({
        url:"/server/unified_patientportal_function/hrequest",
        type:"post",
        contentType:"application/json",
        data: JSON.stringify({
            "hospitalName":hospitalname,
            "contactNumber":hospitalcontact,
            "mailId":emailId,
            "address":address
        }),
        success: function(data){
            alert(data.message);
        },
        error: function(error){
            alert(error.message);
        }
    });
}

// Login hospital
function HospitalLogin(){
   var hid;
   var hpass;
   $.ajax({
    url:"/server/unified_patientportal_function/hrequest",
    type:"post",
    data: JSON.stringify({
        "hospitalId": hid,
        "hospitalPassword":hpass
    }),
    success: function(data){
        alert(data.message);
    },
    error: function(error){
        alert(error.message);
    }
   });
}
