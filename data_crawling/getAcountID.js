const riot = require('./riotModule'); // 내가 만든거

const ReadJson = riot.ReadJson;
const MakeLink = riot.MakeLink;
const RequestJson = riot.RequestJson;
const MakeJson = riot.MakeJson;
const sleep = riot.sleep;

const SUMMONER = "/lol/summoner/v4/summoners/by-name/";
const Names = [
    "Name_CHALLENGER.json",
    "Name_MASTER.json",
    "Name_GRANDMASTER.json",
    "Name_DIAMONDI.json",
    "Name_DIAMONDII.json"
];

let ID = [];

const TakeName=async(data)=>{
    for (let name of data.name){
        await sleep(1201);
        let query= SUMMONER+name;

        MakeLink(encodeURI(query)) //링크 부호화
        .then(RequestJson)
        .then((data)=>{
            ID.push(data.accountId);
        });
    }
    MakeJson({"type": "accountId","tier": data.tier,"Id":ID});
    console.log(data.tier,"-종료");
};

const run=async()=>{
    for(const names of Names){
        await ReadJson(names).then(TakeName);
    }
}

run();
