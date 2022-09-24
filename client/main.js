
// This function runs when hospital sends request for access 
function postHospitalDetails(){
    console.log("Function called");
    var hospitalname=document.getElementById("hosptilanameId").value;
    var hospitalcontact=document.getElementById("contactnumberId").value;
    var emailId=document.getElementById("emailId").value;
    var address=document.getElementById("addressId").value;
    var flag=true;
    // console.log(hospitalname);

    validateEverything();
    function validateEverything(){
        if(hospitalname=="" || hospitalcontact =="" || emailId==""|| address=="" ){
            alert("Empty Fields");
            flag=false;
        }
       
        else if(/^[0-9]+$/.test(hospitalcontact)==false||hospitalcontact.length!=10){
            flag=false;
            alert("Enter Proper Phone Number")
        }
        else if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailId)==false){
            flag=false;
            alert("Enter Proper Email Address");
        }   

    }
   if(flag==true){
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
            // document.getElementById("hosptilanameId").value='';
            // document.getElementById("contactnumberId").value='';
            // document.getElementById("emailId").value="";
            // document.getElementById("addressId").value="";
            alert(data.message);
            location.reload();
        },
        error: function(error){
            alert(error.message);
        }
    })
    

   }
    ;
}

//Admin ShowPending Hospitals

