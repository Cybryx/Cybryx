const child_process = require('child_process');
const prompt = require("prompt-sync")({ sigint: true });

// banner()
function banner() {
	console.clear()
	console.log(`${colours.bright}${colours.fg.blue}
                 ______         __                ___ ___ 
                |      |.--.--.|  |--.----.--.--.|   |   |
                |   ---||  |  ||  _  |   _|  |  ||-     -|
                |______||___  ||_____|__| |___  ||___|___|
                        |_____|           |_____|          
                                                                        
${colours.dim}${colours.fg.white}〤━━━━━━━━━━━━━━━━━━ # Production Server | @CybryX ━━━━━━━━━━━━━━━━━━〤
${colours.reset}`)}

function access() {
	console.log(`${colours.fg.yellow}
 ╔════════════════════════════════════════════════════════════════════╗ 
║〤|${colours.fg.red}                      Authorised Access Only                    ${colours.fg.yellow}|〤║
║〤|     By executing this script you acknowledge that you will     |〤║
║〤|  considered ${colours.fg.green}responsible for all damages${colours.reset}${colours.fg.yellow} when handling systems. |〤║
║〤|     Press Ctrl+C if you do not agree to be held responsible.   |〤║
║〤|                       Press Enter to agree.                    |〤║
 ╚════════════════════════════════════════════════════════════════════╝ ${colours.reset}`)
var access = prompt("");
}

var exit = 0

function starting() {
	console.log(`
〤━━━━━━━━━━━━━━━━━━━━━━━━━ Starting Projects ━━━━━━━━━━━━━━━━━━━━━━━━〤`)}

function running() {
	console.log(`
〤━━━━━━━━━━━━━━━━━━━━━━━━━ Currently Running ━━━━━━━━━━━━━━━━━━━━━━━━〤`)}

function loaded() {
	console.log(`
〤━━━━━━━━━━━━━━━━━━━━━━━━━━ Commands Loaded ━━━━━━━━━━━━━━━━━━━━━━━━━〤`)}

function exiting() {
	console.log(`
〤━━━━━━━━━━━━━━━━━━━━━━━━ Thank you, exiting. ━━━━━━━━━━━━━━━━━━━━━━━〤`)}

function systems() {
	console.log(`
		 ╔═════════════════════════════════════╗
		║1| AboutMe  - http://localhost:5001 |〤║
		║2| SimerCDN - http://localhost:5002 |〤║
		 ╚═════════════════════════════════════╝
`)}

// inputs
function inputs() {
	console.log(`${colours.fg.white}${colours.bright}
	     ╔══════════════════════════════════════════╗     
	    ║〤|${colours.fg.gray}${colours.bright}                    "?"                ${colours.fg.white}|〤║   
	    ║〤|${colours.fg.green}${colours.bright}                  "list"               ${colours.fg.white}|〤║   
	    ║〤|${colours.fg.white}${colours.bright}                  "clear"              ${colours.fg.white}|〤║   
	    ║〤|${colours.fg.red}${colours.bright}            "stop <projectID>"         ${colours.fg.white}|〤║   
	    ║〤|${colours.fg.yellow}${colours.bright}          "restart <projectID>"        ${colours.fg.white}|〤║   
	    ║〤|${colours.fg.red}${colours.bright}                  "exit"               ${colours.fg.white}|〤║   
	     ╚══════════════════════════════════════════╝     
${colours.reset}`)}

// colors
const colours = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[5m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m",
        crimson: "\x1b[38m",
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m",
        crimson: "\x1b[48m",
    }
};

// commands list
const commands = [
    { // ═══════════════════1═══════════════════ // 
        name: 'AboutMe',
        command: 'cd ./Projects/AboutMe && npm run beta'
    },
    { // ═══════════════════2═══════════════════ // 
        name: 'SimerCDN',
        command: 'cd ./Projects/CDN && npm run prod'
    }
];

// run command
function runCommand(command, name, callback) {
    child_process.exec(command, function (error, stdout, stderr) {
        if (stderr) {
            callback(stderr, null);
        } else {
            callback(null, `Successfully executed ${name} ...`);
        }
    });
}

// main calling function
function main() {
    banner()
    access()
    // starting()
    // systems()
    commands.forEach(element => {
        runCommand(element.command, element.name, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log(res);
            }
        });
    });
    loaded()
    inputs()
}

// tasks
function tasks() {
	var tasks = prompt(`${colours.bright}${colours.fg.green}simer@lol:${colours.fg.yellow}༆  ${colours.reset}`);
	switch(tasks) {
        case "?":
            console.clear()
            banner()
            inputs()
            break;
		case "list":
            console.clear()
            banner()
            running()
			systems()
			break;
		case "clear":
            console.clear()
            banner()
            console.log("? for commands")
			break;
		case "stop":
			console.log("Stopping <>");
			break;
        case "restart":
			console.log("Restarting <>");
			break;
        case "exit":
            console.clear()
            exiting()
            exit = 1
			break;
        case "x":
			console.log("Created by Cyber, x");
			break;
        default:
            console.log(`${colours.fg.red}Unrecognized command: ${tasks}${colours.reset}`)
		}
}

// call main
main();
while(exit == 0){
	tasks();
}
process.kill(0)