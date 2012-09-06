var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Game object that keeps track of and updates state
// Contains many drawing functions and event handlers
var game = {
  // Handles clicks based on current state
  clickHandler: function(e) {
    switch (game.state) {
      case 0:
        ctx.font = game.buttonFont;
        for (var i in game.introButtons) {
          var button = game.introButtons[i];
          var width = ctx.measureText(button.text).width;
          var minX = button.x - width / 2;
          var maxX = button.x + width / 2;
          var minY = button.y - game.buttonFontSize / 2;
          var maxY = button.y + game.buttonFontSize / 2;
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          if (x <= maxX &&
              x >= minX &&
              y <= maxY &&
              y >= minY) {
            game.setState(button.state);
            break;
          }
        }
        break;
      case 1:
      case 3:
      case 4:
      case 6:
        game.setState(0);
        break;
      case 5:
        ctx.font = game.buttonFont;
        for (var i in game.difficultyButtons) {
          var button = game.difficultyButtons[i];
          var width = ctx.measureText(button.text).width;
          var minX = button.x - width / 2;
          var maxX = button.x + width / 2;
          var minY = button.y - game.buttonFontSize / 2;
          var maxY = button.y + game.buttonFontSize / 2;
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          if (x <= maxX &&
              x >= minX &&
              y <= maxY &&
              y >= minY) {
            game.difficulty = button.difficulty;
            game.setState(2);
            break;
          }
        }
        break;
      default:
        break;
    }
  },

  // The default button font
  buttonFont: "20px Tahoma, Geneva",
  buttonFontSize: 20,

  // Different buttons for difficulty
  difficultyButtons: [
    {text: "Easy", x: canvas.width / 2, y: 160, difficulty: 0}, 
    {text: "Medium", x: canvas.width/ 2, y: 220, difficulty: 1}, 
    {text: "Hard", x: canvas.width / 2, y: 280, difficulty: 2}
  ],

  // Draws the credits page
  drawCredits: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Tahoma, Geneva";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Credits", canvas.width / 2, 50);
    ctx.font = "14px Tahoma, Geneva";
    ctx.fillText("Game made by:", canvas.width / 2, 100);
    ctx.fillText("Alexander Malyshev (amalyshe)", canvas.width / 2, 150);
    ctx.fillText("Chong Xie (chongx)", canvas.width / 2, 200);
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 350);
  },

  // Draws the difficulty choosing page
  drawDifficulties: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(60, 60, 60)";
    ctx.font = "30px Tahoma, Geneva";
    ctx.textAlign = "center";
    ctx.fillText("Choose a difficulty", canvas.width / 2, 100);
    ctx.textBaseline = "middle";
    ctx.font = this.buttonFont;
    for (var i in this.difficultyButtons) {
      var button = this.difficultyButtons[i];
      ctx.fillText(button.text, button.x, button.y);
    }
  },

  // Draws the game ending screen
  drawEnding: function() {
    ctx.clearRect(0, 0, canvas.width, 65);
    ctx.font = "30px Tahoma, Geneva";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("You survived for " + this.run.time + " seconds", canvas.width / 2, 50);
    if (this.run.time > this.highscores[this.difficulty]) {
      this.highscores[this.difficulty] = this.run.time;
      ctx.fillText("NEW HIGHSCORE!", canvas.width / 2, 95);
    }
    ctx.font = "14px Tahoma, Geneva";
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 135);
  },

  // Draws all the highscores
  drawHighscores: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Tahoma, Geneva";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Highscores", canvas.width / 2, 50);
    ctx.font = "14px Tahoma, Geneva";
    ctx.fillText("Easy: " + this.highscores[0].toFixed(1) + " seconds", canvas.width / 2, 100);
    ctx.fillText("Medium: " + this.highscores[1].toFixed(1) + " seconds", canvas.width / 2, 150);
    ctx.fillText("Hard: " + this.highscores[2].toFixed(1) + " seconds", canvas.width / 2, 200);
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 350);
  },

  // Draws the instructions
  drawInstructions: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Tahoma, Geneva";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Instructions", canvas.width / 2, 50);
    ctx.font = "14px Tahoma, Geneva";
    ctx.fillText("When the game starts, shape outlines will start appearing on the screen", canvas.width / 2, 100);
    ctx.fillText("In the top right corner, you will see the current shape you can use", canvas.width / 2, 125);
    ctx.fillText("Place each shape as accurately as possible into a matching outline", canvas.width / 2, 150);
    ctx.fillText("Each time you do, you will get more time depending on your accuracy", canvas.width / 2, 175);
    ctx.fillText("When your time runs out, the game will end.", canvas.width / 2, 200);
    ctx.fillText("The color of the outline indicates the color of the shape you need to use", canvas.width / 2, 225);
    ctx.fillText("Use the 1,2,3,4 keys to use blue, red, green, and purple respectively", canvas.width / 2, 250);
    ctx.fillStyle = "rgb(13, 92, 148)";
    ctx.fillText("blue", 276, 250);
    ctx.fillStyle = "rgb(156, 19, 51)";
    ctx.fillText("red", 307, 250);
    ctx.fillStyle = "rgb(16, 163, 11)";
    ctx.fillText("green", 342, 250);
    ctx.fillStyle = "rgb(103, 13, 148)";
    ctx.fillText("purple", 413, 250);
    ctx.fillStyle = "black";
    ctx.fillText("Press q and w to rotate your current shape left or right", canvas.width / 2, 275);
    ctx.fillText("Left-click to place the shape, there is no penalty to placing shapes", canvas.width / 2, 300);
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 350);
  },

  // Draws the introduction screen
  drawIntro: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Tahoma, Geneva";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(13, 69, 92)";
    ctx.fillText("Shape Filler", canvas.width / 2, 100);
    ctx.fillStyle = "rgb(60, 60, 60)";
    ctx.textBaseline = "middle";
    ctx.font = this.buttonFont;
    for (var i in this.introButtons) {
      var button = this.introButtons[i];
      ctx.fillText(button.text, button.x, button.y);
    }
  },

  // Tracks the highscores
  highscores: [0, 0, 0],

  // Initiates the game
  init: function() {
    this.drawIntro();
    this.state = 0;
    canvas.addEventListener('click', game.clickHandler, false);
    canvas.addEventListener('mousemove', game.mouseMoveHandler, false);
    ctx.lineWidth = 3;
  },

  // The set of buttons that can be clicked on the intro screen
  introButtons: [
    {text: "Start", x: canvas.width / 2, y: 180, state: 5}, 
    {text: "Instructions", x: canvas.width/ 2, y: 220, state: 1}, 
    {text: "Highscores", x: canvas.width / 2, y: 260, state: 6},
    {text: "Credits", x: canvas.width / 2, y: 300, state: 4}
  ],

  // Handles mouse move event
  mouseMoveHandler: function(e) {
    var changed = false;
    switch (game.state) {
      case 0:
        ctx.font = game.buttonFont;
        for (var i in game.introButtons) {
          var button = game.introButtons[i];
          var width = ctx.measureText(button.text).width;
          var minX = button.x - width / 2;
          var maxX = button.x + width / 2;
          var minY = button.y - game.buttonFontSize / 2;
          var maxY = button.y + game.buttonFontSize / 2;
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          if (x <= maxX &&
              x >= minX &&
              y <= maxY &&
              y >= minY) {
            canvas.style.cursor = 'pointer';
            changed = true;
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(minX - 50, minY + game.buttonFontSize / 2 - 2, 40, 4);
            ctx.fillRect(maxX + 10, minY + game.buttonFontSize / 2 - 2, 40, 4);
            break;
          } else {
            ctx.clearRect(minX - 50, minY + game.buttonFontSize / 2 - 2, 40, 4);
            ctx.clearRect(maxX + 10, minY + game.buttonFontSize / 2 - 2, 40, 4);
          }
        }
        if (!changed) {
          canvas.style.cursor = 'auto';
        }
        break;
      case 5:
        ctx.font = game.buttonFont;
        for (var i in game.difficultyButtons) {
          var button = game.difficultyButtons[i];
          var width = ctx.measureText(button.text).width;
          var minX = button.x - width / 2;
          var maxX = button.x + width / 2;
          var minY = button.y - game.buttonFontSize / 2;
          var maxY = button.y + game.buttonFontSize / 2;
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          if (x <= maxX &&
              x >= minX &&
              y <= maxY &&
              y >= minY) {
            canvas.style.cursor = 'pointer';
            changed = true;
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(minX - 50, minY + game.buttonFontSize / 2 - 2, 40, 4);
            ctx.fillRect(maxX + 10, minY + game.buttonFontSize / 2 - 2, 40, 4);
            break;
          } else {
            ctx.clearRect(minX - 50, minY + game.buttonFontSize / 2 - 2, 40, 4);
            ctx.clearRect(maxX + 10, minY + game.buttonFontSize / 2 - 2, 40, 4);
          }
        }
        if (!changed) {
          canvas.style.cursor = 'auto';
        }
        break;

      default:
        break;
    }
  },

  // Resets the game by re-adding handlers
  reset: function() {
    canvas.addEventListener('click', game.clickHandler, false);
    canvas.addEventListener('mousemove', game.mouseMoveHandler, false);
  },

  // The current game run (Run object, see below)
  run: null,

  // Sets the state to a new state
  setState: function(state) {
    this.state = state;
    switch (state) {
      case 0:
        this.drawIntro();
        break;
      case 1:
        this.drawInstructions();
        break;
      case 2:
        this.run = new Run(this.difficulty);
        this.run.start();
        break;
      case 3:
        this.drawEnding();
        break;
      case 4:
        this.drawCredits();
        break;
      case 5:
        this.drawDifficulties();
        break;
      case 6:
        this.drawHighscores();
        break;
      default:
        alert('INVALID STATE');
    }
  },

  // Current state
  state: 0,
}

