prediction="";

Webcam.set({
    width:350,
    height:350,
    image_format:"png",
    png_quality:90

});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function capture()
 {
   Webcam.snap(function(data_uri)
  {
    document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";

   });
 }

console.log(ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/alyOxWV87/model.json",modelLoaded);

function modelLoaded()
{
    console.log("Model is loading")
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data="The prediction is"+prediction;
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}

function predict()
{
  image=document.getElementById("captured_image");
  classifier.classify(image,gotResult);
}

function gotResult(error,result)
{
   if(error)
   {
     console.log(error);
   }
   else
   {
     console.log(result);

     prediction=result[0].label;

     if(result[0].label=="Amazing")
     {
       document.getElementById("update_emoji").innerHTML="&#9757;";
     }
     if(result[0].label=="Best")
     {
       document.getElementById("update_emoji").innerHTML="&#9994;";
     }
     if(result[0].label=="Hi")
     {
       document.getElementById("update_emoji").innerHTML="&#9995;";
     }
     if(result[0].label=="Victory")
     {
       document.getElementById("update_emoji").innerHTML="&#9996;";
     }
     if(result[0].label=="Success")
     {
       document.getElementById("update_emoji").innerHTML="&#128076;";
     }
     speak();
     
   }
}