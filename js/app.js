// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x = x;
    this.y = y;
    //randomly sets speed for enemy bugs
    this.speed = Math.floor((Math.random() * 200) + 125);
    //enemy image
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    //multiply by dt to have game run at same speed on all computers
    if (this.x < 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -5;
    }
    //check to see if enemy and player collides. If so reset back to starting position
    if (((this.y > player.y) && (this.y < player.y + 30)) && ((this.x > player.x - 60) && (this.x < player.x + 50))) {
        player.x = 200;
        player.y = 400;
        scoreTracker--;
        score.innerHTML = scoreTracker;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
let Player = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = 100;
    this.sprite = 'images/char-cat-girl.png';
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function (dt) {
    this.x = this.x;
    this.y = this.y;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left') {
        this.x -= 100;
    }
    if (keyPress == 'right') {
        this.x += 100;
    }
    if (keyPress == 'up') {
        this.y -= 90;
    }
    if (keyPress === 'down') {
        this.y += 90;
    }
    //if player reaches top send back to start position
    //update score
    if (this.y <= 0) {
        this.reset();
    }
    //keeps player on the board
    if (this.x < 0) {
        this.x = 0;
    }
    //keeps player on the board
    if (this.y > 400) {
        this.y = 400;
    }
    //keeps player on the board
    if (this.x > 400) {
        this.x = 400;
    }
}

//score keeper variables
let scoreTracker = 0;
let score = document.querySelector("span");

//Reset player to beginning position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
    scoreTracker++;
    score.innerHTML = scoreTracker;
};

//this function will display enemies:
let bug1 = new Enemy(0, 50, 100);
let bug2 = new Enemy(0, 140, 100);
let bug3 = new Enemy(0, 230, 100);
// Place all enemy objects in an array called allEnemies
let allEnemies = [bug1, bug2, bug3];
// Place the player object in a variable called player
let player = new Player(200, 400, 100);

//This function listens for key presses and sends to Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});