const riot = require('./riotModule');

const ReadJson = riot.ReadJson;
const MakeLink = riot.MakeLink;
const RequestJson = riot.RequestJson;
const MakeJson = riot.MakeJson;
const sleep = riot.sleep;

const MATCHLIST = "/lol/match/v4/matchlists/by-account/";

const IdUrl = [
    "accountId_CHALLENGER.json",
    "accountId_MASTER.json",
    "accountId_GRANDMASTER.json",
    "accountId_DIAMONDI.json",
    "accountId_DIAMONDII.json"
];

let Match = [];

const TakeMatch=async(data)=>{
    for (let acId of data.Id){
        await sleep(1201);
        let query= MATCHLIST+acId;

        MakeLink(encodeURI(query)) //링크 부호화
        .then(RequestJson)
        .then((return_data)=>{
            ID.push(return_data.Id);
        });
    }
    MakeJson({"type": "accountId","tier": data.tier,"Id":ID});
    console.log(data.tier,"-종료");
};

const run=async()=>{
    for(const ids of IdUrl){
        await ReadJson(ids).then(TakeMatch);
    }
}

run();
