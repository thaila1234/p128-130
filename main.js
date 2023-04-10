var song1 = " ";
var song2 = " ";
var rwy = 0;
var rwx = 0;
var lwy = 0;
var lwx = 0;
var song1status = " ";
var song2status = " ";
var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload(){
    song1 = loadSound("evidencias.mp3");
    song2 = loadSound("ABBA_-_Gimme_Gimme_Gimme_A_Man_After_Midnight[ConverteZilla.com].mp3");
}

function setup(){
        canvas = createCanvas(500, 500);
        canvas.center();
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, modelLoaded);
        poseNet.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FFFFFF");
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    if (scoreRightWrist > 0.2){
        circle(rwx, rwy, 25);
        song2.stop();
        if (song1status == false){
            song1.play();
            document.getElementById("songName").innerHTML = "Evidências está tocando."
        }
    }    
    if (scoreLeftWrist > 0.2){
        circle(rwx, rwy, 25);
        song1.stop();
        if (song2status == false){
            song2.play();
            document.getElementById("songName").innerHTML = "Gimme! Gimme! Gimme! está tocando."
        }
    }    
}

function modelLoaded(){
    console.log("O modelo foi carregado");
}

function gotPoses(results){
    if (results.length > 0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("pulso x: "+lwx+" pulso y: "+lwy);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
