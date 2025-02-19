
function uploadDealcsv () {}; 
var parsedata = [];
/*------ Method for read uploded csv file ------*/
uploadDealcsv.prototype.getCsv = function(e) {
  let input = document.getElementById('myfile');

  input.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      var myFile = this.files[0];
      var reader = new FileReader();      
      reader.addEventListener('load', function (e) {        
        let csvdata = e.target.result; 
        parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
      });
      reader.readAsBinaryString(myFile);
    }
  });
}

/*------- Method for parse csv data and store --------------*/
uploadDealcsv.prototype.getParsecsvdata = function(data) {
    parsedata = [];
    csvString = data.toString();
    // console.log(csvString);
    let newLinebrk = data.split("\n"||"\r");
    const headers = newLinebrk[0].split(", ")
    for(let i = 0; i < newLinebrk.length; i++) {
        if (newLinebrk[i]){
        parsedata.push(newLinebrk[i].split(","));
        }
    }
    //console.log(parsedata);
}
function test(infoType){
    var size = 30;
    var iteration = Math.trunc(parsedata.length/size);
    var lastIndex = parsedata.length%size;
    if (lastIndex!=0){
        iteration+=1;
    }
    //console.log(iteration);
    var cohort = document.getElementById('corhort').value;
    if(infoType=='MTGroup'){
        var dataArray = [];
        var groupArray;
        for (let m = 0; m<iteration;m++){
            groupArray = [];
            if (m == iteration-1){
                var first = m*size+1;
                var last = lastIndex+size*m-1;
            }
            else {
                var first = m*size+1;
                var last = size*(m+1);
            }
            //console.log(first);
            //console.log(last);
            for(let n = first; n <= last; n++) {
                //console.log(parsedata[n][4]);
                var uid = parsedata[n][4].split('@')[0];
                //var name = parsedata[n][0];
                var classSession = parsedata[n][8].trim();
                var MTGroup = parsedata[n][9].trim();
                var groupObject = {
                    "cohort":cohort,
                    "uid":uid,
                    "classSession":classSession,
                    "MTGroup":MTGroup,
                }
                groupArray.push(groupObject);    
            }
            var groupList = {"MTGroup":groupArray};
            var dataText = JSON.stringify(groupList);
            var data = {
                'action':'setMTGroup',
                'dataText':dataText
            }
            dataArray.push(data);
            console.log(dataArray);
        }
        uploadFileAPI(dataArray, iteration);
    }
}
function convertJSON(infoType){
    var size = 30;
    var iteration = Math.trunc(parsedata.length/size);
    var lastIndex = parsedata.length%size;
    if (lastIndex!=0){
        iteration+=1;
    }
    //console.log(iteration);
    var cohort = document.getElementById('corhort').value;
    
    if(infoType=='MCGrade'){
        console.log("Processing MC Grade");
        var dataArray = [];
        var MCArray;
        for (let m = 0; m<iteration;m++){
            MCArray = [];
            if (m == iteration-1){
                //last iteration
                var first = m*size+3;
                var last = lastIndex+size*m-1;
            }
            else {
                var first = m*size+3;
                var last = size*(m+1)+3;
            }
            console.log(parsedata[first][4]);
            console.log(parsedata[last][4]);
            for(let n = first; n <= last; n++) {
                var uid = parsedata[n][4].split('@')[0];
                var classSession = parsedata[n][5].trim();
                var M1,M2,M3,M4 = 0;
                M1=0;M2=0;M3=0;M4=0;
                //console.log(parsedata[n][11].trim());
                if(parsedata[n][11].trim()>0){M1=parsedata[n][11].trim()};
                if(parsedata[n][12].trim()>0){M2=parsedata[n][12].trim()};
                if(parsedata[n][13].trim()>0){M3=parsedata[n][13].trim()};
                if(parsedata[n][14].trim()>0){M4=parsedata[n][14].trim()};

                //console.log(tempUserid);
                var MCObject = {
                    "cohort":cohort,
                    "uid":uid,
                    "classSession":classSession,
                    "M1":parseInt(M1),
                    "M2":parseInt(M2),
                    "M3":parseInt(M3),
                    "M4":parseInt(M4)
                }
                MCArray.push(MCObject);
            }
            // console.log(MCArray[1]);
            //for(var i=0; i<MCArray.length;i++){
            var MCList = {"MCGrade":MCArray};
            var dataText = JSON.stringify(MCList);
            var data = {
                'action':'setMCGrade',
                'dataText':dataText
            }
            dataArray.push(data);
            console.log(dataArray);
        }
        uploadFileAPI(dataArray, iteration);
    }
    else if(infoType=='MTGroup'){
        var dataArray = [];
        var groupArray;
        for (let m = 0; m<iteration;m++){
            groupArray = [];
            if (m == iteration-1){
                var first = m*size+1;
                var last = lastIndex+size*m-1;
            }
            else {
                var first = m*size+1;
                var last = size*(m+1);
            }
            //console.log(first);
            //console.log(last);
            for(let n = first; n <= last; n++) {
                //console.log(parsedata[n][4]);
                var uid = parsedata[n][4].split('@')[0];
                var name = parsedata[n][2]+" "+parsedata[n][3];
                var classSession = parsedata[n][8].trim();
                var MTGroup = parsedata[n][9].trim();
                var groupObject = {
                    "cohort":cohort,
                    "uid":uid,
                    "name":name,
                    "classSession":classSession,
                    "MTGroup":MTGroup
                }
                groupArray.push(groupObject);    
            }
            var groupList = {"MTGroup":groupArray};
            var dataText = JSON.stringify(groupList);
            var data = {
                'action':'setMTGroup',
                'dataText':dataText
            }
            dataArray.push(data);
            console.log(dataArray);
        }
        uploadFileAPI(dataArray, iteration);
    }
    else if(infoType=='itemList'){
        var itemArray = []
        for(let n = 1; n < parsedata.length; n++) {
            var classSession = parsedata[n][0].trim();
            var item = parsedata[n][1].trim();
            var amount = parsedata[n][2].trim();
            var subcat = parsedata[n][3].trim();
            var name = parsedata[n][4].trim();
            var itemObject = {
                'classSession': classSession,
                'item': item,
                'amount': amount,
                'subcat': subcat,
                'name': name
            };
            itemArray.push(itemObject);
        }
        var itemList = {"itemList":itemArray};
        var dataText = JSON.stringify(itemList);
        var data = {
            'action':'setItemList',
            'dataText':dataText
        }
        uploadFileAPI(data, 1);
    }
    else if(infoType=='itemList'){
        M5calculation(parsedata);
    }
}

var parseCsv = new uploadDealcsv();
parseCsv.getCsv(); 
//convert CSV file to JSON text

//upload CSV file to Google Sheet via API
function uploadFileAPI(dataArray,iteration, i=0){
    console.log("uploading"+i+"/"+iteration+" "+dataArray);
    if(i==0){
        document.getElementById('uploadStatus').innerHTML="Wait";
    }
    $.ajax({
        type: "GET",
        url: apiURL,
        data: dataArray[i],
        dataType: "JSON",
        success: function (response) {
            i++;
            console.log(i+"/"+iteration+" "+response);
            document.getElementById('uploadStatus').innerHTML=i+"/"+iteration+" "+response;
            if(i<iteration){
                uploadFileAPI(dataArray,iteration,i);
            }
        },
        error: function(response){
            console.log(response);
            document.getElementById('uploadStatus').innerHTML='Failed';
        }

      });
    
}

    //upload CSV file to php and save as JSON
