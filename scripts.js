//elements
var cookie = document.getElementById("cookie");
var display = document.getElementById("display");
var clickUpgrade = document.getElementById("clickUpgrade");
var critChanceUpgrade = document.getElementById("critChanceUpgrade");
var critValueUpgrade = document.getElementById("critValueUpgrade");
var autoClickUpgrade = document.getElementById("autoClickUpgrade");
var gameLog = document.getElementById("gameLog");
var playerStats = document.getElementById("playerStats");

//variables
var score = 0;
var clickValue = 1;
var critChance = 0;
var critChanceUpgradeNo = 0;
var critValue = 2;

//actions
cookie.onclick = cookieClicked;
clickUpgrade.onclick = upgradeClick;
critChanceUpgrade.onclick = upgradeCritChance;
critValueUpgrade.onclick = upgradeCritValue;
autoClickUpgrade.onclick = upgradeAutoClick;



function cookieClicked() {
    log("cookie clicked");
    addScore(clickValue);
}

function addScore(addedScore = 1) {
   if ( Math.floor((Math.random() * 100) + 1) < critChance)
   {
    log("Critical cookie score increased by: " + addedScore * critValue);
    score += addedScore * critValue;
    displayScore();
   } 
   else 
   {
    log("score increased by: " + addedScore);
    score += addedScore;
    displayScore();
   }
}

function displayScore() {
    display.innerHTML = "Score: " + score;
}

function upgradeClick() {
    if (score >= 15)
    {
        log("clickUpgraded");
        score -= 15;
        clickValue += 1;
        displayStats();
        displayScore();
    }
    
}

function updateScroll () {
    gameLog.scrollTop = gameLog.scrollHeight;
}

function log(message) {
    gameLog.innerHTML += "\n" + message;
    updateScroll();
}

function upgradeCritChance() {
    if (score >= 100)
    {
        log("critChanceUpgraded");
        score -= 100;
        critChance += 5;
        displayStats();
        displayScore();
    }
}

function upgradeCritValue () {
    if (score >= 1000)
	{
		log("critMultiplierUpgraded");
		score -= 1000;
        critValue += 1;
        displayStats();
        displayScore();
	}
}

function displayStats() {
	playerStats.innerHTML = "click power: " + clickValue + ", crit chance: " + critChance + "%, crit multiplier: " + critValue;
}

function upgradeAutoClick() {
	window.setInterval(autoClick, 1000)
}

function autoClick() {
	log("auto");
	cookieClicked();
}