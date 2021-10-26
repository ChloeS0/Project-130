song1="";
song2="";
song1_status="";
song2_status="";


function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(400, 400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose", getPoses);

}
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0
scoreLeftWrist=0;
scoreRightWrist=0;

function modelLoaded()
{
console.log("Model is loaded");
}

function getPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("The score is= "+ scoreLeftWrist);
        leftWristY=results[0].pose.leftWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        console.log("the y position of left wrist is= "+leftWristY);
        console.log("the x position of left wrist is= "+leftWristX);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        console.log("The y position of right wrist is= "+rightWristY);
        console.log("The x position of right wrist is= "+rightWristX);
    }
}

function draw()
{
image(video, 0, 0, 400, 400);

song1_status=song1.isPlaying();
song2_status=song2.isPlaying();

fill("red");
stroke("red");



if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);
    song2.stop();

    if(song1_status == false)
    {
        song1.play();
        document.getElementById("song_name").innerHTML="Playing - Harry Potter Theme song";
    }
}

if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);
    song2.stop();

    if(song1_status == false)
    {
        song1.play();
        document.getElementById("song_name").innerHTML="Playing - Harry Potter theme song";
    }
}


if(scoreLeftWrist > 0.2)
{
    circle(leftWristX, leftWristY, 20);
    song1.stop();

    if(song2_status == false)
    {
        song2.play();
        document.getElementById("song_name").innerHTML="Playing - Peter Pan song";
    }
}


}


