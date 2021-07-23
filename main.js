
objects=[];
status="";
function preload()
{
    video = createVideo('video.mp4');
    
}

function setup()
{
    canvas = createCanvas(380, 380)
    canvas.center()
    video.hide()
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML ="Status : detecting objects"
}
function modelLoaded()
{
    console.log("model loaded !!")
    status=true;
    video.loop()
video.volume(0)
video.speed(1)
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results)
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380)
   if(status != "")
   {
       objectDetector.detect(video, gotResult)
       for(i = 0; i < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "Status : Objects Detected";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are ," + objects.length;
           fill("red");
           percent = floor(objects[i].confidence * 100)
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
           noFill()
           stroke("red")
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
       }
   }
}

