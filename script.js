
// EXECUTIVE OS — CORE COMMAND ENGINE

const input = document.getElementById("command-input");
const output = document.getElementById("output");

function print(text, type = "response") {
    const div = document.createElement("div");
    div.className = type;
    div.innerHTML = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function executeCommand(cmd) {
    const command = cmd.toLowerCase().trim();

    print("> " + cmd, "command");

    switch (command) {
        case "help":
            print("Available commands:<br>- help<br>- clear<br>- version<br>- architect");
            break;

        case "clear":
            output.innerHTML = "";
            break;

        case "version":
            print("ALPHΩMEGA Executive OS — v1.0.0");
            break;

        case "architect":
            print("Identity confirmed: Pete Kelly — Originator, Architect, Canon Authority.");
            break;

        default:
            print("Unknown command. Type <span class='command'>help</span>.");
    }
}

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = input.value;
        input.value = "";
        executeCommand(value);
    }
});
