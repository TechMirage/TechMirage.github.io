// TODO:
//  - Add a reset button for erasing your saves.
//  - Add more content (jobs, buildings, research, etc)
//  - Fix the layout issues and see about making borders/aesthetics
//  - Put all the updates to the numbers on screen into one function and
//      call it in the main game loop after the other updates, rather than
//      have all the document refresh calls in each individual function.
//  - Add a message log in the main game window that gives updates
//      as they are received (people dying, milestones achieved, etc.)

// Basic Resources
var logs = 0;
var food = 30;

// Types of Jobs
var idleVillagers = 4;
var hunters = 4;
var loggers = 0;

// Buildings
var huts = 4; // Start with 4 huts to accommodate your starting tribesman/woman.

// Technology Multipliers
var huntGatherMultiplier = 2;

// What happens when you click the gathering buttons?

function logsClick(number){
  logs = logs + number;
  document.getElementById('logs').innerHTML = logs;
}

function foodClick(number){
  food = food + number;
  if (food < 0) {
    food = 0;
  }
  document.getElementById('food').innerHTML = food;
}

// Creating more villagers to fill available space.
// TODO: randomize the number gained per turn.
function growVillagers(){
	childToCreate = 0;
	// Check to see if we can grow more villagers to fit into available housing space.
	// If so, start filling it in until you reach the housing max, unless you have negative food.
	if (totalHouseSpace() !== totalVillagers() && food >= 0) {
    childAttempted = Math.floor(totalVillagers() / 4);
    childToCreate = Math.min(childAttempted, (totalHouseSpace() - totalVillagers()));
  	idleVillagers = idleVillagers + childToCreate;
		document.getElementById('idleVillagers').innerHTML = idleVillagers;
	}
	if (food === 0) {
	  killVillagers(4);
	}
}

var cursors = 0;

function buyHut(){
  var hutCost = Math.floor(10 * Math.pow(1.1,(huts-4)));     	// (don't count the first four of the playthrough)
  if (logs >= hutCost){
    huts = huts + 1;
  	logs = logs - hutCost;
    document.getElementById('huts').innerHTML = huts;
    document.getElementById('logs').innerHTML = logs;
  }
  var nextCost = Math.floor(10 * Math.pow(1.1,huts));
  document.getElementById('hutCost').innerHTML = nextCost;
}

function assignWorker(job, number){
	if ((idleVillagers - number) >= 0){
		if(job === 'loggers' && (loggers + number) >= 0){
			idleVillagers = idleVillagers - number;
			loggers = loggers + number;
			document.getElementById('loggers').innerHTML = loggers;
		}
		else if (job === 'hunters' && (hunters + number) >= 0) {
			idleVillagers = idleVillagers - number;
			hunters = hunters + number;
			document.getElementById('hunters').innerHTML = hunters;
		}
		document.getElementById('idleVillagers').innerHTML = idleVillagers;
	}

}

// As it turns out, villagers can't live without food and will start dying.
// Priority list for Death: Idle > non-food workers > food gatherers

// TODO: Fix this entire function (ie replace it with something that actually works)
// TODO: Also need to figure out a better way to kill off all the jobs.
function killVillagers(number){
  var numToDie = number;
  if (idleVillagers > 0) {
    if (numToDie - idleVillagers > 0) {
      idleVillagers = idleVillagers - numToDie;
    } else {
      numToDie = numToDie - idleVillagers;
      idleVillagers = 0;
    }
  } else if (numToDie > 0 && loggers > 0) {
    if (numToDie - loggers > 0) {
      loggers = loggers - numToDie;
    } else {
      numToDie = numToDie - loggers;
      loggers = 0;
    }
  } else if (numToDie > 0 && hunters > 0) {
    if (numToDie - hunters > 0) {
      hunters = hunters - numToDie;
    } else {
      numToDie = numToDie - hunters;
      hunters = 0;
    }
  }
  document.getElementById('idleVillagers').innerHTML = idleVillagers;
  document.getElementById('loggers').innerHTML = loggers;
  document.getElementById('hunters').innerHTML = hunters;
}

// Some useful totalling functions

function totalVillagers() {
	return idleVillagers + hunters + loggers;
}

function totalHouseSpace() {
  return (huts * 2);
}

// Main game loop... triggers every second.

window.setInterval(function(){
	
	logsClick(loggers);
	foodClick((hunters*huntGatherMultiplier) - totalVillagers());
	growVillagers();
	
	// TODO: Save the game to a local cookie
}, 1000);
