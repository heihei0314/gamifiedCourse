
var  info = {
    classSession:null,
    MTGroup:null,
    mCoins:null,
    groupmCoins:null,
    totalmCoins:null,
    Items:[],
    UsedItems:[],
    deliveredItems:[],
    groupItems:[],
    groupUsedItems:[],
    groupDeliveredItems:[],
    itemsSubCat:[],
    groupItemsSubCat:[],
    History:[],
    groupHistory:[]
}
checkStaff();
//getInfo();

//check Staff
function checkStaff(){
    var xmlhttp = new XMLHttpRequest();                    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            StaffArray = JSON.parse(this.responseText); 
            //console.log(StaffArray); 
        }
    };
    xmlhttp.open("GET", "data/Staff.json", false);
    xmlhttp.send();
    if (StaffArray.Staff.includes(uid)){
        console.log(uid);
        document.getElementById("admin").style.display="";
        info.classSession = "Staff";
        info.MTGroup = "Staff";
        
    }
    getInfo(1);
    console.log(info);
}

//info
function getInfo(state){    
    var query={
        'action': 'getInfo',
        'cohort': currentCohort,
        'uid': uid
    };
    //console.log(query);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: query,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            if (state==1){
                //console.log('flag1');
                setInfo(response);
            }
            else {
                //console.log('flag2');
                setConis(response);
            }
        },
        error: function(){
            //console.log('flag3');
            getItem();
            showInfo();
        }
    });
}
function setConis(data){
    console.log(data)
    info.mCoins=data.mCoins;
    info.groupmCoins=data.groupmCoins;
    info.totalmCoins=data.groupmCoins+data.mCoins;
    showInfo();
}

function setInfo(data){
    info.classSession=data.classSession;
    info.MTGroup=data.MTGroup;
    document.getElementById("groupmCoins").innerHTML = "Downloading";
    document.getElementById("selfmCoins").innerHTML = "Downloading";
    document.getElementById("totalmCoins").innerHTML = "Downloading";
    getItem();
    getLeaderboard();
    getTransaction();
}
function showInfo(){
    console.log(info)
    document.getElementById("userClass").innerHTML = info.classSession;
    document.getElementById("userClass2").innerHTML = info.classSession;
    document.getElementById("groupmCoins").innerHTML = info.groupmCoins;
    document.getElementById("selfmCoins").innerHTML = info.mCoins;
    document.getElementById("totalmCoins").innerHTML = info.groupmCoins + " + " +info.mCoins + " = "+info.totalmCoins;
}
//info

//transaction
function getTransaction(){
    var query={
        'action': 'getTransaction',
        'cohort': currentCohort,
        'uid': uid
    };
    //console.log(query);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: query,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            setTransaction(response);
        }
    });
}
function setTransaction(data){
    info.History=data;
    
    getGroupTransaction();
    showTransaction()
}
function showTransaction(){
    var selfHistoryText = "";
        selfHistoryText+="<table> ";
        selfHistoryText+="<tr>";
        selfHistoryText+="<td>Date</td>";
        selfHistoryText+="<td>Description</td>";
        selfHistoryText+="<td>Amount</td>";
        selfHistoryText+="</tr>";
        for (r=0;r<info.History.length;r++){
            selfHistoryText+="<tr>";
            if(info.History[r].date!="System Update"){
                var tempDate = new Date(info.History[r].date);
                var dateOutput = tempDate.toLocaleString("zh-CN");
            }
            else{var dateOutput = info.History[r].date;}
            selfHistoryText+="<td>"+dateOutput+"</td>";
            selfHistoryText+="<td>"+info.History[r].description+"</td>";
            selfHistoryText+="<td>"+info.History[r].amount+"</td>";
            selfHistoryText+="</tr>";
        }
        selfHistoryText+="</table>";    
        document.getElementById("selfHistory").innerHTML = selfHistoryText;
        
}

function getGroupTransaction(){
    var query={
        'action': 'getGroupTransaction',
        'cohort': currentCohort,
        'classSession':info.classSession,
        'MTGroup':info.MTGroup
    };
    //console.log(query);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: query,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            //getInfo(2);
            setGroupTransaction(response);
        }
    });
}
function setGroupTransaction(data){
    info.groupHistory=data;
    showGroupTransaction()
}
function showGroupTransaction(){
    var groupHistoryText = "";
        groupHistoryText+="<table> ";
        groupHistoryText+="<tr>";
        groupHistoryText+="<td>Description</td>";
        groupHistoryText+="<td>Amount</td>";
        groupHistoryText+="</tr>";
        for (r=0;r<info.groupHistory.length;r++){
            groupHistoryText+="<tr>";
            groupHistoryText+="<td>"+info.groupHistory[r].description+"</td>";
            groupHistoryText+="<td>"+info.groupHistory[r].amount+"</td>";
            groupHistoryText+="</tr>";
        }
        groupHistoryText+="</table>";    
        document.getElementById("groupHistory").innerHTML = groupHistoryText;
        
        getInfo(2);
}
//transaction

