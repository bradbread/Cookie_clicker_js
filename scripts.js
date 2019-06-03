//elements
var cookie = document.getElementById("cookie");
var display = document.getElementById("display");
var clickUpgrade = document.getElementById("clickUpgrade");
var critChanceUpgrade = document.getElementById("critChanceUpgrade");
var critValueUpgrade = document.getElementById("critValueUpgrade");
var autoClickUpgrade = document.getElementById("autoClickUpgrade");
var gameLog = document.getElementById("gameLog");
var playerStats = document.getElementById("playerStats");
var enemyHealth = document.getElementById("health");

//player stats
var score = 0;
var clickValue = 1;
var critChance = 0;
var critValue = 2;
var autoClickNum = 0;
var hp = 10;
//enemies
var evilCookie = {
    hp:10,
    attack: 1,
    name:"evil cookie"
}

//upgrade costs
var clickPrice = 15;
var autoClickPrice = 1000;
var critChancePrice = 100;
var critMultiplierPrice = 1000;

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
   if ( Math.floor((Math.random() * 100) + 1) <= critChance)
   {
    log("Critical cookie score increased by: " + addedScore * critValue);
    score += addedScore * critValue;
    enemyHealth.value -= addedScore * critValue;
    displayScore();
   } 
   else 
   {
    log("score increased by: " + addedScore);
    score += addedScore;
    enemyHealth.value -= addedScore;
    displayScore();
   }
}

function displayScore() {
    display.innerHTML = "Score: " + score;
}

function upgradeClick() {
    if (score >= clickPrice)
    {
        log("clickUpgraded");
        score -= clickPrice;
        clickValue += 1;
        displayStats();
        displayScore();
        clickPrice = Math.round(clickPrice * 1.1);
        clickUpgrade.innerHTML = "upgrade click: " + clickPrice;
    }
    else
    {
        log("not enough cookies to purchase.")
    }
    
}

function updateScroll () {
    gameLog.scrollTop = gameLog.scrollHeight;
}

function log(message) {
    gameLog.innerHTML += "<br>" + message;
    updateScroll();
}

function upgradeCritChance() {
    if (score >= critChancePrice)
    {
        log("critChanceUpgraded");
        score -= critChancePrice;
        critChance += 5;
        displayStats();
        displayScore();
        critChancePrice = Math.round(critChancePrice * 2);
        critChanceUpgrade.innerHTML = "upgrade critical chance: " + critChancePrice;
    }
    else
    {
        log("not enough cookies to purchase.")
    }
}

function upgradeCritValue () {
    if (score >= critMultiplierPrice)
	{
		log("critMultiplierUpgraded");
		score -= critMultiplierPrice;
        critValue += 1;
        displayStats();
        displayScore();
        critMultiplierPrice = Math.round(critMultiplierPrice * 2.5);
        critValueUpgrade.innerHTML = "upgrade critical multiplier: " + critMultiplierPrice;
    }
    else
    {
        log("not enough cookies to purchas.")
    }
}

function displayStats() {
	playerStats.innerHTML = "click power: " + clickValue + ", crit chance: " + critChance + "%, crit multiplier: " + critValue + ", autoclicker number: " + autoClickNum;
}

function upgradeAutoClick() {
    if(score >= autoClickPrice) 
    {
        log("autoClickUpgraded");
        autoClickNum += 1;
        score -= autoClickPrice;
        window.setInterval(autoClick, 1000);
        displayScore();
        autoClickPrice *= 10;
        autoClickUpgrade.innerHTML = "upgrade autoclick: " + autoClickPrice;

    }
    else
    {
        log("not enough cookies to purchase.")
    }

}

function autoClick() {
	log("autoClick");
	addScore(clickValue);
}