// 0 is easy, 1 is medium, 2 is hard
// Maps difficulty to number of shapes to draw
var gameDifficulties = [{shapeLifetime: 15.0, updateInterval: 500, baseScore: 5}, {shapeLifetime: 10.0, updateInterval: 400, baseScore: 4}, {shapeLifetime: 3.0, updateInterval: 300, baseScore: 2}];

// A Run object keeps track of what the player has done during the current run
// of a game
function Run(difficulty) {
  this.playerColor = 0;
  this.time = 0.0;
  this.timeleft = 10.0; // Start with 10 seconds
  this.shapeLifetime = gameDifficulties[difficulty].shapeLifetime;
  this.targetShapes = [];
  this.staleShapes = [];
  this.playerShape = null;
  // Generate first player shape
  this.genPlayerShape();
  this.notification = null;
  this.notificationTime = 0;
}

Run.prototype.updateTargets = function() {
  var shape = this.genRotatedShape();
  shape.setOutline(true);
  this.targetShapes.push(shape);
  shape.fadeOut(this.shapeLifetime);
}

Run.prototype.genPlayerShape = function() {
  var shape = this.genShape();
  shape.setCoords(560, 30);
  this.playerShape = shape;
};

Run.prototype.genShape = function() {
    var shapeType = Math.floor(Math.random() * 3);
    var x, y, size, color, direction, shape;
      x = Math.floor(Math.random() * (canvas.width - 150)) + 75;
      y = Math.floor(Math.random() * (canvas.height - 150)) + 100;
      size = Math.floor(Math.random() * shapeSizes.length);
      color = Math.floor(Math.random() * shapeColors.length);
      direction = Math.floor(Math.random() * 8);
   switch (shapeType) {
      case 0:
        shape = new Square(x, y, color, size);
        break;
      case 1:
        shape = new Circle(x, y, color, size);
        break;
      case 2:
        shape = new Semicircle(x, y, color, size);
        break;
      default:
        break;
    }
    return shape;
};
Run.prototype.genRotatedShape = function() {
  var shape = this.genShape();
  shape.rotate(Math.floor(Math.random() * 8));
  return shape;
};
// Keypress handler for changing colors and rotating
Run.prototype.keypressHandler = function(e) {
  switch (e.keyCode) {
    case 49:
      game.run.playerColor = 0;
      break;
    case 50:
      game.run.playerColor = 1;
      break;
    case 51:
      game.run.playerColor = 2;
      break;
    case 52:
      game.run.playerColor = 3;
      break;
    case 81:
      game.run.playerShape.rotate(-1);
      break;
    case 87:
      game.run.playerShape.rotate(1);
      break;
    default:
      break;
  }
  game.run.draw();
};
// Click handler for placing shapes
Run.prototype.clickHandler = function(e) {
  var shape = game.run.playerShape;
  var x = e.pageX - canvas.offsetLeft;
  var y = e.pageY - canvas.offsetTop;
  // Make sure the user doesn't place inside the top stats bar
  if (y > 80) {
    shape.setCoords(x, y);
    shape.fadeOut(1.0);
    var score = game.run.getScore(shape);
    if (score > 0) {
      game.run.notificationTime = 1.0;
      game.run.notification = score;
      game.run.timeleft += score;
    }
    game.run.staleShapes.push(shape);
    game.run.genPlayerShape();
    game.run.draw();
  }
};
// Draws the whole game screen
Run.prototype.draw = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.drawStats();
  this.drawScreen();
}
// Draws just the top bar
Run.prototype.drawStats = function() {
  ctx.font = "20px Tahoma, Geneva";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgb(60, 60, 60)";
  ctx.clearRect(40, 0, 450, 70);
  ctx.fillText("Time Left: " + this.timeleft.toFixed(1) + " seconds", 50, 30);
  if (this.notificationTime > 0) {
    ctx.fillStyle = "rgb(47, 224, 27)";
    ctx.fillText("+ " + this.notification.toFixed(1), 280, 30);
    ctx.fillStyle = "rgb(60, 60, 60)";
  }
  ctx.fillText("Current shape: ", 350, 30);
  ctx.fillRect(0, 60, canvas.width, 2);
};
// Draws just the shape outlines and player shapes
Run.prototype.drawScreen = function() {
  for (var i in this.targetShapes) {
    this.targetShapes[i].draw();
  }
  for (var i in this.staleShapes) {
    this.staleShapes[i].draw();
  }
  this.playerShape.setColor(this.playerColor);
  this.playerShape.draw();
};
// Ends the current game
Run.prototype.end = function() {
  clearInterval(this.timer);
  clearInterval(this.updater);
  // Clear all draw timeouts
  for (var i in this.timeouts) {
    clearTimeout(this.timeouts[i]);
  }
  canvas.removeEventListener('click', Run.prototype.clickHandler, false);
  canvas.removeEventListener('keyup', Run.prototype.keypressHandler, false);
  game.reset();
  game.setState(3);
}
// Scores the player based on proximity, time, orientation, color, and type
Run.prototype.getScore = function() {
  var bestScore = 0;
  var bestShape = null;
  var playerShape = game.run.playerShape;
    for (var j in game.run.targetShapes) {
      var targetShape = game.run.targetShapes[j]; 
      if (targetShape.color === playerShape.color &&
          targetShape.typeName === playerShape.typeName) {
        var shapeScore = parseInt(
            (1 - Math.sqrt(Math.pow(Math.abs(targetShape.x - playerShape.x), 2) + Math.pow(Math.abs(targetShape.y - playerShape.y), 2)) /
            shapeSizes[targetShape.size].width) * 
            gameDifficulties[game.difficulty].baseScore);
        shapeScore *= targetShape.compareAngle(playerShape.angle);
        if (shapeScore > bestScore) {
          bestScore = shapeScore;
          bestShape = j;
        }
      }
    }
    if (bestShape !== null) {
      game.run.targetShapes.splice(bestShape, 1);
    }
  return Math.round(bestScore * 10) / 10;
}
// Starts the current game
Run.prototype.start = function() {
  this.draw();
  canvas.removeEventListener('click', game.clickHandler, false);
  canvas.removeEventListener('mousemove', game.mouseMoveHandler, false);
  canvas.style.cursor = 'auto';
  canvas.addEventListener('click', Run.prototype.clickHandler, false);
  canvas.addEventListener('keyup', Run.prototype.keypressHandler, false);
  canvas.setAttribute('tabindex','0');
  canvas.focus();
  this.timer = setInterval(function() {
    game.run.notificationTime -= 0.1;
    game.run.timeleft -= 0.1;
    game.run.timeleft = Math.round(game.run.timeleft * 10) / 10;
    if (game.run.timeleft < 0.0) {
      game.run.end();
    } else {
      game.run.time += 0.1;
      game.run.time = Math.round(game.run.time * 10) / 10;
      game.run.draw();
    }
  }, 100);
  this.updater = setInterval(function() {
    game.run.updateTargets();
  }, gameDifficulties[game.difficulty].updateInterval);
}
Run.prototype.timeouts = [];

