//https://teachablemachine.withgoogle.com/models/KhvTg-94j/
var prediction1 = "";
var prediction2 = "";

var camera = document.getElementById("camera");
Webcam.attach(camera);
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 93
});

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });

}

console.log("ml5.version is", ml5.version);

var classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/KhvTg-94j/model.json",modelloaded);
function modelloaded(){
console.log("Model is loaded successfully");
}

function speak(){
var synth=window.speechSynthesis;
var speakdata1="The first prediction is"+prediction1;
var speakdata2="The second prediction is"+prediction2;
var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
synth.speak(utterThis);
}

function check() {
    var img_clicked = document.getElementById("captured_image");
    classifier.classify(img_clicked, got_results);
}

function got_results(error, results) {
    if (error) {
        console.error(error);
    } 
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Punch") {
            document.getElementById("update_emoji").innerHTML = "&#128074;";
        }
        if (results[0].label == "Hi-Five") {
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "Up") {
            document.getElementById("update_emoji").innerHTML = "&#128070;";
        }
        if (results[0].label == "Agree") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[1].label == "Punch") {
            document.getElementById("update_emoji2").innerHTML = "&#128074;";
        }
        if (results[1].label == "Hi-Five") {
            document.getElementById("update_emoji2").innerHTML = "&#9995;";
        }
        if (results[1].label == "Victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if (results[1].label == "Up") {
            document.getElementById("update_emoji2").innerHTML = "&#128070;";
        }
        if (results[1].label == "Agree") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
    }
}
