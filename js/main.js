/*----- constants -----*/
const player = {
    '1': 'teal',
    '-1': 'gold',
    'null': 'white'
  };
  
  const winningSolutions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*----- app's state (variables) -----*/
  let board, turn, winner;
  
  /*----- cached element references -----*/
  const squares = document.querySelectorAll('td div');
  const message = document.querySelector('h1');
  
  /*----- event listeners -----*/
  document.querySelector('table').addEventListener('click', handleMove);
  document.querySelector('button').addEventListener('click', initialize);
  
  /*----- functions -----*/
  
  initialize();
  
  function handleMove(evt) {
    const idx = parseInt(evt.target.id.replace('sq', ''));
    if (board[idx] || winner) return;
    board[idx] = turn;
    turn *= -1;
    winner = getWinner();
    render();
  }
  
  function getWinner() {
    for (let i = 0; i < winningSolutions.length; i++) {
      if (Math.abs(board[winningSolutions[i][0]] + board[winningSolutions[i][1]] + board[winningSolutions[i][2]]) === 3) return board[winningSolutions[i][0]];
    }

    if (board.includes(null)) return null;
    return 'T';
  }
  
  function render() {
    board.forEach(function(sq, idx) {
      squares[idx].style.background = player[sq];
    });
    if (winner === 'T') {
      message.innerHTML = "It's a tie!";
    } else if (winner) {
      message.innerHTML = `${player[winner].toUpperCase()}Is the winner!`;
    } else {
      message.innerHTML = `${player[turn].toUpperCase()}'s Turn`;
    }
  }
  
  function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
  }