// Shape related stuff
// ALl the possible sizes
var shapeSizes = [{width: 10, height: 10}, {width: 25, height: 25}, {width: 40, height: 40}];
// All the possible colors
var shapeColors = ["rgba(13, 92, 148, 0.9)", "rgba(156, 19, 51, 0.9)", "rgba(16, 163, 11, 0.9)", "rgba(103, 13, 148, 0.9)"];

// The basic shape object
function Shape(x, y, color, size) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
}
// Starts off at default orientation
Shape.prototype.angle = 0;
// Function to fade a shape into view
Shape.prototype.fadeIn = function(opacity) {
  this.opacity = opacity;
  if(opacity < 1.0) {
    game.run.timeouts.push(setTimeout(function(shape, alpha) {
      shape.fadeIn(alpha);
    }, 50, this, opacity + 0.1));
  }
  this.draw();
};
Shape.prototype.fadeOut = function(time) {
  this.fadeOutHelper(1.0, parseInt(time * 1000 / 20));
}
Shape.prototype.fadeOutHelper = function(opacity, increment) {
  if (opacity < 0) {
    opacity = 0;
  }
  this.opacity = opacity;
  if(opacity > 0.0) {
    game.run.timeouts.push(setTimeout(function(shape, alpha, inc) {
      shape.fadeOutHelper(alpha, inc);
    }, increment, this, opacity - 0.05, increment));
  } else {
    var index = game.run.staleShapes.indexOf(this);
    if (index) {
      game.run.staleShapes.splice(index, 1);
    }

    var index = game.run.targetShapes.indexOf(this);
    if (index) {
      game.run.targetShapes.splice(index, 1);
    }
  }
};
Shape.prototype.opacity = 1.0;
Shape.prototype.outline = false;
Shape.prototype.setOutline = function(outline) {
  this.outline = outline;
};
// Rotates the current shape (can only rotate by Math.PI / 4)
Shape.prototype.rotate = function(direction) {
  var d = (direction + this.angle / (Math.PI / 4)) % 8;
  this.angle = d * Math.PI / 4;
}
// Sets the shape's color
Shape.prototype.setColor = function(color) {
  this.color = color;
}
// Sets the shape's coordinates
Shape.prototype.setCoords = function(x, y) {
  this.x = parseInt(x);
  this.y = parseInt(y);
}

