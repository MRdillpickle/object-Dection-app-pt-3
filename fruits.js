img = "";
status = "";
object = [];

function setup() {
    canvas = createCanvas(640,420);
    canvas.center();
    objectDector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "status: decting objects";
}

function preload() {
    img = loadImage('tv.webp');
}

function gotResult(error, results) {
    if (error) {
        console.error("error: ", error);
    }
    console.log(results);
    object = results;

}

function modelLoded() {
    console.log("model Loaded");
    status = true;
    objectDector.detect(img, gotResult);
}

function draw() {
    image(img, 0,0,640,420);

    if (status != "") {
        for (i = 0; i <object.length; i++) {
            document.getElementById("status").innerHTML = "status: object dected";
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "% " , object[i].x, object[i].y);
            noFill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
        
    }
}