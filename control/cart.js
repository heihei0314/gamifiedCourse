var groupSum=0;
var personalSum=0;
var cardsArray;
var subcat = "";
var tempChartID = [];
function updateCart(cardID){
    var xmlhttp = new XMLHttpRequest();                    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cardsArray = JSON.parse(this.responseText); 
            //console.log(cardsArray); 
        }
    };
    xmlhttp.open("GET", "data/card.json", false);
    xmlhttp.send();
    //console.log(cardsArray);

    if (document.getElementById("subcat")!=null){
        subcat = document.getElementById("subcat").value;
    }
    for(i=0;i<cardsArray.cards.length;i++){
        if (cardsArray.cards[i].id==cardID){
            var item = {
                id:cardID,
                name:cardsArray.cards[i].name,
                price:cardsArray.cards[i].price,
                type:cardsArray.cards[i].type,
                subcat:subcat
            }
			//console.log(cartItem.id)
			if(!tempChartID.includes(cardID)){
				tempChartID.push(cardID)
				cartItem.push(item);
				alert("Item was added, please go to cart to complete the purchase.");
				showCart();
			}
			else{
				alert("This item was added before");
			}
			subcat="";
        }
    }
}

function showCart(){
    //console.log(cartItem);
    var cartText = "";
        cartText+="<table> ";
        cartText+="<tr>";
        cartText+="<td>Item Name</td>";
        cartText+="<td>Price</td>";
        cartText+="<td>Check to Comfirm</td>";
        cartText+="</tr>";
        
        for (r=0;r<cartItem.length;r++){
            cartText+="<tr>";
            cartText+="<td>"+cartItem[r].name+" "+cartItem[r].subcat+"</td>";
            cartText+="<td>"+cartItem[r].price+"</td>";
            cartText+="<td><input type='checkbox' id='checkbox"+r+"' value='"+r+"' onclick=checkCheckbox('"+cartItem[r].id+"','checkbox"+r+"')></td>";
            cartText+="</tr>";                
        }
        cartText+="</table>"; 
        document.getElementById("cartTable").innerHTML = cartText;
    }
function checkCheckbox(itemID, checkBoxId){
    //console.log(cartItem);
    var checkBox = document.getElementById(checkBoxId);
    var tempGroup = 0;
    var tempPersonal = 0;
    for (r=0;r<cartItem.length;r++){
        if (cartItem[r].id==itemID&&cartItem[r].type=="group"){
            tempGroup=cartItem[r].price;
        }
        else if (cartItem[r].id==itemID&&cartItem[r].type=="personal"){
            tempPersonal=cartItem[r].price;
        }
    }
    if (checkBox.checked == true){
        groupSum+=tempGroup;
        personalSum+=tempPersonal;
    } else {
        groupSum-=tempGroup;
        personalSum-=tempPersonal;
    }
    showTotalPrice();
}
    
function showTotalPrice(){
    var totalPriceText = "";
    totalPriceText+="<table>"; 
    totalPriceText+="<tr>";
    totalPriceText+="<td><strong>Group Item Total Price</strong></td>";
    totalPriceText+="<td><strong>"+groupSum+"</strong></td>";
    totalPriceText+="</tr>";
    totalPriceText+="<tr>";
    totalPriceText+="<td><strong>Personal Item Total Price</strong></td>";
    totalPriceText+="<td><strong>"+personalSum+"</strong></td>";
    totalPriceText+="</tr>";
    totalPriceText+="</table>"; 
    totalPriceText+="<p><button id='clearButton' class='shopButton' style='background-color:black;margin-right:2em;' onclick=clearCart()>Clear</button><button class='shopButton' id='purchaseButton' style='background-color:#897CB0' onclick='checkBalance("+groupSum+", "+personalSum+")'>Purchase</button></p>"
    
    document.getElementById("priceTable").innerHTML = totalPriceText;    
}

function clearCart() {
    while (cartItem.length > 0) {
        cartItem.pop();
    }
    groupSum=0;
    personalSum=0;
    subcat = "";
	tempChartID = [];
    showCart();
    showTotalPrice();
}


function checkBalance(groupSum, personalSum){
    
    var groupTransactionAmount=0;
    var transactionAmount=0;
    var tempBalance=0;
    if (groupSum<=info.groupmCoins){
        groupTransactionAmount = groupSum;
        tempBalance = info.mCoins;
        if (personalSum<=tempBalance){
            transactionAmount+=personalSum;
            //console.log(groupTransactionAmount);
            //console.log(transactionAmount);
            purchase(groupTransactionAmount, transactionAmount);
        }
        else{
            alert("You don't have enough Balance");
        }
    }
    else if((groupSum-info.groupmCoins)<=info.mCoins){
        groupTransactionAmount = info.groupmCoins;
        transactionAmount = groupSum-info.groupmCoins;
        tempBalance = info.mCoins-transactionAmount;
        
        if (personalSum<=tempBalance){
            transactionAmount+=personalSum;
            //console.log(groupTransactionAmount);
           // console.log(transactionAmount);
            purchase(groupTransactionAmount, transactionAmount);
        }
        else{
            alert("You don't have enough Balance");
        }
    }
    else{
        alert("You don't have enough Balance");
    }
    
    
}