//item
function getItem(){
    var query={
        'action': 'getItem',
        'cohort': currentCohort,
        'uid': uid,
        'classSession':info.classSession,
        'MTGroup':info.MTGroup
    };
    //console.log(query);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: query,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            setItem(response);
        }
    });
}
function setItem(data){
    info.Items=data.Items;
    info.UsedItems=data.UsedItems;
    info.deliveredItems=data.deliveredItems;
    info.groupItems=data.groupItems;
    info.groupUsedItems=data.groupUsedItems;
    info.groupDeliveredItems=data.groupDeliveredItems;
    info.itemsSubCat=data.itemsSubCat;
    info.groupItemsSubCat=data.groupItemsSubCat;
    
    getItemAmount('all');
    showItem();
}
function showItem(){
    var personalItemText = "";
        if (info.Items.length==0){
            personalItemText+="<div>";
            personalItemText+="<div class='overlayBox'>";
            personalItemText+="<img src='view/Card/card-00.png'>";
            personalItemText+="<div class='overlayCard>"; 
            personalItemText+="</div>";
            personalItemText+="</div>";
            personalItemText+="</div>";
        }else{
            for (r=0;r<info.Items.length;r++){
                personalItemText+="<div>";
                personalItemText+="<div class='overlayBox'>";
                personalItemText+="<img src='view/Card/card-"+info.Items[r]+".png'>";
                personalItemText+="<div class='overlayCard"; 
                if(info.UsedItems.includes(info.Items[r])){
                    personalItemText+=" usedCard'>";
                    personalItemText+="<div></div>";
                    personalItemText+="<p>Used</p>";
                }
                else if(info.deliveredItems.includes(info.Items[r])){
                    personalItemText+=" usedCard'>";
                    personalItemText+="<div></div>";
                    personalItemText+="<p>Delivered</p>";
                }
                else if(info.itemsSubCat.length>0){
                    personalItemText+=" usedCard'>";
                    personalItemText+="<div></div>";
                    personalItemText+="<p>"+info.itemsSubCat[0]+"</p>";
                }
                else{
                    personalItemText+="'>";
                    groupItemText+="<div></div>";
                }                            
                personalItemText+="</div>";
                personalItemText+="</div>";
                personalItemText+="</div>";
            }
        }
        document.getElementById("personalItem").innerHTML = personalItemText;
                    
        var groupItemText = "";
        if (info.groupItems.length==0){
            groupItemText+="<div>";
            groupItemText+="<div class='overlayBox'>";
            groupItemText+="<img src='view/Card/card-00.png'>";
            groupItemText+="<div class='overlayCard>"; 
            groupItemText+="</div>";
            groupItemText+="</div>";
            groupItemText+="</div>";
        }else{
            for (r=0;r<info.groupItems.length;r++){
                groupItemText+="<div>";
                groupItemText+="<div class='overlayBox'>";
                groupItemText+="<img src='view/Card/card-"+info.groupItems[r]+".png'>";
                groupItemText+="<div class='overlayCard"; 
                
                if(info.groupUsedItems.includes(info.groupItems[r])){
                    groupItemText+=" usedCard'>";
                    groupItemText+="<div></div>";
                    groupItemText+="<p>Used</p>";
                }
                else if(info.groupDeliveredItems.includes(info.groupItems[r])){
                    groupItemText+=" usedCard'>";
                    groupItemText+="<div></div>";
                    groupItemText+="<p>Delivered</p>";
                }
                else if(info.groupItemsSubCat.length>0){
                    console.log(info.groupItemsSubCat[r]);
                    groupItemText+=" usedCard'>";
                    groupItemText+="<div></div>";
                    groupItemText+="<p>"+info.groupItemsSubCat[r]+"</p>";
                }       
                else{
                    groupItemText+="'>";
                    groupItemText+="<div></div>";
                }                     
                groupItemText+="</div>";
                groupItemText+="</div>";
                groupItemText+="</div>";
            }
        }
        document.getElementById("groupItem").innerHTML = groupItemText;
}
//item

