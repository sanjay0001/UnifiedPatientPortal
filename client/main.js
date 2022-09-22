
// This function runs when hospital sends request for access 
function postHospitalDetails(){
    console.log("Function called");
    var hospitalname=document.getElementById("hosptilanameId").value;
    var hospitalcontact=document.getElementById("contactnumberId").value;
    var emailId=document.getElementById("emailId").value;
    var address=document.getElementById("addressId").value;
    // console.log(hospitalname);
    $.ajax({
        url:"/server/unified_patient_portal_function/hrequest",
        type:"post",
        contentType:"application/Json",
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


function showhospital(){
    console.log("Function called");

    $.ajax({
        url:"/server/unified_patient_portal_function/showhospital",
        type:"get",
        success: function(data){
            var len=data.length;
            var temp=document.getElementById('resultId');
            for(var i=0;i<len;i++){
                var hospital_name=data[i]['request']['hospitalName'];
                var contactnumber=data[i]['request']['contactNumber'];
                var mail=data[i]['request']['mailId'];
                var address=data[i]['request']['address'];
                var stat = data[i]['request']['status'];


                temp.innerHTML+="<div class='resultcontainer'><h4>Hospital_name : "+hospital_name+"</h4><br><h4>Contact Number : "+contactnumber+"</h4><br><h4>mail : "+ mail+"</h4><br><h4>Status : "+stat+"</h4></div><br><hr><br>"
               

            }
        },
        error: function(error){
            alert(error.message);
        }
    });
    
}





















// function postAdminLogin(){
//     var adminid=document.getElementById("adminId").value;
//     var pwd=document.getElementById("pwdId").value;

//     $.ajax({
//         url:"/server/unified_patient_portal_function/adminlogin",
//         type:"post",
//         contentType:"application/Json",
//         data: JSON.stringify({
//             "hospitalName":hospitalname,
//             "contactNumber":hospitalcontact,
//             "mailId":emailId,
//             "address":address
//         }),
//         success: function(data){
//             alert(data.message);
//         },
//         error: function(error){
//             alert(error.message);
//         }
//     });
// }


// // Login hospital/*
// function HospitalLogin(){
//    var hid;
//    var hpass;
//    $.ajax({
//     url:"/server/unified_patientportal_function/hrequest",
//     type:"post",
//     data: JSON.stringify({
//         "hospitalId": hid,
//         "hospitalPassword":hpass
//     }),
//     success: function(data){
//         alert(data.message);
//     },
//     error: function(error){
//         alert(error.message);
//     }
//    });
// }
