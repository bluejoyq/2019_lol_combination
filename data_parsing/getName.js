const request = require('request');
const fs = require('fs');

const URL = "https://kr.api.riotgames.com"
const header_frame = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": "temp",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
}
const LEAGUES = [
    "/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/I",
    "/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/II",
    "/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5",
    "/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5",
    "/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5"
]

const MakeLink=(league)=>{ 
    return new Promise((resolve,reject)=>{
        let HEADER = header_frame;
        fs.readFile('./data_parsing/key.json','utf8',(err,data)=>{
            if(err){
                throw(err);
            }
            data = JSON.parse(data);
            HEADER["X-Riot-Token"]=data.key;

            resolve({
                uri : URL + league,
                headers : HEADER
            }); 
        });
        
    });  
};

const Request=(option)=>{
    return new Promise((resolve,reject)=>{
        request(option,(err,res,body)=>{
            if(res.statusCode >= 400){
                console.log(body);
                throw err;
            }
            resolve(JSON.parse(body));
        });
    });  
}

const TakeName=(data)=>{    
    return new Promise((resolve,reject)=>{
        let newArray =[];
        if(typeof(data.entries)=="object"){
            data.entries.forEach(elem => {
                newArray.push(elem.summonerName);  
            });
            resolve({"tier":data.tier,"name":newArray});
        }
        else{
            data.forEach(elem => {
                newArray.push(elem.summonerName);  
            });
            resolve({"tier":data[0].tier+data[0].rank,"name":newArray})
        }
    });  
}

const MakeJson=(data)=>{
    let json = JSON.stringify(data,null,4);
    fs.writeFile(`./data_parsing/Name_${data.tier}.json`,json,'utf8',function(err) {
        if(err) {
            return err;
        }
        console.log("File saved successfully!");
    });
}

/*
return new Promise((resolve,reject)=>{
    resolve();
});  
*/
LEAGUES.forEach(league => {
    MakeLink(league)
    .then(Request)
    .then(TakeName)
    .then(MakeJson)
});

