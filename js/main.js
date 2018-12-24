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
    document.getElementById("logs").innerHTML = logs;
};

function foodClick(number){
    food = food + number;
    document.getElementById("food").innerHTML = food;
};

function villagerGrow(){
	childToCreate = 0
    childAttempted = Math.floor(totalVillagers() / 2);
    childToCreate = Math.min(childAttempted, ((huts*2) - totalVillagers()));
	idleVillagers = idleVillagers + childToCreate;
	document.getElementById('idleVillagers').innerHTML = idleVillagers;
};

var cursors = 0;

function buyHut(){
    var hutCost = Math.floor(10 * Math.pow(1.1,(huts-4)));     	// (don't count the first four of the playthrough)
    if(logs >= hutCost){                                   		
        huts = huts + 1;                                   
    	logs = logs - hutCost;                          			
        document.getElementById('huts').innerHTML = huts;  	
        document.getElementById('logs').innerHTML = logs;  			
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,huts));       
    document.getElementById('hutCost').innerHTML = nextCost;  
};

function assignWorker(job, number){
	if ((idleVillagers - number) >= 0){
		if(job === 'loggers' && (loggers + number) >= 0){
			idleVillagers = idleVillagers - number;
			loggers = loggers + number;
			document.getElementById('loggers').innerHTML = loggers;
		}
		else if(job == 'hunters' && (hunters + number) >= 0) {
			idleVillagers = idleVillagers - number;
			hunters = hunters + number;
			document.getElementById('hunters').innerHTML = hunters;
		}
		document.getElementById('idleVillagers').innerHTML = idleVillagers;
	}

}

function totalVillagers() {
	return idleVillagers + hunters + loggers;
}

window.setInterval(function(){
	
	logsClick(loggers);
	foodClick((hunters*huntGatherMultiplier) - totalVillagers());
	villagerGrow();
	
}, 1000);
