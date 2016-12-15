/******************************

ASCII AND YOU SHALL RECEIVE

*******************************/

init()

function init () {

  this.el = document.getElementById('target')
  this.player = {yPos:3, xPos: 2}
  this.wall = {passable: false}
  this.walk = {passable: true}
  this.trea = {passable: true, win: true}
  this.map = [[walk,  walk,  wall, trea, walk,  walk,  wall, trea],
              [walk,  walk,  wall, walk, walk,  walk,  wall, walk],
              [walk,  wall,  wall, walk, walk,  wall,  wall, walk],
              [walk,  walk,  walk, walk, walk,  walk,  walk, walk]]

  document.onkeydown = checkKey;

  showMap()
}

function showMap() {
   var output = ' ';
   
   //top
   for (var i = 0; i < map[0].length; ++i ) {
       output += '_'
   }
   output += '\n'
  
   //sides and middle
   for (var i = 0; i < map.length; ++i){
       output += '|'
       for (var x = 0; x < map[i].length; ++x) {
            if (i === player.yPos && x === player.xPos) {
               output += '@'
            } else if (map[i][x].win) {
               output += '$'
            } else if (map[i][x].passable) {
               output += ' '
            } else {
               output += '#'
            }
       }
        output += '|\n'
   }

   //bottom
   output += ' ';
   for (var i = 0; i < map[0].length; ++i ) {
       output += '*'
   }
   
   //print
   console.log(output);
   // debugger;
   el.innerHTML = output;
   // debugger;
}

function move (dir) {
   if (dir === 'up' && legalMove(dir)) {
           player.yPos -=  1
   } else if (dir === 'right' && legalMove(dir)) {
           player.xPos += 1
   } else if (dir === 'left' && legalMove(dir)) {
           player.xPos -= 1
   } else if (dir === 'down' && legalMove(dir)) {
           player.yPos += 1
   } else {
       console.log('game over');
   }
}

//checks if moving into wall or not. Doesn't check for array out of bounds yet.
function legalMove (dir){
 if (dir === 'up') {
       var y = player.yPos - 1;
       var x = player.xPos;
   } else if (dir === 'right') {
       var y = player.yPos;
       var x = player.xPos + 1;
   } else if (dir === 'left') {
       var y = player.yPos;
       var x = player.xPos - 1;
   } else if (dir === 'down') {
       var y = player.yPos + 1;
       var x = player.xPos;
   } else {
       console.log('game over');
   }
   
   return map[y][x].passable === true;
}

function winCheck() {
    if (map[player.yPos][player.xPos].win) {
      document.getElementById('victory').style.display = 'block';
    }     
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        move('up');    
        showMap();
        winCheck()
    }
    else if (e.keyCode == '40') {
        // down arrow
        move('down');    
        showMap();
        winCheck()
    }
    else if (e.keyCode == '37') {
       // left arrow
       move('left');    
        showMap();
        winCheck()
    }
    else if (e.keyCode == '39') {
       // right arrow
       move('right');    
        showMap();
        winCheck()
    }
}