function showhospital(){
   

    $.ajax({
        url:"/server/unified_patient_portal_function/showhospital",
        type:"get",
        success: function(data){
            var len=data.length;
            var temp=document.getElementById('resultId');
            temp.innerHTML="";

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
    var flag=true;

    validateEverything();
    function validateEverything(){
        if(hospital_id==''){
            alert("Hospital Id can't be empty");
            flag=false;
        }
        else if(/^[0-9]+$/.test(hospital_id)==false){
            alert("Enter Proper Hospital ID");
            flag=false;
        }
    }
    if(flag==true){
        $.ajax({
            url:"/server/unified_patient_portal_function/showSearchedhospital?hospitalId="+hospital_id,            
            type:"get",
            success: function(data){
                var len=data.length;
                if(len!=0){
                var temp=document.getElementById('resultId');
                temp.innerHTML=''
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
                else{
                    alert("No such Hospital found");
                }
                // alert("Maja");
            },
            error: function(error){
                alert(error.message);
            }
        });
        
    }
    
    
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
        if(adminId==""|| adminPwrd==""){
            alert("Please fill in the fields");
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
        if(hospitalId==""|| password==""){
            alert("Please fill in the fields");
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
                    alert("Incorrect Id or Password");   
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
            location.reload();
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
    var flag=true;
   

    validateEverything();
    // console.log(pat_adate); 2022-09-22
    // database datetime format :  '2022-09-22 21:06:01:066'

    function validateEverything(){
            if(pat_name=''|| pat_age==''||pat_bg==""||pat_gen==""||pat_add==""){
                alert("Please Fill in the fields"); 
                flag=false;
            }
           else if(/^[a-zA-Z]+$/.test(pat_name)==false){
                alert("Enter Proper Name");
                flag=false;
                

           }
           else if(/^[0-9]+$/.test(pat_age)==false||pat_age<0||pat_age>150){
                alert("Enter Proper Age");
                flag=false;
            }
            
    }


    if(flag==true){
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
                location.reload();
            },
            error: function(error){
                alert(error.message);
            }
        });

    }

    
}


//Search a patient


function searchPatient(){
    var patientId =document.getElementById("PatientId").value;
    flag=true
    console.log(patientId)
    validatePatientId();

    function validatePatientId(){
        if(patientId==""){
            
            flag=false;
            document.getElementById('results').innerHTML='';
            document.getElementById('extra').innerHTML='<table id="taresults" ></table>';
            alert("Patient ID can't be empty");
            

        }
        else if(/^[0-9]+$/.test(patientId)==false){
            
            document.getElementById('results').innerHTML='';
            document.getElementById('extra').innerHTML='<table id="taresults" ></table>';
            flag=false;
            alert("Patient ID should contain characters from 0-9 only");
        }

    }
    if(flag==true){
        console.log()
        $.ajax({
            url:"/server/unified_patient_portal_function/Psearch",
            type:"post",
            contentType:"application/Json",
            data:JSON.stringify({"patient_id":patientId}),
            success:function(data){
                console.log("AUTHTEST"+data['Auth']);

               

                

                //console.log("PATIENTDETAILSTEST"+pData[0]['patient']['address']);
                console.log("APPOINMENTDETAILSTEST"+data['Appointment_Details']);
                //patientName
                //age
                //	bloodGrp
                //gender
                //address
                //diagnosis
                if(data.Auth=="Accept"){
                    // console.log("TESTSETSETEWT")
                    // var pData=JSON.stringify(data['Patient_Detials']);
                    // pData=JSON.parse(pData);
                    // console.log("PATIENTDETAILSTEST"+pData[0]['patient']['address']);
                    var pData=JSON.stringify(data['Patient_Details']);
                    pData=JSON.parse(pData);

                    var Name=pData[0]['patient']['patientName'];
                    var age=pData[0]['patient']['age'];
                    var bloodGrp=pData[0]['patient']['bloodGrp'];
                    var gender=pData[0]['patient']['gender'];
                    var address=pData[0]['patient']['address'];
                    console.log("Appoinment STAtus"+typeof(data.Astatus));
                    console.log("APPOINMENT VALUE TEST  "+data.Astatus)
                    
                    
                    document.getElementById('results').innerHTML="<h4>Patient Name: "+Name+"</h4><h4>Patient Age: "+age+"</h4><h4>Patient BloodGroup: "+bloodGrp+"<h4>Patient Gender: "+gender+"</h4><h4>Patient Address: "+address+"</h4><br>"
                    if(data.Astatus=="Accept"){
                        //recordId --start from 1
                        //patientId
                        //diagnosis
                        //prescription
                        //appointmentTime
                        
                        console.log("IFENTER")  
                        var aData=JSON.stringify(data['Appointment_Details']);
                        aData=JSON.parse(aData);

                        console.log("DATA LENGTH LOG"+aData.length);
                        document.getElementById('results').innerHTML+='<h5>Appoinment Details:</h5><br>'
                        document.getElementById('taresults').innerHTML+="<tr><th>SNO:</th><th>Diagonis</th><th>Prescription</th><th>AppoinmentDate</th><th>Hospital Name</th><th>Doctor Name</th></tr>";

                        for(var i=0;i<aData.length;i++){
                            var recordId=i+1;
                            var Diagonsis=aData[i]['healthrecord']['diagnosis'];
                            var Pres=aData[i]['healthrecord']['prescription'];
                            var datetime = aData[i]['healthrecord']['appointmentTime']
                            var Hname = aData[i]['healthrecord']['hospitalName'];
                            var Dname = aData[i]['healthrecord']['doctorname'];

                           // document.getElementById('aresults').innerHTML+="<h4>S.No. :"+recordId+"</h4><br><h4>Diagonis :"+Diagonsis+"</h4><br><h4>Prescription :"+Pres+"</h4><br><h4>Appoinment Time :"+datetime+"</h4><br><h4>Hospital Name :"
                            document.getElementById("taresults").innerHTML+="<tr><td>"+recordId+"</td><td>"+Diagonsis+"</td><td>"+Pres+"</td><td>"+datetime+"</td><td>"+Hname+"</td><td>"+Dname+"</td></tr>";
                            
                        document.getElementById('extra').innerHTML+="<br><br>"
                    
                    }
                }
                else{
                        document.getElementById('taresults').innerHTML=''
                        document.getElementById('extra').innerHTML='<table id="taresults" ></table>'
                        alert("No Appoinments found for this Patient");
                    }
                }
                else{
                    alert("Patient not found,this ID doesn't Exist!");
                    document.getElementById('results').innerHTML='';
                    document.getElementById('extra').innerHTML='<table id="taresults" ></table>';


                }
                }
                ,
            error:function(){
                alert("Error");
            }

        })
        }
    }




function addAppoiment(){
    var aPID = document.getElementById('Apid').value;
    var Dname= document.getElementById("Dname").value;
    var aHID=document.getElementById("HID").value;
    var Diag =document.getElementById('Diagonis').value;
    var pres =document.getElementById('Prescription').value;
    var aDateTime= document.getElementById("Atime").value;
    console.log("TEST DATE FORMAT"+aDateTime);
    var partb=aDateTime.substr(11);
    var parta=aDateTime.substr(0,10);
    partb+=":00"
    aDateTime=parta+" "+partb;



    var flag=true;

    validateEverything();

    function validateEverything(){
        if(aPID==""||Dname==""||aHID==""||Diag==""||aDateTime==""||pres==""){
            alert("Empty Fields");
            flag=false;
        }
        else if(/^[0-9]+$/.test(aPID)==false){
            alert("Invalid Pid");
            flag=false;
        }
        else if(/^[a-zA-Z]+$/.test(Dname)==false){
            alert("Invalid Doctor Name");
            flag=false;
        }
        else if(/^[0-9]+$/.test(aHID)==false){
            alert("Invalid HID");
            flag=false;
        }
        
    }
    if(flag==true){
        $.ajax({
            url:"/server/unified_patient_portal_function/APrescrip",
            type:"post",
            contentType:"application/Json",
            data: JSON.stringify({"PID":aPID,"Dname":Dname,"HID":aHID,"Diago":Diag,"Pres":pres,"Atime":aDateTime}),
            success: function(data){
                if(data.PAuth=="Valid"){
                        if(data.HAuth=="Valid"){
                            //console.log("YES");
                            alert("Successfully Added");
                            location.reload();

                        }
                        else{
                            alert("Hospital Not Found Consider Adding");
                        }
                }   
                else{
                    alert("Patient Not Found Add Patient");
                }
                
            }

        

    }
        )
    
   
}



}