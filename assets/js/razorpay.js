document.getElementById("button_text").onclick = function (e) {
    alert("Registration is temporarily closed !!! Please Try Again Later.");
}

function rzpClick(e) {
    var options = {
        "key": "rzp_live_7Qavb1VhFIUu1u",
        "currency": "INR",
        "name": "LinuxDiary 3.0",
        "description": "WLUG Linux Diary 3.0 Registration",
        "order_id": document.getElementById("rzp-text").value,
        "handler": function (response) {
            document.getElementById('order-pay-id').value = response.razorpay_payment_id;
            document.getElementById('order-id').value = response.razorpay_order_id;
            document.getElementById('order-sig').value = response.razorpay_signature;
            verifyClick();
        },
        "theme": {
            "color": "#0EB9F2"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
}

function register(e) {

    const name = document.getElementById("firstName").value;

    const username = document.getElementById("userName").value;

    const referralCode = document.getElementById("referralCode").value;

    const email = document.getElementById("email").value;

    const college = document.getElementById("collegeName").value;

    var url = 'https://api.linux-diary.wcewlug.org/api/payment/register';

    var params = {
        name: name,
        username: username,
        referralCode: referralCode,
        email: email,
        college: college
    }

    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function (res) {
            if (xmlHttp.readyState === 4) {
                alert("Registration Successful !!! Kindly Check Your Mail For Payment Confirmation !!!");
            }
        }
        xmlHttp.open("POST", url, true); // false for synchronous request
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.send(JSON.stringify(params));
    } catch (e) {
        alert(e.message);
        console.log(e.message);
    }


}

function verifyClick(e) {
    var url = 'https://api.linux-diary.wcewlug.org/api/payment/verify';
    var params = {
        razorpay_order_id: document.getElementById('order-id').value,
        razorpay_payment_id: document.getElementById('order-pay-id').value,
        razorpay_signature: document.getElementById('order-sig').value
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function (res) {
        if (xmlHttp.readyState === 4) {
            register(e);
        }
    }
    xmlHttp.open("POST", url, true); // false for synchronous request
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(JSON.stringify(params));
}
