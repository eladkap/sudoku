class Cell {
  constructor(x, y, w, h, value) {
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.value = value;
    this.chosen = false;
    this.clicked = false;
    this.foreground = BLACK;
  }

  Draw() {
    strokeWeight(0.5);
    stroke(BLACK);
    if (this.chosen) {
      fill(AQUA);
    } else {
      fill(WHITE);
    }
    if (this.clicked) {
      fill(YELLOW);
    }

    rect(this.pos.x, this.pos.y, this.w, this.h);

    if (this.value > 0) {
      textAlign(CENTER);
      textSize(FONT_SIZE);
      textStyle(NORMAL);
      noStroke();
      fill(this.foreground);
      textAlign(CENTER);
      text(this.value, this.pos.x + this.w * 0.5, this.pos.y + this.h * 0.6);
    }
  }

  SetValue(value) {
    this.value = value;
  }

  SetChosen(value) {
    this.chosen = value;
  }

  SetClicked(value) {
    this.clicked = value;
  }

  SetForeground(foreground) {
    this.foreground = foreground;
  }

  IsFocus(mx, my) {
    let xAxis = mx > this.pos.x && mx < this.pos.x + this.w;
    let yAxis = my > this.pos.y && my < this.pos.y + this.h;
    return xAxis && yAxis;
  }
}
