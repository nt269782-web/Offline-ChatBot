const chatBox = document.getElementById("chatBox");

function sendMessage() {

    let input = document.getElementById("userInput");
    let text = input.value.trim();

    if (text === "") return;

    // User Message
    chatBox.innerHTML += `
        <div class="message user">
            <div class="bubble">${text}</div>
        </div>
    `;

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Backend Request
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

        chatBox.innerHTML += `
            <div class="message bot">
                <div class="bubble">
                    ${data.reply}
                </div>
            </div>
        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    })
    .catch(error => {

        chatBox.innerHTML += `
            <div class="message bot">
                <div class="bubble">
                    Yes,
                    How Can I Help You ?
                </div>
                <div class="bubble">
                    N
                </div>
            </div>
        `;

        console.error(error);

    });

}

document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});