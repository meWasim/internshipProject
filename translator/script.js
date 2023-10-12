const formText=document.querySelector(".form-text");
const toText=document.querySelector(".to-text");
const selectTag=document.querySelectorAll("select");
const exchangeIcon=document.querySelector(".exchange");
const translatorBtn=document.querySelector("#trans");
const icons=document.querySelectorAll(".row i");


selectTag.forEach((tag,id)=>{
  
    for (const country_code in countries) {
        let selected;
        if(id==0 && country_code == "en-GB"){
            selected="selected";

        }else if(id==1 && country_code == "hi-IN"){
            selected="selected";
        }
        console.log(countries[country_code]);

        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
       
    }
});

translatorBtn.addEventListener("click",()=>{
let text=formText.value,
translateFrom=selectTag[0].value,
translateTo=selectTag[1].value;
if(!text)return;
toText.setAttribute("placeholder","Translating..");

let api_url=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
fetch(api_url).then(res=>res.json()).then(data=>{
    // console.log(data);
    toText.value=data.responseData.translatedText;
    toText.setAttribute("placeholder","Translation");
});


});

exchangeIcon.addEventListener("click",()=>{
    let tempText=formText.value;
    let tempLang=selectTag[0].value;
    formText.value=toText.value;
    selectTag[0].value=selectTag[1].value;
    toText.value=tempText;
    selectTag[1].value=tempLang;

});

icons.forEach(icon=>{
icon.addEventListener("click",({target})=>{
    if(target.classList.contains("fa-copy")){
        if(target.id=="from"){
            navigator.clipboard.writeText(formText.value);
        }else{
            navigator.clipboard.writeText(toText.value);
            // console.log(" to copy icon clicked");
            
        }
    }else {   
        let utterance;

        if(target.id=="from"){
            // navigator.clipboard.writeText(formText.value);
            utterance=new SpeechSynthesisUtterance(formText.value);
            utterance.lang=selectTag[0].value;
        }else{
            utterance=new SpeechSynthesisUtterance(toText.value);
            utterance.lang=selectTag[1].value;
            // navigator.clipboard.writeText(toText.value);
            // console.log(" to copy icon clicked");
            
        }
        speechSynthesis.speak(utterance);
        
    }
});
runSpeechRecog = () => {
    document.getElementById("output").innerHTML = "Listening text...";
    var output = document.getElementById('output');
    var action = document.getElementById('action');
    let recognization = new webkitSpeechRecognition();

    recognization.onresult = (e) => {
       var transcript = e.results[0][0].transcript;
       output.innerHTML = transcript;
       output.classList.remove("hide")
       action.innerHTML = "";
    }
    recognization.start();
 }
});

// from image 
const imageInput = document.getElementById('image-input');
const convertBtn = document.getElementById('convert-btn');
const textOutput = document.getElementById('output');
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
  });

  convertBtn.addEventListener('click', function() {
    const file = imageInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'apikey': 'K87950776588957' // Replace with your API key
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.ParsedResults && data.ParsedResults.length > 0) {
        textOutput.value = data.ParsedResults[0].ParsedText;
      }
    })
    .catch(error => console.error('Error:', error));
    
  });