const chatBox = document.getElementById("chatBox");
function sendMessage(){
    let input = document.getElementById("userInput");
    let text=input.value.trim();

if(text==="") return;

chatBox.innerHTML+=`
<div class="message user">
<div class="bubble">${text}</div>
</div>
`;

input.value="";

chatBox.scrollTop=chatbox.scrollHeight;


// Temporary Bot Reply
setTimeout(()=>{

chatBox.innerHTML+=`
<div class="message bot">
<div class="bubble">
You typed: <b>${text}</b>
</div>
</div>
`;

chatBox.scrollTop=chatBox.scrollHeight;

},700);

}

document.getElementById("userInput").addEventListener("keypress",function(e){

if(e.key==="Enter"){

sendMessage();

}

});
fetch("http://localhost:8080/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: text
    })
})
.then(response => response.json())
.then(data => {
    // data.reply ko chat me show karo
});