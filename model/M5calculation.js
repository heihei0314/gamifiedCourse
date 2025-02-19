function M5calculation(parsedata){
    var peerScoreArray = []
    for(let n = 1; n < parsedata.length; n++) {
        var classSession = parsedata[n][0].trim();
        var item = parsedata[n][1].trim();
        var amount = parsedata[n][2].trim();
        var subcat = parsedata[n][3].trim();
        var name = parsedata[n][4].trim();
        var peerScoreObject = {
            'classSession': classSession,
             'item': item,
                'amount': amount,
             'subcat': subcat,
             'name': name
         };
        peerScoreArray.push(peerScoreObject);
    }
    
    console.log(Array);
}