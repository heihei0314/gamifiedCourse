var soldOutItem = [];
var soldOutSub = [];
var inventory = [];
var inventorySub = [];


function getItemAmount(tag){
    var query={
        'action': 'getItemAmount',
        'classSession':info.classSession
    };
    //console.log(query);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: query,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            for (var i =0; i<response.Items.length;i++){
                if (response.Amount[i]<=0){
                    soldOutItem.push(response.Items[i]);
                    soldOutSub.push(response.Items[i].substring(2));
                }else{
                    inventory.push(response.Items[i]);
                    inventorySub.push(response.Items[i].substring(2));
                }
            }
            changeActiveButton('all');
        }
    });
}

function showCards(tag){
    //console.log('showcard');
    var xmlhttp = new XMLHttpRequest();                    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cardsArray = JSON.parse(this.responseText); 
            //console.log(info.classSession); 
        }
    };
    xmlhttp.open("GET", "data/card.json", false);
    xmlhttp.send();

    var cardsText="";
    for(i=0;i<cardsArray.cards.length;i++){
    if(tag=='all'||cardsArray.cards[i].tag==tag){
        cardsText+="<div>";
        if (cardsArray.cards[i].id=="02"){
            cardsText+="<div class='overlayBox' onclick='openCardWindow("+cardsArray.cards[i].id+")'>";
            cardsText+="<img src="+cardsArray.cards[i].image_src+">";
            cardsText+="<div class='overlayCard hoverCard'>";        
            cardsText+="<div></div>";
            cardsText+="<p>Add to Cart</p>";
        }
        else if(info.Items.includes(cardsArray.cards[i].id)||info.groupItems.includes(cardsArray.cards[i].id)){
            cardsText+="<div class='overlayBox'>";
            cardsText+="<img src="+cardsArray.cards[i].image_src+">";
            cardsText+="<div class='overlayCard usedCard'>";
            cardsText+="<div></div>";
            cardsText+="<p>Bought</p>";
        }
        else if(soldOutItem.includes(cardsArray.cards[i].id)){
            cardsText+="<div class='overlayBox'>";
            cardsText+="<img src="+cardsArray.cards[i].image_src+">";
            cardsText+="<div class='overlayCard usedCard'>";
            cardsText+="<div></div>";
            cardsText+="<p>Sold Out</p>";
        }
        else{
            cardsText+="<div class='overlayBox' onclick='openCardWindow("+cardsArray.cards[i].id+")'>";
            cardsText+="<img src="+cardsArray.cards[i].image_src+">";
            cardsText+="<div class='overlayCard hoverCard'>";        
            cardsText+="<div></div>";
            cardsText+="<p>Add to Cart</p>";
        }
        cardsText+="</div>";
        cardsText+="</div>";                            
        cardsText+="<div class='description'>";
        cardsText+=cardsArray.cards[i].name;
        
        if(cardsArray.cards[i].tag=="Achievement Unlocked"){
            cardsText+="<p><span class='tag'>"+cardsArray.cards[i].tag+"</span><span class='price'>?????"+"</span></p>";
        }
        else {
            cardsText+="<p><span class='tag'>"+cardsArray.cards[i].tag+"</span><span class='price'>$"+cardsArray.cards[i].price+"</span></p>";
        }
        cardsText+="</div>";
        cardsText+="</div>";
    }
    }
    //console.log(cardsText);
    document.getElementById("cards").innerHTML = cardsText;
}


