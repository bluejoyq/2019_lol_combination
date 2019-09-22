const riot = require('./riotModule'); // 내가 만든거

const LEAGUES = [
    "/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/I",
    "/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/II",
    "/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5",
    "/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5",
    "/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5"
];

const MakeLink = riot.MakeLink;
const RequestJson = riot.RequestJson;
const MakeJson = riot.MakeJson;

const TakeName=(data)=>{    
    return new Promise((resolve,reject)=>{
        let newArray =[];
        if(typeof(data.entries)=="object"){ // entries가 비었을때의 여부로 대체바람
            data.entries.forEach(elem => {
                newArray.push(elem.summonerName);  
            });
            resolve({"file":data.tier,"name":newArray});
        }
        else{
            data.forEach(elem => {
                newArray.push(elem.summonerName);  
            });
            resolve({"file":data[0].tier+data[0].rank,"name":newArray})
        }
    });  
};

LEAGUES.forEach(league => {
    MakeLink(league)
    .then(RequestJson)
    .then(TakeName)
    .then(MakeJson)
});

