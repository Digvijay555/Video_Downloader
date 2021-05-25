const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.listen(5000, () => {
    console.log('Server Works !!! At port 5000');
});

app.get('/', function(req,res) {

    response.sendFile(__dirname+"public/index.html");
    
    });


//This function is used to fetch video url according to resolution.

app.get("/videoInfo",async function(request,response){

    const videoURL=request.query.videoURL;
    const info=await ytdl.getInfo(videoURL);
    response.status(200).json(info);

});

//This function is used to download video 
app.get("/download",function(request,response){

    const videoURL=request.query.videoURL;
    const itag=request.query.itag;

    response.header("Content-Disposition",'attachment;\ filename="video.mp4" ');
    ytdl(videoURL,{

        filter:format =>format.itag==itag
    }).pipe(response);
});
