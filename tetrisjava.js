document.addEventListener('DOMContentLoaded', () =>{
    var scoreelement=document.getElementById('score');
    var scores=0;
    var check=false;
    const grid=document.querySelector('.container1');
    var squares=Array.from(document.querySelectorAll('.container1 div'))
    const width=10;
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
      ];
    
      const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ];
    
      const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ];
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ];
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ];
    
      const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]  ;
      var currentposition=4;
      var currentrotation=0;
      var random = Math.floor(Math.random()*theTetrominoes.length);
  var current = theTetrominoes[random][currentrotation];
  console.log(squares);
  function draw() {
   
    if(!check){
      current.forEach(index => {
        squares[currentposition + index].classList.add('tetromino')
        squares[currentposition + index].style.backgroundColor = "green"
        squares[currentposition + index].style.borderColor = "black"
      })
    }
    
  
  }
  function undraw(){
    current.forEach(index => {
      squares[currentposition + index].classList.remove('tetromino')
      squares[currentposition + index].style.backgroundColor = ""
    })
  }
setInterval(movedown,1000);
  function movedown(){
    undraw();
    currentposition+=width;
    draw();  
    stop();   
  } 
  
  function stop(){
    if(current.some(index => squares[currentposition + width + index].classList.contains('taken'))){
      current.forEach(index => squares[currentposition + index].classList.add('taken'));
      currentposition=4;
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentrotation];
      draw();
      score();
    }
  }
  document.addEventListener('keyup', control)

  function control(k){
    if(k.keyCode == 37) {
      moveLeft()
    } else if (k.keyCode == 38) {
      Rotate()
    } else if (k.keyCode == 39) {
      moveRight()
    } else if (k.keyCode == 40) {
      movedown()
    }
  }
  function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentposition + index) % width === 0)
    if(!isAtLeftEdge) currentposition -=1
    if(current.some(index => squares[currentposition + index].classList.contains('taken'))) {
      currentposition +=1
    }
    draw()
  }
  function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentposition + index) % width === width -1)
    if(!isAtRightEdge) currentposition +=1
    if(current.some(index => squares[currentposition + index].classList.contains('taken'))) {
      currentposition -=1
    }
    draw()
  }
  function Rotate(){
    if(currentrotation==3){
      currentrotation=0;
    }
    else
      currentrotation+=1;
      undraw();
      current=theTetrominoes[random][currentrotation]
      draw();
  }
  function score(){
    for(let i=0;i<199;i+=width){
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
      if(row.every(index => squares[index].classList.contains('taken'))){
        scores +=10;
        document.getElementById('score').innerHTML=scores;
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      
      }
    }
  }
 
})