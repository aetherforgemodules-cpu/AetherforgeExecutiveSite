// EXECUTIVE OS — MODULE ENGINE v1.0
// Expands the OS with modular command routing

const input = document.getElementById("command-input");
const output = document.getElementById("output");

// ------------------------------
// PRINTING ENGINE
// ------------------------------
function print(text, type = "response") {
    const div = document.createElement("div");
    div.className = type;
    div.innerHTML = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

// ------------------------------
// MODULE REGISTRY
// ------------------------------
const modules = {
    core: {
        help: () => {
            return `
                <strong>Available commands:</strong><br>
                - help<br>
                - clear<br>
                - version<br>
                - architect<br>
                - modules<br>
            `;
        },
        clear: () => {
            output.innerHTML = "";
            return "";
        },
        version: () => "ALPHΩMEGA Executive OS — v1.1.0 (Module Engine Active)",
        architect: () => "Identity confirmed: Pete Kelly — Originator, Architect, Canon Authority.",
        modules: () => {
            return `
                <strong>Loaded Modules:</strong><br>
                - core (system)<br>
                - ritual (inactive)<br>
                - canon (inactive)<br>
                - logs (inactive)<br>
                - universe (inactive)<br>
            `;
        }
    }
};

// ------------------------------
// COMMAND ROUTER
// ------------------------------
function executeCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    print("> " + cmd, "command");

    // Check core module first
    if (modules.core[command]) {
        const result = modules.core[command]();
        if (result) print(result);
        return;
    }

    // Unknown command
    print("Unknown command. Type <span class='command'>help</span>.");
}

// ------------------------------
// INPUT LISTENER
// ------------------------------
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = input.value;
        input.value = "";
        executeCommand(value);
    }
});
