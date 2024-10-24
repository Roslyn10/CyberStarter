document.addEventListener("DOMContentLoaded", () => {
    const ws = new WebSocket("ws://localhost:1234");
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const submitButton = document.getElementById("submit-answer");
    const scoreDisplay = document.getElementById("score");

    let currentAnswer = "";
    
    ws.onmessage = function (event) {
        const message = JSON.parse(event.data);

        if (message.score !== undefined) {
            // Display the score once the quiz is finished
            questionContainer.style.display = "none";
            scoreDisplay.textContent = `Your score: ${message.score} out of ${message.total}`;
        } else {
            // Display the next question and its options
            document.getElementById("question").textContent = message.question;
            optionsContainer.innerHTML = "";
            message.options.forEach((option, index) => {
                const label = document.createElement("label");
                label.innerHTML = `<input type="radio" name="option" value="${index + 1}"> ${option}`;
                optionsContainer.appendChild(label);
            });
        }
    };

    submitButton.addEventListener("click", () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            currentAnswer = selectedOption.value;
            ws.send(currentAnswer); // Send the selected answer to the server
        } else {
            alert("Please select an option before submitting.");
        }
    });

    ws.onclose = function () {
        console.log("Connection closed");
    };
});
