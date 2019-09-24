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

async function TakeName(data){
    for (const name of data.name){
        await sleep(1201);
        MakeLink(name)
        .then(MakeLink)
        .then(RequestJson)
        .then((data)=>{
            ID.push(data.accountId);
        });
    }
    MakeJson({"type": "accountId","tier": data.file,"Id":ID});
};

async function run(){
    for(const names of Names){
        await ReadJson(names).then(TakeName);
    }
}

run();
