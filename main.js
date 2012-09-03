var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var game = {
  clickHandler: function(e) {
    switch (game.state) {
      case 0:
        ctx.font = game.buttonFont;
        for (i in game.introButtons) {
          var button = game.introButtons[i];
          var width = ctx.measureText(button.text).width;
          var minX = button.x - width / 2;
          var maxX = button.x + width / 2;
          var minY = button.y - game.buttonFontSize / 2;
          var maxY = button.y + game.buttonFontSize / 2;
          if (e.pageX <= maxX &&
              e.pageX >= minX &&
              e.pageY <= maxY &&
              e.pageY >= minY) {
            game.setState(button.state);
            break;
          }
        }
        break;
      case 1:
        alert('instruction screen');
        break;
      case 2:
        alert('game state');
        break;
      case 3:
        alert('ending state');
        break;
      case 4:
        alert('credits');
        break;
      default:
        break;
    }
  },

  buttonFont: "20px Arial",
  buttonFontSize: 20,

  drawIntro: function() {
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText("Shape Filler", canvas.width / 2, 100);
    ctx.textBaseline = "middle";
    ctx.font = this.buttonFont;
    for (i in this.introButtons) {
      var button = this.introButtons[i];
      ctx.fillText(button.text, button.x, button.y);
    }
  },

  init: function() {
    this.drawIntro();
  },

  introButtons: [
    {text: "Start", x: canvas.width / 2, y: 180, state: 2}, 
    {text: "Instructions", x: canvas.width/ 2, y: 220, state: 1}, 
    {text: "Credits", x: canvas.width / 2, y: 260, state: 4}
  ],

  mouseMoveHandler: function(e) {
    var changed = false;
    switch (game.state) {
      case 0:
        ctx.font = game.buttonFont;
        for (i in game.introButtons) {
          var button = game.introButtons[i];
          var width = ctx.measureText(button.text).width;
          var minX = button.x - width / 2;
          var maxX = button.x + width / 2;
          var minY = button.y - game.buttonFontSize / 2;
          var maxY = button.y + game.buttonFontSize / 2;
          if (e.pageX <= maxX &&
              e.pageX >= minX &&
              e.pageY <= maxY &&
              e.pageY >= minY) {
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

  setState: function(state) {
    alert(state); 
  },

  state: 0,
}

function Shape(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

game.init();
canvas.addEventListener('click', game.clickHandler, false);
canvas.addEventListener('mousemove', game.mouseMoveHandler, false);
