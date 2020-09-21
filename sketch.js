var board;
var btnGenerateBoard;
var btnSolve;
var btnReset;
var difficultySelector;
var sizeSelector;
var difficultyLevel;
var clickedCell;
var boardSize;

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  SetBoard();
  btnGenerateBoard = SetButton(width * 0.3, 50, "Generate", GenerateBoard);
  btnSolve = SetButton(width * 0.5, 50, "Solve", SolveBoard);
  btnReset = SetButton(width * 0.6, 50, "Reset", ResetBoard);
  difficultySelector = SetSelect(
    width * 0.2,
    50,
    DIFFICULTY_OPTIONS,
    ChangeDifficulyLevel
  );
  sizeSelector = SetSelect(
    width * 0.1,
    50,
    BOARD_SIZE_OPTIONS,
    ChangeBoardSize
  );
  difficultyLevel = DIFFICULTY_OPTIONS[0];
  boardSize = 9;
}

function draw() {
  background(GRAY3);
  DrawBoard();
  CheckCellFocus();
}

function SetBoard(boardSize) {
  board = new Board(BOARD_POS_X, BOARD_POS_Y, boardSize, boardSize);
}

function DrawBoard() {
  board.Draw();
}

function ChangeBoardSize() {
  let size = sizeSelector.value();
  boardSize = int(size.split("X")[0]);
  if (boardSize == 16) {
    CELL_WIDTH = 32;
    CELL_HEIGHT = 32;
    FONT_SIZE = 16;
  } else {
    CELL_WIDTH = 64;
    CELL_HEIGHT = 64;
    FONT_SIZE = 24;
  }
}

function SetButton(x, y, caption, action) {
  button = createButton(caption);
  button.position(x, y);
  button.mousePressed(action);
  return button;
}

function SetSelect(x, y, options, changeAction) {
  let sel = createSelect();
  sel.position(x, y, options);
  for (let option of options) {
    sel.option(option);
  }
  sel.changed(changeAction);
  return sel;
}

function GenerateBoard() {
  SetBoard(boardSize);
  amount = int(
    DIFFICULTY_LEVEL_AMOUNTS[difficultyLevel] * (boardSize * boardSize)
  );
  console.log(amount);
  board.GenerateValues(amount);
}

function ResetBoard() {
  board.Reset();
}

function SolveBoard() {
  console.log("Solving");
  let result = Solve(board);
  msg = result ? "Show solution" : " No solution";
  window.alert(msg);
  console.log(result);
  console.log("Finished");
}

function Solve(board) {
  return board.Solve();
}

function ChangeDifficulyLevel() {
  difficultyLevel = difficultySelector.value();
}

function CheckCellFocus() {
  for (let i = 0; i < board.rows; i++) {
    for (let j = 0; j < board.cols; j++) {
      let cell = board.grid[i][j];
      cell.SetChosen(false);
      if (cell.IsFocus(mouseX, mouseY)) {
        cell.SetChosen(true);
      }
    }
  }
}

/* Mouse Events */
function mousePressed() {
  for (let i = 0; i < board.rows; i++) {
    for (let j = 0; j < board.cols; j++) {
      let cell = board.grid[i][j];
      cell.SetClicked(false);
      if (cell.IsFocus(mouseX, mouseY)) {
        cell.SetClicked(true);
        clickedCell = cell;
      }
    }
  }
}

/* Keyboard Events */
function keyPressed(event) {
  let value = event.key;
  console.log(event);
  if (clickedCell && event.code == "Backspace") {
    clickedCell.value = 0;
  }
  if (clickedCell && value >= 1 && value <= board.rows) {
    clickedCell.value = int(value);
    if (board.IsValid()) {
      clickedCell.SetForeground(GREEN);
    } else {
      clickedCell.SetForeground(RED);
    }
  }
}
