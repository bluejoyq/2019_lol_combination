require('dotenv').config({path:'./process.env'})
const fs = require('fs');
const rp = require('request-promise')

let riot ={}; 

const URL = "https://kr.api.riotgames.com";

const HEADER = {
    "Origin": "https://developer.riotgames.com",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    "X-Riot-Token": process.env.API_KEY,
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
};

riot.MakeLink=(query)=>{ 
    return new Promise((resolve,reject)=>{
        resolve({
            uri : URL + query,
            headers : HEADER
        }); 
    });  
};

riot.RequestJson=(option)=>{
    return new Promise((resolve,reject)=>{
        rp(option)
            .then((body)=>{
                resolve(JSON.parse(body));
            })
            .catch((err)=>{
               console.log(err.response.body);
            });
    });
}

riot.MakeJson=(data)=>{
    let json = JSON.stringify(data,null,4);
    fs.writeFile(`./data_crawling/Name_${data.file}.json`,json,'utf8',function(err) {
        if(err) {
            return err;
        }
        console.log("File saved successfully!");
    });
}

riot.ReadJson=(fileName)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(`./data_crawling/${fileName}`,'utf8',(err,data)=>{
            if(err){
                throw(err);
            }
            data = JSON.parse(data);
            resolve(data); 
        });  
    });  
}

module.exports = riot;