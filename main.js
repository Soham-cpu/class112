//https://teachablemachine.withgoogle.com/models/qRzq_Fnsl/.json

prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function takePhoto() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="result_pic" src="' + data_uri + '"/>';
    });
}

console.log('ml5version - ', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qRzq_Fnsl/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speech_1 = "The first prediction is " + prediction_1;
    speech_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speech_1 + speech_2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById("result_pic");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emo_name1").innerHTML = prediction_1;
        document.getElementById("result_emo_name2").innerHTML = prediction_2;
        speak();

        if(results[0].label == "Happy"){
            document.getElementById("emoji_pred1").innerHTML = "&#128512;";
        }
        if(results[0].label == "Sad"){
            document.getElementById("emoji_pred1").innerHTML = "&#128557;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("emoji_pred1").innerHTML = "&#128545;";
        }


        if(results[1].label == "Happy"){
            document.getElementById("emoji_pred2").innerHTML = "&#128512;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("emoji_pred2").innerHTML = "&#128557;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("emoji_pred2").innerHTML = "&#128545;";
        }
    }
}