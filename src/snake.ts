// Snake metadata

export interface ISnakeEnds {
  tail: { row: number; col: number };
  head: { row: number; col: number };
}

export class Snake {
  private snakeEnds: ISnakeEnds = {
    tail: { row: 5, col: 5 },
    head: { row: 5, col: 10 },
  };

  public resetSnakeEnds() {
    this.setSnakeEnds({
      tail: { row: 5, col: 5 },
      head: { row: 5, col: 10 },
    });
  }

  public getSnakeEnds(): ISnakeEnds {
    return this.snakeEnds;
  }

  public setSnakeEnds(snakeEnds: ISnakeEnds): void {
    this.snakeEnds = snakeEnds;
  }

  public snakeAlive(): boolean {
    // TBD check if the snake head is not collided with a body/tail
    return true;
  }

  public snakeLength(): number {
    // TBD - return the number of grid locations
    return 4;
  }
}
