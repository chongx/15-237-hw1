var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game = {
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
        game.setState(0);
        break;
      case 2:
        alert('game state');
        break;
      case 3:
        game.setState(0);
        break;
      case 4:
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

  buttonFont: "20px Copperplate",
  buttonFontSize: 20,

  difficultyButtons: [
    {text: "Easy", x: canvas.width / 2, y: 160, difficulty: 0}, 
    {text: "Medium", x: canvas.width/ 2, y: 220, difficulty: 1}, 
    {text: "Hard", x: canvas.width / 2, y: 280, difficulty: 2}
  ],

  drawCredits: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Copperplate";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Credits", canvas.width / 2, 50);
    ctx.font = "14px Copperplate";
    ctx.fillText("Game made by:", canvas.width / 2, 100);
    ctx.fillText("Alexander Malyshev (amalyshev)", canvas.width / 2, 150);
    ctx.fillText("Chong Xie (chongx)", canvas.width / 2, 200);
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 350);
  },

  drawDifficulties: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(60, 60, 60)";
    ctx.textBaseline = "middle";
    ctx.font = this.buttonFont;
    for (var i in this.difficultyButtons) {
      var button = this.difficultyButtons[i];
      ctx.fillText(button.text, button.x, button.y);
    }
  },

  drawEnding: function() {
    ctx.clearRect(0, 0, canvas.width, 40);
    ctx.font = "30px Copperplate";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("You scored " + this.score + " points", canvas.width / 2, 50);
    ctx.font = "14px Copperplate";
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 80);
  },

  drawInstructions: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Copperplate";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Instructions", canvas.width / 2, 50);
    ctx.font = "14px Copperplate";
    ctx.fillText("When the game starts, you will see a number of shape outlines on the screen", canvas.width / 2, 100);
    ctx.fillText("Click anywhere to continue", canvas.width / 2, 350);
  },

  drawIntro: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Copperplate";
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

  init: function() {
    this.drawIntro();
    this.state = 0;
    canvas.addEventListener('click', game.clickHandler, false);
    canvas.addEventListener('mousemove', game.mouseMoveHandler, false);
    ctx.lineWidth = 3;
  },

  introButtons: [
    {text: "Start", x: canvas.width / 2, y: 180, state: 5}, 
    {text: "Instructions", x: canvas.width/ 2, y: 220, state: 1}, 
    {text: "Credits", x: canvas.width / 2, y: 260, state: 4}
  ],

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
            break;
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
            break;
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

  reset: function() {
    canvas.addEventListener('click', game.clickHandler, false);
    canvas.addEventListener('mousemove', game.mouseMoveHandler, false);
  },

  run: null,

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
        console.log(this.difficulty);
        this.run = new Run(this.difficulty);
        this.run.start();
        break;
      case 3:
        this.score = this.run.score();
        this.drawEnding();
        break;
      case 4:
        this.drawCredits();
        break;
      case 5:
        this.drawDifficulties();
        break;
      default:
        alert('INVALID STATE');
    }
  },

  state: 0,
}

var gameDifficulties = [10, 30, 50];
function Run(difficulty) {
  this.playerColor = 0;
  this.time = 0;
  this.numShapes = gameDifficulties[difficulty];
  this.targetShapes = [];
  this.playerShapes = [];
  var usedShapes = [];
  for (var i = 0; i < this.numShapes; i++) {
    var shapeType = Math.floor(Math.random() * 1);
    var x, y, size, color, direction;
    do {
      x = Math.floor(Math.random() * (canvas.width - 150)) + 75;
      y = Math.floor(Math.random() * (canvas.height - 150)) + 100;
      size = Math.floor(Math.random() * shapeSizes.length);
      color = Math.floor(Math.random() * shapeColors.length);
      direction = Math.floor(Math.random() * 8);
    } while (usedShapes["" + x + y] !== undefined && usedShapes["" + x + y].size !== size);
    usedShapes["" + x + y] = {size: size};
    switch (shapeType) {
      case 0:
        this.targetShapes[i] = new Square(x, y, color, size);
        this.targetShapes[i].rotate(direction);
        this.playerShapes[i] = new Square(560, 30, color, size);
      default:
        break;
    }
  }
  this.current = 0;
}
Run.prototype.keypressHandler = function(e) {
  console.log(e);
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
      game.run.playerShapes[game.run.current].rotate(-1);
      break;
    case 87:
      game.run.playerShapes[game.run.current].rotate(1);
      break;
    default:
      break;
  }
  game.run.draw();
};
Run.prototype.clickHandler = function(e) {
  var shape = game.run.playerShapes[game.run.current];
  var x = e.pageX - canvas.offsetLeft;
  var y = e.pageY - canvas.offsetTop;
  shape.setCoords(x, y);
  shape.fadeIn(0.0);
  game.run.current++;
  game.run.draw();
  if (game.run.current == game.run.numShapes) {
    game.run.end();
  }
};
Run.prototype.draw = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.drawStats();
  this.drawScreen();
}
Run.prototype.drawStats = function() {
  ctx.font = "20px Copperplate";
  ctx.textAlign = "left";
  ctx.fillStyle = "rgb(60, 60, 60)";
  ctx.clearRect(40, 0, 500, 40);
  ctx.fillText("Time: " + this.time + " seconds", 50, 30);
  ctx.fillText(this.current + "/" + this.numShapes + " placed", 280, 30);
  ctx.fillText("Next: ", 450, 30);
};
Run.prototype.drawScreen = function() {
  for (var i in this.targetShapes) {
    this.targetShapes[i].draw(true);
  }
  for (var i = 0; i < this.current; i++) {
    this.playerShapes[i].draw();
  }
  if (this.current < this.numShapes) {
    this.playerShapes[this.current].setColor(this.playerColor);
    this.playerShapes[this.current].draw();
  }
};
Run.prototype.end = function() {
  clearInterval(this.timer);
  canvas.removeEventListener('click', Run.prototype.clickHandler, false);
  canvas.removeEventListener('keyup', Run.prototype.keypressHandler, false);
  game.reset();
  game.setState(3);
}

