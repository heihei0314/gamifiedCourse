var targetID='';
var transferAmount=0;



function transfer(){
    
    targetID = document.getElementById("target").value;
    transferAmount = parseInt(document.getElementById("transferAmount").value);
    let text = "You are going to tranfer "+ transferAmount+" mCoins to "+targetID;
    if (confirm(text) == true) {
        checkTransferBalance();
    } else {
        alert("Transfer Cancelled");
    }
}

function checkTransferBalance(){
    if(transferAmount<=info.mCoins){      
        postTransfer()
    }
    else{
        alert("You don't have enough Balance");
    }
}

function postTransfer(){
    openLoadingWindow("F");

    var data = {
        'action':'postTransfer',
        'cohort': currentCohort,
        'sender':uid,
        'reciever':targetID,
        'transferAmount':transferAmount
    }
    console.log(data);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: data,
        dataType: "JSON",
        success: function (response) {
            if (response=="Transfer Successful"){
                document.getElementById("imgResponseF").src = "view/success.png";
                document.getElementById("purchaseResponseF").innerHTML = "<h3>"+response+"</h3>";
                document.getElementById("closeButtonF").innerHTML = "Done";  
            }
            else if (response=="User not found"){
                document.getElementById("imgResponseF").src = "view/fail.png";
                document.getElementById("purchaseResponseF").innerHTML = "<h3>"+response+"</h3>Please ensure that the ITSC account has been entered correctly.";
                document.getElementById("closeButtonF").innerHTML = "Try Again";  
            }
            else{
                document.getElementById("imgResponseF").src = "view/fail.png";
                document.getElementById("purchaseResponseF").innerHTML = "<h3>Unknown failed</h3>Please try again or contact our Staff";
                document.getElementById("closeButtonF").innerHTML = "Try Again";  
            }
            document.getElementById("purchaseCloseF").style.display = "block";  
            //closeLoadingWindow();
            getInfo();
        },
        error: function (response) {
            alert('System Failed, Please try again or contact our Staff');
            document.getElementById("imgResponseF").src = "view/fail.png";
            document.getElementById("purchaseResponseF").innerHTML = response;  
            document.getElementById("closeButtonF").innerHTML = "Try Again";  
            document.getElementById("purchaseCloseF").style.display = "block";  
            getInfo();
        },
      });    
}