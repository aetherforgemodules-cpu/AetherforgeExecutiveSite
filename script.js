// EXECUTIVE OS — MODULE ENGINE v1.2
// Core command engine + module routing + ritual engine

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
                - ritual start<br>
                - ritual confirm<br>
                - ritual complete<br>
                - ritual abort<br>
                - ritual state<br>
            `;
        },

        clear: () => {
            output.innerHTML = "";
            return "";
        },

        version: () => "ALPHΩMEGA Executive OS — v1.2.0 (Ritual Engine Active)",

        architect: () => "Identity confirmed: Pete Kelly — Originator, Architect, Canon Authority.",

        modules: () => {
            return `
                <strong>Loaded Modules:</strong><br>
                - core (system)<br>
                - ritual (active)<br>
                - canon (inactive)<br>
                - logs (inactive)<br>
                - universe (inactive)<br>
            `;
        }
    },

    // ------------------------------
    // RITUAL ENGINE MODULE
    // ------------------------------
    ritual: {
        state: "inactive",

        start: () => {
            if (modules.ritual.state !== "inactive") {
                return "A ritual is already in progress.";
            }
            modules.ritual.state = "awaiting-confirmation";
            return "Ritual initiated. Awaiting confirmation.";
        },

        confirm: () => {
            if (modules.ritual.state !== "awaiting-confirmation") {
                return "No ritual awaiting confirmation.";
            }
            modules.ritual.state = "active";
            return "Ritual confirmed. Ritual is now active.";
        },

        complete: () => {
            if (modules.ritual.state !== "active") {
                return "No active ritual to complete.";
            }
            modules.ritual.state = "inactive";
            return "Ritual completed successfully.";
        },

        abort: () => {
            if (modules.ritual.state === "inactive") {
                return "No ritual to abort.";
            }
            modules.ritual.state = "inactive";
            return "Ritual aborted.";
        },

        state: () => {
            return `Current ritual state: <strong>${modules.ritual.state}</strong>`;
        }
    }
};

// ------------------------------
// COMMAND ROUTER
// ------------------------------
function executeCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    print("> " + cmd, "command");

    // Check core module
    if (modules.core[command]) {
        const result = modules.core[command]();
        if (result) print(result);
        return;
    }

    // Check ritual module
    if (command.startsWith("ritual")) {
        const parts = command.split(" ");
        const action = parts[1];

        if (modules.ritual[action]) {
            const result = modules.ritual[action]();
            if (result) print(result);
            return;
        }

        print("Unknown ritual command.");
        return;
    }

    // Unknown command fallback
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