Run.prototype.score = function() {
  var score = 0;
  for (var i in game.run.playerShapes) {
    var bestScore = 0;
    var bestShape = null;
    var playerShape = game.run.playerShapes[i];
    for (var j in game.run.targetShapes) {
      var targetShape = game.run.targetShapes[j]; 
      if (targetShape.color === playerShape.color &&
          targetShape.typeName === playerShape.typeName) {
        var shapeScore = parseInt((1 - Math.sqrt(Math.pow(Math.abs(targetShape.x - playerShape.x), 2) + Math.pow(Math.abs(targetShape.y - playerShape.y), 2)) / shapeSizes[targetShape.size].width) * 100);
        shapeScore *= targetShape.compareAngle(playerShape.angle);
        if (shapeScore > bestScore) {
          bestScore = shapeScore;
          bestShape = j;
        }
      }
    }
    if (bestShape !== null) {
      score += bestScore;
      game.run.targetShapes.splice(j, 1);
    }
  }
  return Math.ceil(score * Math.ceil(1 / (this.time / 10)));
}
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
    game.run.time++;
    game.run.drawStats();
  }, 1000);
}

// SHAPES
var shapeSizes = [{width: 10, height: 10}, {width: 30, height: 30}, {width: 20, height: 30}];
var shapeColors = ["rgba(13, 92, 148, 0.9)", "rgba(156, 19, 51, 0.9)", "rgba(16, 163, 11, 0.9)", "rgba(103, 13, 148, 0.9)"];
function Shape(x, y, color, size) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
}

Shape.prototype.angle = 0;
Shape.prototype.fadeIn = function(opacity) {
  this.opacity = opacity;
  var self = this;
  if(opacity < 1.0) {
    setTimeout(function(shape, alpha) {
      shape.fadeIn(alpha);
    }, 50, this, opacity + 0.1);
  }
  this.draw();
};
Shape.prototype.opacity = 1.0;
Shape.prototype.rotate = function(direction) {
  var d = (direction + this.angle / (Math.PI / 4)) % 8;
  this.angle = d * Math.PI / 4;
}
Shape.prototype.setColor = function(color) {
  this.color = color;
}
Shape.prototype.setCoords = function(x, y) {
  this.x = parseInt(x);
  this.y = parseInt(y);
}

function Square(x, y, color, size) {
  Shape.call(this, x, y, color, size);
}
Square.prototype = Shape.prototype;
Square.prototype.constructor = Square;
Square.prototype.compareAngle = function(angle) {
  if (parseInt(angle / Math.PI) % 2  === parseInt(this.angle / Math.PI) % 2) {
    return 1;
  }
  return 0.5;
};
Square.prototype.draw = function(outline) {
  var width = shapeSizes[this.size].width;
  var height = shapeSizes[this.size].height;
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  var x = parseInt(-width/2);
  var y = parseInt(-height/2);
  if (outline) {
    ctx.strokeStyle = shapeColors[this.color];
    ctx.strokeRect(x, y, width, height);
  } else {
    ctx.fillStyle = shapeColors[this.color];
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1.0;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
Square.prototype.typeName = "square";

// Start it!
game.init();
