var leaderboard ={
    classList:[],
    groupList:[],
    individualList:[]
}
var userClass="";
var showClass="";
var hallofFameArrayG=[];
var hallofFameArrayI=[];
var boardArray=[];
var individualArray=[];

function getLeaderboard(){
    
    var query={
        'action': 'getLeaderboard',
        'cohort': currentCohort
    };
    //console.log(query);
    $.ajax({
        type: "GET",
        url: apiURL,
        data: query,
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            setLeaderboard(response);
        },
        error: function(){
            console.log('leaderboard failed');
        }
    });

}
function setLeaderboard(data){
    leaderboard.classList = data.classList;
    leaderboard.groupList = data.groupList;
    leaderboard.individualList = data.individualList;
    userClass = document.getElementById("userClass").innerHTML
    //console.log(userClass);

    if (userClass=='Staff'){
        var classSelectionText ="";
        classSelectionText+="<select style='font-size:1em' onchange=inputTableArray(this.value)>";
        for (i=0;i<leaderboard.classList.length;i++){
            classSelectionText+="<option value='"+leaderboard.classList[i]+"'>"+leaderboard.classList[i]+"</option>";
        }
        classSelectionText+="</select>";
        document.getElementById("classSelection").innerHTML = classSelectionText; 
        document.getElementById("classSelection2").innerHTML = classSelectionText; 
        showClass = leaderboard.classList[0];
        inputTableArray(showClass);
    }
    else{
        showClass = userClass;
        inputTableArray(showClass);
    }
}
function inputTableArray(selectedClass){
    boardArray=[];
    for (var g=0; g<leaderboard.groupList.length;g++){
        if(selectedClass == leaderboard.groupList[g].classSession && currentCohort==leaderboard.groupList[g].cohort){
            boardArray.push(leaderboard.groupList[g]);
        }
    }
    sortTable(1, 'group',"rankingTable");

    individualArray=[];
    for (var i=0; i<leaderboard.individualList.length;i++){
        if(selectedClass == leaderboard.individualList[i].classSession && currentCohort==leaderboard.individualList[i].cohort){
            individualArray.push(leaderboard.individualList[i]);
        }
    }
    sortTable(1, 'uid',"individualRankingTable");

    hallofFameArrayG=[];
    hallofFameArrayG = leaderboard.groupList
    hallofFameArrayG = hallofFameArrayG.filter(function(e) { return e.Group !== 'Staff' })
    hallofFameArrayG = hallofFameArrayG.sort((a, b) => (b.Assets - a.Assets)).slice(0,5);  
    console.log(hallofFameArrayG)
    sortTable(-1, 'Assets',"HallofFameTable");
    hallofFameArrayI=[];
    hallofFameArrayI = leaderboard.individualList
    hallofFameArrayI = hallofFameArrayI.filter(function(e) { return e.classSession !== 'Staff' })
    hallofFameArrayI = hallofFameArrayI.sort((a, b) => (b.Assets - a.Assets)).slice(0,5);  
    console.log(hallofFameArrayI)
    sortTable(-1, 'Assets',"HallofFameTableI");

}
function sortTable(o, type,tableID) {
    let sortedData = [];
    switch(tableID){
        case 'HallofFameTable':
            sortedData = hallofFameArrayG;
            break;
        case 'HallofFameTableI':
            sortedData = hallofFameArrayI;
            break;
        case 'rankingTable':
            sortedData = boardArray;
            break;
        case 'individualRankingTable':
            sortedData = individualArray;
            break;
    }
    
    switch(type){
        case 'group':
            sortedData.sort(function(a, b){
                let x = "";
                if (a.Group!=null){
                    x = a.Group.toLowerCase();
                }
                let y = "";
                if (b.Group!=null){
                    y = b.Group.toLowerCase();
                }
                if (x < y) {return -1*o;}
                if (x > y) {return 1*o;}
                return 0;
            });
            break;
        case 'cohort':
            sortedData.sort(function(a, b){
                let x = "";
                if (a.cohort!=null){
                    x = a.cohort.toLowerCase();
                }
                let y = "";
                if (b.cohort!=null){
                    y = b.cohort.toLowerCase();
                }
                if (x < y) {return -1*o;}
                if (x > y) {return 1*o;}
                return 0;
            });
            break;
        case 'section':
            sortedData.sort(function(a, b){
                let x = "";
                if (a.classSession!=null){
                    x = a.classSession.toLowerCase();
                }
                let y = "";
                if (b.classSession!=null){
                    y = b.classSession.toLowerCase();
                }
                if (x < y) {return -1*o;}
                if (x > y) {return 1*o;}
                return 0;
            });
            break;
        case 'name':
            sortedData.sort(function(a, b){
                let x = "";
                if (a.name!=null){
                    x = a.name.toLowerCase();
                }
                let y = "";
                if (b.name!=null){
                    y = b.name.toLowerCase();
                }
                if (x < y) {return -1*o;}
                if (x > y) {return 1*o;}
                return 0;
            });
            break;
        case 'Assets':
            sortedData = sortedData.slice().sort((a, b) => (a.Assets - b.Assets)*o);  
            break;
        case 'items':
            sortedData = sortedData.slice().sort((a, b) => (a.Items - b.Items)*o);  
            break;
    }
    //console.log(boardArray);
    showLeaderboard(sortedData,tableID);
}
function showLeaderboard(tableArray, tableID){  
    //console.log(tableID)
    var leaderboardText="";        
    leaderboardText+="<table align='center' border='1'><tr>";
    if(tableID=="HallofFameTable" || tableID=="HallofFameTableI"){
        leaderboardText+="<td>Cohort <button onclick=sortTable(1,'cohort','"+tableID+"')><i class='fa fa-caret-up'></i></button> <button onclick=sortTable(-1,'cohort','"+tableID+"')><i class='fa fa-caret-down'></i></button></td>";
        leaderboardText+="<td>Class Section <button onclick=sortTable(1,'section','"+tableID+"')><i class='fa fa-caret-up'></i></button> <button onclick=sortTable(-1,'section','"+tableID+"')><i class='fa fa-caret-down'></i></button></td>";
    }
    
    if(tableID=="HallofFameTable" || tableID=="rankingTable"){
        leaderboardText+="<td>MT Group <button onclick=sortTable(1,'group','"+tableID+"')><i class='fa fa-caret-up'></i></button> <button onclick=sortTable(-1,'group','"+tableID+"')><i class='fa fa-caret-down'></i></button></td>";
    }else{
        leaderboardText+="<td>Name <button onclick=sortTable(1,'name','"+tableID+"')><i class='fa fa-caret-up'></i></button> <button onclick=sortTable(-1,'name','"+tableID+"')><i class='fa fa-caret-down'></i></button></td>";
    }
    leaderboardText+="<td>Cumulative mCoins <button onclick=sortTable(1,'Assets','"+tableID+"')><i class='fa fa-caret-up'></i></button> <button onclick=sortTable(-1,'Assets','"+tableID+"')><i class='fa fa-caret-down'></i></button></td>";
    leaderboardText+="<td>Rewards Purchased <button onclick=sortTable(1,'items','"+tableID+"')><i class='fa fa-caret-up'></i></button> <button onclick=sortTable(-1,'items','"+tableID+"')><i class='fa fa-caret-down'></i></button></td></tr>";
    for(i=0;i<tableArray.length;i++){
        leaderboardText += "<tr>";
        if(tableID=="individualRankingTable"){
            leaderboardText += "<td>" + tableArray[i].name + "</td>";
            leaderboardText += "<td>" + tableArray[i].Assets + "</td>";
            leaderboardText += "<td>" + tableArray[i].Items + "</td>";
        }
        else if(tableID=="rankingTable"){
            leaderboardText += "<td>" + tableArray[i].Group + "</td>";
            leaderboardText += "<td>" + tableArray[i].Assets + "</td>";
            leaderboardText += "<td>" + tableArray[i].Items + "</td>";
        }
        else if(tableID=="HallofFameTable"){
            leaderboardText += "<td>" + tableArray[i].cohort + "</td>";
            leaderboardText += "<td>" + tableArray[i].classSession + "</td>";
            leaderboardText += "<td>" + tableArray[i].Group + "</td>";
            leaderboardText += "<td>" + tableArray[i].Assets + "</td>";
            leaderboardText += "<td>" + tableArray[i].Items + "</td>";
        }
        else if (tableID=="HallofFameTableI"){
            leaderboardText += "<td>" + tableArray[i].cohort + "</td>";
            leaderboardText += "<td>" + tableArray[i].classSession + "</td>";
            leaderboardText += "<td>" + tableArray[i].name + "</td>";
            leaderboardText += "<td>" + tableArray[i].Assets + "</td>";
            leaderboardText += "<td>" + tableArray[i].Items + "</td>";
        }

        leaderboardText += "</tr>";
    }         
    document.getElementById(tableID).innerHTML = leaderboardText;       
    
}