function openCardWindow(id){
    
    var cardDetailsText="";
    var xmlhttp = new XMLHttpRequest();                    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cardsArray = JSON.parse(this.responseText); 
            //console.log(cardsArray); 
        }
    };
    xmlhttp.open("GET", "data/card.json", false);
    xmlhttp.send();
    
    var M5_embedLink = getTimeTable(info.classSession, "M5");
    
    var practice_embedLink = getTimeTable(info.classSession, "Practice");
    //console.log(embedLink);
    for(i=0;i<cardsArray.cards.length;i++){
    if(cardsArray.cards[i].id==id){
        cardDetailsText+="<div class='leftBox'>";
        cardDetailsText+="<img class='card' src="+cardsArray.cards[i].image_src+">";
        cardDetailsText+="</div>";
        cardDetailsText+="<div class='rightBox'  style='right:6vw;overflow-y:auto;'>";
        cardDetailsText+="<p class='title'>"+cardsArray.cards[i].name+"</p>";
        cardDetailsText+="<p>"+ cardsArray.cards[i].description+"</p>";
        cardDetailsText+="<p><b>Function: </b>"+ cardsArray.cards[i].function+"</p>";
        cardDetailsText+="<p><b>Limitation: </b>"+ cardsArray.cards[i].limitation+"</p>";
        if (cardsArray.cards[i].subcat){
            cardDetailsText+="<p><select id='subcat'>"
                for (var c=0; c<cardsArray.cards[i].subcat.length;c++){
                    if(!soldOutSub.includes(cardsArray.cards[i].subcat[c])&&inventorySub.includes(cardsArray.cards[i].subcat[c])){
                        cardDetailsText+="<option value='"+cardsArray.cards[i].subcat[c]+"'>"+cardsArray.cards[i].subcat[c]+"</option>";
                    }
                }
            cardDetailsText+="</select></p>"
        }
        if(cardsArray.cards[i].id=="09"){
            cardDetailsText+="<div style='border-top:solid 1px #d9d9d9'><p>"+cardsArray.cards[i].price+"</p>";
        }
        else if(cardsArray.cards[i].id=="12"){
            cardDetailsText+="<div style='border-top:solid 1px #d9d9d9'><p>$"+cardsArray.cards[i].price+"</p>";
            cardDetailsText+="<button class='shopButton' style='background-color:#897CB0'  id='"+cardsArray.cards[i].id+"' onclick='updateCart(this.id)'>Exodia Obliterate!</button>";
        }
        else {
            cardDetailsText+="<div style='border-top:solid 1px #d9d9d9'><p>$"+cardsArray.cards[i].price+"</p>";
            cardDetailsText+="<button class='shopButton' style='background-color:#897CB0'  id='"+cardsArray.cards[i].id+"' onclick='updateCart(this.id)'>Add To Cart</button>";
        }
        cardDetailsText+="</div>";
        cardDetailsText+="<div class='close' onclick='closeCardWindow()'><i class='fa fa-close'></i> Close</div>";
        
        if (cardsArray.cards[i].id=='08'){
            
            cardDetailsText+="<p><div style='text-align:left' id='M5TimeTable'>"
            cardDetailsText+="<iframe width='600px' height='500px' src='"+M5_embedLink+"'></iframe>"
            cardDetailsText+="</div></p>"
        }
        if (cardsArray.cards[i].id=='14'){
            
            cardDetailsText+="<p><div style='text-align:left' id='M5TimeTable'>"
            cardDetailsText+="<iframe width='600px' height='500px' src='"+practice_embedLink+"'></iframe>"
            cardDetailsText+="</div></p>"
        }
    }
    }
    document.getElementById("cardDetails").innerHTML = cardDetailsText;

    document.getElementById("cardDetails").style.display = "block";
    document.getElementById("cardList").style.height = 'calc(100vh - 4em)';
    
}

function closeCardWindow(){
    document.getElementById("cardDetails").style.display = "none";     
    document.getElementById("cardList").style.height = '';           
}

function getTimeTable(classSession, type){
    var embedLink="";
    var xmlhttp = new XMLHttpRequest();                    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            embedLinkArray = JSON.parse(this.responseText); 
            //console.log(embedLinkArray); 
        }
    };
    if(type=="M5"){
        xmlhttp.open("GET", "data/M5Timetable.json", false);
    }
    else{
        xmlhttp.open("GET", "data/PracticeTimetable.json", false);
    }
    
    xmlhttp.send();
    
    for(i=0;i<embedLinkArray.length;i++){
        if(classSession==embedLinkArray[i].classSession){
            embedLink = embedLinkArray[i].embedLink;
            break;
        }
    }
    
    return embedLink;
}