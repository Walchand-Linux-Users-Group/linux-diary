var referral = "";
                        document.getElementById("button_text").onclick = function(e) {

                          var name = document.getElementById('firstName').value;
                          referral = document.getElementById('referral').value;
                          var email = document.getElementById('email').value;
                          var college = document.getElementById('collegeName').value;
                          var transaction = document.getElementById('transactionId').value;

                          if(name == undefined || name == "") {
                            alert("Please Enter Your Name !!!");
                            return;
                          }

                          if(email == undefined || email == "") {
                            alert("Please Enter Your Email !!!");
                            return;
                          }

                          var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                          if(!filter.test(email))
                          {
                            alert("You have entered an invalid email address !!!")
                            return;
                          }

                          if(college == undefined || college == "") {
                            alert("Please Enter Your College Name !!!");
                            return;
                          }

                          if(transaction == undefined || transaction == "") {
                            alert("Please Enter Your Transaction ID !!!");
                            return;
                          }

                          var url2 = "http://localhost:3000/api/payment/findUser"
        var params2 = {
            email: email
        };
        var xmlHttp2 = new XMLHttpRequest();
        var flag = true;
        xmlHttp2.onreadystatechange = function(res) {
            if (xmlHttp2.readyState === 4) {
                res = JSON.parse(xmlHttp2.responseText);
                if(res.status === "failed") {
                  alert("Email Already Registered !!!");
                  flag = false;
                  return;
                }
            }
        }
        xmlHttp2.open("POST", url2, true);
        xmlHttp2.setRequestHeader("Content-type", "application/json");
        xmlHttp2.send(JSON.stringify(params2));

        var url3 = "http://localhost:3000/api/payment/findUser2"
        var params3 = {
            transaction: transaction
        };
        var xmlHttp3 = new XMLHttpRequest();
        var flag = true;
        xmlHttp3.onreadystatechange = function(res) {
            if (xmlHttp2.readyState === 4) {

              if(flag === false) return;

                res = JSON.parse(xmlHttp3.responseText);
                if(res.status === "failed") {
                  alert("Transaction ID Already Registered !!!");
                  flag = false;
                  return;
                }
                register(e);
            }
        }
        xmlHttp3.open("POST", url3, true);
        xmlHttp3.setRequestHeader("Content-type", "application/json");
        xmlHttp3.send(JSON.stringify(params3));

    }


    var count = 0;
    function incrementReferral(e) {

      if(referral != undefined && referral != "") {
          var url2 = "http://localhost:3000/api/payment/incrementReferral"
        var params2 = {
            referralCode: referral
        };
        var xmlHttp2 = new XMLHttpRequest();
        var flag = true;
        xmlHttp2.onreadystatechange = function(res) {
            if (xmlHttp2.readyState === 4) {
                res = JSON.parse(xmlHttp2.responseText);
            }
        }
        xmlHttp2.open("POST", url2, true);
        xmlHttp2.setRequestHeader("Content-type", "application/json");
        xmlHttp2.send(JSON.stringify(params2));
                          }
    }

    function register(e) {

      if(count >= 1) return;
      count++;

        const name = document.getElementById("firstName").value;

        const email = document.getElementById("email").value;

        const college = document.getElementById("collegeName").value;

        const transaction = document.getElementById("transactionId").value;

        var url = 'http://localhost:3000/api/payment/register';

        var params = {
            name: name,
            email: email,
            college: college,
            transaction: transaction
        }

        try {
            var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function(res) {
            if (xmlHttp.readyState === 4) {
                res = JSON.parse(xmlHttp.responseText);
                if(res.error === "true" || res.emailSent === "false") {
                  if(res.error === "true") alert("User Registration Failed !!!");
                  else alert("Invalid Email ID !!!");
                  return;
                }
                  incrementReferral(e);
                  alert("Registration Successful !!! Kindly Check Your Mail For Payment Confirmation !!!");
                  var obj = document.getElementById('successBox');
                  var newContent = "<div style='display: flex; justify-content: center;'><p style='color: white;'>Registration Successfull !!!</p></div></br></br></br></br><p style='color: white;'> Your Referral Code : <strong>" + res.referralCode + "</strong></p>" + "<br/></br></br><p style='color: white;'>Confirmation Mail has been sent to you, Thanks For Registration !!!</p></br></br><p style='color: white;'>In case if you have any queries or doubts, feel free to contact us.</p></br></br></br></br><p style='color: white;'>Regards,</br>Walchand Linux User's Group</p>";
                  obj.innerHTML = newContent;
            }
        }
        xmlHttp.open("POST", url, true); // false for synchronous request
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.send(JSON.stringify(params));
        } catch(e) {
            alert(e.message);
            console.log(e.message);
        }


    }