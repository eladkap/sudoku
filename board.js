class Board {
  constructor(x, y, rows, cols) {
    this.pos = createVector(x, y);
    this.rows = rows;
    this.cols = cols;
    this.sqrRoot = int(Math.sqrt(rows));
    this.SetGrid(x, y, rows, cols);
  }

  SetGrid(x, y, rows, cols) {
    this.grid = [];
    for (let i = 0; i < rows; i++) {
      this.grid[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let cellX = x + j * CELL_WIDTH;
        let cellY = y + i * CELL_HEIGHT;
        this.grid[i][j] = new Cell(cellX, cellY, CELL_WIDTH, CELL_HEIGHT, 0);
      }
    }
  }

  Draw() {
    // Draw cells
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].Draw();
      }
    }

    strokeWeight(3);
    stroke(BLACK);
    // Draw vertical lines
    let x = this.pos.x;
    let y = this.pos.y;
    for (let j = 0; j < this.cols + 1; j += this.sqrRoot) {
      line(x, y, x + this.cols * CELL_WIDTH, y);
      y += this.sqrRoot * CELL_HEIGHT;
    }

    // Draw horizontal lines
    x = this.pos.x;
    y = this.pos.y;
    for (let i = 0; i < this.rows + 1; i += this.sqrRoot) {
      line(x, y, x, y + this.rows * CELL_HEIGHT);
      x += this.sqrRoot * CELL_WIDTH;
    }
  }

  Reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].SetValue(0);
      }
    }
  }

  GenerateValues(amount) {
    this.Reset();
    let k = 0;
    while (k < amount) {
      let i = int(random() * this.rows);
      let j = int(random() * this.cols);
      let value = int(random() * this.rows) + 1;
      this.grid[i][j].SetValue(value);
      if (!this.IsValid()) {
        this.grid[i][j].SetValue(0);
        continue;
      }
      k++;
    }
  }

  FindEmpty() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].value == 0) {
          return [i, j];
        }
      }
    }
    return null;
  }

  IsFull() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].value == 0) {
          return false;
        }
      }
    }
    return true;
  }

  IsPossible(row, col, num) {
    // Check row
    for (let j = 0; j < this.cols; j++) {
      let value = this.grid[row][j].value;
      if (value == num) {
        return false;
      }
    }

    // Check col
    for (let i = 0; i < this.rows; i++) {
      let value = this.grid[i][col].value;
      if (value == num) {
        return false;
      }
    }

    // Check block
    let row0 = int(row / this.sqrRoot) * this.sqrRoot;
    let col0 = int(col / this.sqrRoot) * this.sqrRoot;
    for (let i = 0; i < this.sqrRoot; i++) {
      for (let j = 0; j < this.sqrRoot; j++) {
        let value = this.grid[row0 + i][col0 + j].value;
        if (value == num) {
          return false;
        }
      }
    }
    return true;
  }

  /* Validate Sudoku Board */

  IsValid() {
    return (
      this.CheckNoDuplicatesAtRows() &&
      this.CheckNoDuplicatesAtCols() &&
      this.CheckBlocks()
    );
  }

  CheckNoDuplicatesAtRow(row) {
    let set = new Set();
    for (let j = 0; j < this.cols; j++) {
      let value = this.grid[row][j].value;
      if (value == 0) {
        continue;
      }
      if (set.has(value)) {
        return false;
      } else {
        set.add(value);
      }
    }
    return true;
  }

  CheckNoDuplicatesAtCol(col) {
    let set = new Set();
    for (let i = 0; i < this.rows; i++) {
      let value = this.grid[i][col].value;
      if (value == 0) {
        continue;
      }
      if (set.has(value)) {
        return false;
      } else {
        set.add(value);
      }
    }
    return true;
  }

  CheckNoDuplicatesAtRows() {
    for (let row = 0; row < this.rows; row++) {
      if (!this.CheckNoDuplicatesAtRow(row)) {
        return false;
      }
    }
    return true;
  }

  CheckNoDuplicatesAtCols() {
    for (let col = 0; col < this.cols; col++) {
      if (!this.CheckNoDuplicatesAtCol(col)) {
        return false;
      }
    }
    return true;
  }

  CheckBlock(row, col) {
    let set = new Set();
    for (let i = 0; i < this.sqrRoot; i++) {
      for (let j = 0; j < this.sqrRoot; j++) {
        let value = this.grid[row + i][col + j].value;
        if (value == 0) {
          continue;
        }
        if (set.has(value)) {
          return false;
        } else {
          set.add(value);
        }
      }
    }
    return true;
  }

  CheckBlocks() {
    for (let row = 0; row < this.rows; row += this.sqrRoot) {
      for (let col = 0; col < this.cols; col += this.sqrRoot) {
        if (!this.CheckBlock(row, col)) {
          return false;
        }
      }
    }
    return true;
  }
}
