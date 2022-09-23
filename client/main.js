
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
   

    $.ajax({
        url:"/server/unified_patient_portal_function/showhospital",
        type:"get",
        success: function(data){
            var len=data.length;
            var temp=document.getElementById('resultId');
            for(var i=0;i<len;i++){
                var req_id=data[i]['request']['requestId'];
                var hospital_name=data[i]['request']['hospitalName'];
                var contactnumber=data[i]['request']['contactNumber'];
                var mail=data[i]['request']['mailId'];
                var address=data[i]['request']['address'];
                var stat = data[i]['request']['status'];
                document.getElementById('removeid').innerHTML='';

                temp.innerHTML+="<div id=divid"+req_id+"class='shadow p-3 mb-5 bg-white rounded' ><h4 id=\'reqid"+i+"\'>Request Id :"+req_id+"</h4><br><h4>Hospital_name : "+hospital_name+"</h4><br><h4>Contact Number : "+contactnumber+"</h4><br><h4>mail : "+ mail+"</h4><br><h4>Status : "+stat+"</h4><br><div style='width:100%;text-align: left;'><button onclick=acceptRequest("+req_id+") type='button' style='background-color:green;display: inline-block;' id=\'btnid"+i+"\'>Accept</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onclick='rejectRequest("+req_id+")' type='button' style='background-color:red;display: inline-block;' id=\'btnid"+i+"\'>Reject</button></div><br><hr>"
               

            }
        },
        error: function(error){
            alert(error.message);
        }
    });
    
}

// show hospital details for search button 
function showSearchedhospital(){
    console.log("Function called");
    var hospital_id = document.getElementById("searchid").value;
    console.log(hospital_id);
    $.ajax({
        url:"/server/unified_patient_portal_function/showSearchedhospital?hospitalId="+hospital_id,            
        type:"get",
        success: function(data){
            var len=data.length;
            if(len!=0){
            var temp=document.getElementById('resultId');
            for(var i=0;i<len;i++){
                var hospital_id=data[i]['hospital']['hospitalId'];
                var hospital_name=data[i]['hospital']['hospitalName'];
                var contactnumber=data[i]['hospital']['contactNumber'];
                var mail=data[i]['hospital']['mailId'];
                var address=data[i]['hospital']['address'];
                document.getElementById('removeid').innerHTML='';
                console.log(hospital_name);
                // temp.innerHTML+="<h3>"+hospital_name+"</h3>";
                
                temp.innerHTML+="<div class='shadow p-3 mb-5 bg-white rounded' ><h4>Hospital Id :"+hospital_id+"</h4><br><h4>Hospital_name : "+hospital_name+"</h4><br><h4>Contact Number : "+contactnumber+"</h4><br><h4>mail : "+ mail+"</h4><br><h4>Address : "+address+"</h4><br></div><br><hr>"
               

            }
            }
            // alert("Maja");
        },
        error: function(error){
            alert(error.message);
        }
    });
    
}



// Admin login

function adminLogin(){
    var adminId=document.getElementById("AdminId").value;
    adminId=parseInt(adminId);
    var adminPwrd=document.getElementById("AdminPwrd").value;
    var flag=true;
    console.log(adminId+adminPwrd);

    validateId();

    function validateId(){
        if(adminId==""){
            alert("admin Id should not be empty");
            flag=fasle;
        }
        else if(/^[0-9]+$/.test(adminId)==false){
            alert("Enter proper ID");
            flag=false;
        }
    }

    if(flag==true){
        $.ajax({
            url:"/server/unified_patient_portal_function/Alogin",
            type:"post",
            contentType:"application/Json",
            data:JSON.stringify({"admin_Id":adminId,"admin_pwrd":adminPwrd}),
            success:function(data){
                console.log(data.Auth);
                if(data.Auth=="Accept"){
                    window.location.href = 'adash.html';
                }
                else{
                    alert("Entry Restricted");
                 }
                console.log(data);
    
            },
            error:function(){
                alert("Error");
            }
        })
    

    }
}








//HospitalLogin
function hospitalLogin(){
    var hospitalId=document.getElementById("HospitalId").value;
    var password=document.getElementById("Password").value;
    var flag=true;
    console.log(hospitalId+password);

    validateHospitalId();

    function validateHospitalId(){
        if(hospitalId==""){
            alert("Hospital ID can't be empty");
            flag=false;
        }
        else if(/^[0-9]+$/.test(hospitalId)==false){
            alert("Enter Proper Hospital ID");
            flag=false;
        }
    }
    if(flag==true){
        $.ajax({
            url:"/server/unified_patient_portal_function/Hlogin",
            type:"post",
            contentType:"application/Json",
            data:JSON.stringify({"hospital_id":hospitalId,"pass_word":password}),
            success:function(data){
                console.log("TESTDATA"+data);
                if(data.Auth=="Accept"){
                    window.location.href = 'hdash.html';
                }
                else{
                    alert("Entry Restricted");   
                }
            },
            error:function(){
                alert("Error");
            }
        })
    
    
    

    }

    

}




// Admin accept hospital request

function acceptRequest(req_id){
    console.log(req_id);
    $.ajax({
        url:"/server/unified_patient_portal_function/acceptrequest",
        type:"post",
        contentType:"application/Json",
        data: JSON.stringify({
            "requestId":req_id,
        }),
        success: function(data){
            alert("Accepted");
        },
        error: function(error){
            alert(error.message);
        }
    });

}

// Admin reject hospital request
function rejectRequest(req_id){
    console.log("Inside reject function");
    console.log(req_id);
    $.ajax({
        url:"/server/unified_patient_portal_function/rejectrequest",
        type:"post",
        contentType:"application/Json",
        data: JSON.stringify({
            "requestId":req_id,
        }),
        success: function(data){
            var di=document.getElementById("divid"+req_id);
            // di.parentNode.removeChild(di);
            console.log(di);
            alert("Rejected");
            location.reload();
            
           

        },
        error: function(error){
            alert(error.message);
        }
    });

}



// add patient
function addpatient(){
    console.log("Function called")
    var pat_name=document.getElementById("pname").value;
    var pat_age=document.getElementById("page").value;
    var pat_bg=document.getElementById("bg").value;
    var pat_gen=document.getElementById("pgen").value;
    var pat_add=document.getElementById("padd").value;
    // console.log(pat_adate); 2022-09-22
    // database datetime format :  '2022-09-22 21:06:01:066'
    $.ajax({
        url:"/server/unified_patient_portal_function/prequest",
        type:"post",
        contentType:"application/Json",
        data: JSON.stringify({
            "patientName":pat_name,
            "age":pat_age,
            "bloodGrp":pat_bg,
            "gender":pat_gen,
            "address":pat_add
        }),
        success: function(data){
            alert(data.message);
        },
        error: function(error){
            alert(error.message);
        }
    });
}