function purchase(groupTransactionAmount, transactionAmount){
    closeCardWindow();
    openLoadingWindow("P");
    var purchaseItem=[];
    for (r=0;r<cartItem.length;r++){
        var checkBox = document.getElementById("checkbox"+r);
        if (checkBox.checked == true){
            purchaseItem.push(cartItem[r]);
        }
    }
    var purchaseList = {"purchaseList":purchaseItem};
    var dataText = JSON.stringify(purchaseList);
    var data = {
        'action':'setPurchase',
        'cohort': currentCohort,
        'classSession':info.classSession,
        'MTGroup':info.MTGroup,
        'dataText':dataText,
        'uid':uid,
        'groupTransactionAmount':groupTransactionAmount, 
        'transactionAmount':transactionAmount
    }
    //console.log(data);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: data,
        dataType: "JSON",
        success: function (response) {
            if (response=="Purchase Successful"){
                clearCart();
                document.getElementById("imgResponseP").src = "view/success.png";
                document.getElementById("purchaseResponseP").innerHTML = "<h3>"+response+"</h3>";
                document.getElementById("closeButtonP").innerHTML = "Done";  
				console.log("test");
                //send auto email
				autoMail(purchaseItem);
                getTransaction();
                getItem();
            }
            else {
                var soldoutSentence = soldOutList(response);
                document.getElementById("imgResponseP").src = "view/fail.png";
                document.getElementById("purchaseResponseP").innerHTML = soldoutSentence+"<h3>Sold Out. </h3> Please Select Other Cards.";
                document.getElementById("closeButtonP").innerHTML = "Try Again";  
            }
            //closeLoadingWindow();
            document.getElementById("purchaseCloseP").style.display = "block";  
            
        },
        error: function (response) {
            alert('System Failed, Please try again or contact our Staff');
            while (purchaseItem.length > 0) {
                purchaseItem.pop();
            }
            document.getElementById("imgResponseP").src = "view/fail.png";
            document.getElementById("purchaseResponseP").innerHTML = response;  
            document.getElementById("closeButtonP").innerHTML = "Try Again";  
            showCart();
            //closeLoadingWindow();
            document.getElementById("purchaseCloseP").style.display = "block";  
            
        },
      });    
}

function openLoadingWindow(id){
    document.getElementById("loadingWindow"+id).style.display = "block";
    document.getElementById("purchaseClose"+id).style.display = "none";
    document.getElementById("loadingWindow"+id).style.height = 'calc(100vh - 4em)';
    
}
function closeLoadingWindow(id){
    document.getElementById("imgResponse"+id).src = "view/loading.png";
    document.getElementById("purchaseResponse"+id).innerHTML = "Loading... Please Wait.";    
    document.getElementById("loadingWindow"+id).style.display = "none";     
    document.getElementById("loadingWindow"+id).style.height = '';       
}

function soldOutList(itemText){
    soldOutSentence = "";
    soldOutJSON = JSON.parse(itemText);
    for (var n =0; n<soldOutJSON.length; n++){
        for(i=0;i<cardsArray.cards.length;i++){
            if (cardsArray.cards[i].id==soldOutJSON[n]){
                //console.log(cardsArray.cards[i].name);
                soldOutSentence += cardsArray.cards[i].name;
                break;
            }
        }
        soldOutSentence += ","
    }
    return soldOutSentence;
}

function autoMail(purchaseItem){
    
    var xmlhttp = new XMLHttpRequest();                    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            emailArray = JSON.parse(this.responseText); 
            console.log(cardsArray); 
        }
    };
    xmlhttp.open("GET", "data/email.json", false);
    xmlhttp.send();
    
	//get item information for email
    for (i=0;i<purchaseItem.length;i++){
        var emailID = purchaseItem[i].id;
        var itemName = emailArray[emailID]["name"];
        var content = emailArray[emailID]["content"];
        //console.log(content);
        var data = {		
            'name':fullName,
            'classSession':info.classSession,
            'uid':uid,
            'itemName':itemName,
            'content':content,
        }
		$.ajax({
            type: "GET",
            url: 'model/mail.php',
            data: data,
            dataType: "JSON",
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                console.log(response);
            }
        });    
    }
}