// Square shape object
function Square(x, y, color, size) {
  Shape.call(this, x, y, color, size);
}
Square.prototype = new Shape();
Square.prototype.constructor = Square;
Square.prototype.compareAngle = function(angle) {
  if (parseInt(angle / Math.PI) % 2  === parseInt(this.angle / Math.PI) % 2) {
    return 1;
  }
  return 0.5;
};
Square.prototype.draw = function() {
  var width = shapeSizes[this.size].width;
  var height = shapeSizes[this.size].height;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  var x = parseInt(-width/2);
  var y = parseInt(-height/2);
  ctx.globalAlpha = this.opacity;
  if (this.outline) {
    ctx.strokeStyle = shapeColors[this.color];
    ctx.strokeRect(x, y, width, height);
  } else {
    ctx.fillStyle = shapeColors[this.color];
    ctx.fillRect(x, y, width, height);
  }
  ctx.globalAlpha = 1.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
Square.prototype.typeName = "square";

// Circle shape object
function Circle(x, y, color, size) {
  Shape.call(this, x, y, color, size);
}
Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;
Circle.prototype.compareAngle = function(angle) { return 1; };
Circle.prototype.draw = function() {
  var width = shapeSizes[this.size].width;
  var height = shapeSizes[this.size].height;
  var radius = width / 2;
  var x = this.x;
  var y = this.y;
  ctx.globalAlpha = this.opacity;
  if (this.outline) {
    ctx.strokeStyle = shapeColors[this.color];
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.fillStyle = shapeColors[this.color];
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
Circle.prototype.typeName = "circle";

// Semicircle shape object
function Semicircle(x, y, color, size) {
  Shape.call(this, x, y, color, size);
}
Semicircle.prototype = new Shape();
Semicircle.prototype.constructor = Semicircle;
Semicircle.prototype.compareAngle = function(angle) {
    if (angle === this.angle)
        return 1;
    return 0.2;
};
Semicircle.prototype.draw = function() {
  var width = shapeSizes[this.size].width;
  var height = shapeSizes[this.size].height;
  var radius = width / 2;
  var x = this.x;
  var y = this.y;
  ctx.globalAlpha = this.opacity;
  if (this.outline) {
    ctx.strokeStyle = shapeColors[this.color];
    ctx.beginPath();
    var startAngle = this.angle;
    ctx.arc(x, y, radius, startAngle, startAngle + Math.PI, true);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.fillStyle = shapeColors[this.color];
    ctx.beginPath();
    var startAngle = this.angle;
    ctx.arc(x, y, radius, startAngle, startAngle + Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
Semicircle.prototype.typeName = "semicircle";

// Start it!
game.init();
