function createMatrix(field) {
  const l = Math.sqrt(field.length);
  var matrix = [];
  for(let i = 0; i < l; i++){
      matrix[i] = field.slice(i * l, i *l + l ).split('');
    }
    return matrix; 
  }
  function printMatrix(matrix) {
    for(let i = 0; i < matrix.length; i ++){
      console.log('\t' + matrix[i].join('\t'));
    }
    console.log('=============================');
  }
  

  function generateMap(matrix){
    var m = matrix.map(function(row){
      return row.map(function(cell){
        return {
          right:Infinity,
          left:Infinity,
          up:Infinity,
          down:Infinity
        };
      });
    });
    return m;
  }

  export function getCommands(field, power) {
    const squareLength = Math.sqrt(field.length);
    const forward = {
      up: [-1,0], 
      down: [1,0],
      left:[0,-1],
      right:[0,1]
    };
    const left = {
      up: "left",
      left: "down",
      down: "right",
      right: "up"
    };

    const right = {
      up: "right",
      left: "up",
      down: "left",
      right: "down"
    };

    //inner functions
    function moveForward(y, x, course, step) {
      var a = forward[course];
      var y1 = y + a[0];
      var x1 = x + a[1];
      if (x1 < 0 || x1 == squareLength || y1 < 0 || y1 == squareLength || matrix[y1][x1] == '#'){
        return;
      }
      nextWave(y1, x1, course, step + 1);
    } 

    function turnLeft(y, x, course, step) {
      nextWave(y,x, left[course], step + 1);
    }

    function turnRight(y, x,course,step){
      nextWave(y,x, right[course], step + 1);

    }

    function nextWave(y, x, course, step){
      if (step > power || map[y][x][course] <= step || step >= minWayLength){
        return;
      }

      map[y][x][course] = step;
      if (y == tY && x == tX){
        minWayLength = step;
        return;
      }
      moveForward(y,x,course,step);
      turnLeft(y,x,course,step);
      turnRight(y,x,course,step);
    }
    // make way from target position
    function prevStep(y, x, course, step){
      checkPrevStep(y,x,course,step - 1);
    }

    function checkPrevStep(y,x,course,step){
      var y1 = y - forward[course][0];
      var x1 = x - forward[course][1];
      var returnLeft = right[course];
      var returnRigth = left[course];

      if(step < 0) {
        return;
      }
      if (x1 >= 0 && x1 < squareLength && y1 >= 0 && y1 < squareLength && map[y1][x1][course] == step){
        wayPositions[y1][x1] = true;
        way.push('f');
        prevStep(y1, x1, course, step);
      }
      else if(map[y][x][returnLeft] == step){
        way.push('l');
        prevStep(y,x, returnLeft, step);
      }
      else if (map[y][x][returnRigth] == step){
        way.push('r');
        prevStep(y,x, returnRigth, step);
      }
      else {
        console.log('ERROR : Lost way!');
      }
    }

  var way = [];

  //start position
  var i = field.indexOf('S');
  const sX = i % squareLength;
  const sY = Math.floor(i / squareLength);
  //target position
  i = field.indexOf('T');
  const tX = i % squareLength;
  const tY = Math.floor(i / squareLength);
  var minWayLength = Infinity;

  var matrix = createMatrix(field);
  var course = "up";
  var map = generateMap(matrix);

  //array for draw way
  var wayPositions = [];
  for (let j = 0; j < matrix.length; j++){
    let arr = [];
    for(let k=0; k < matrix.length; k++){
      arr.push(false);
    }
    wayPositions.push(arr);
  }

  wayPositions[tY][tX] = true;

  nextWave(sY, sX, 'up', 0);

  if (minWayLength == Infinity) 
    {
      return [];
    }
  else{
    //get min course
    var minCourse;
    for(var i in map[tY][tX]){
      if(map[tY][tX][i] == minWayLength){
        minCourse = i;
      }
    }

    prevStep(tY, tX, minCourse, minWayLength);
    
  }
  return  [way.reverse(), wayPositions];
}



