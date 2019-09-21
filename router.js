const express=require('express');
const router=express.Router();
const fs= require('fs');

router.get('/',(req,res)=>{
    fs.readFile('./static/html/index.html',(err,data)=>{
        if(err)
            throw err;
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    });
});

module.exports=router;