import { byteList } from "./byteList";
import { Bytes } from "./bytes";
import { Snake } from "./snake";

export enum Direction {
  None,
  Up,
  Down,
  Right,
  Left,
}

export enum Role {
  Canvas,
  Body,
  Head,
  Tail,
  Byte,
}

export interface IGridItem {
  role: Role;
  direction: Direction;
  pivot: Direction;
}

class GridItem implements IGridItem {
  role = Role.Canvas;
  direction = Direction.None;
  pivot = Direction.None;
  letter = "A";
}

export class Grid {
  private grid: GridItem[][];
  private gridSize: number;
  private snake: Snake; // Grid contains a Snake
  private bytes: Bytes; // Grid contains Bytes

  public constructor() {
    const root = document.querySelector(":root")!;
    const rootStyle = getComputedStyle(root);
    this.gridSize = parseInt(rootStyle.getPropertyValue("--gridSize"));
    this.bytes = new Bytes(byteList);

    this.grid = new Array(this.gridSize);
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = new Array(this.gridSize);
    }

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i][j] = new GridItem();
      }
    }

    this.snake = new Snake();
  }

  public getGrid(): GridItem[][] {
    return this.grid;
  }

  public getGridSize(): number {
    return this.gridSize;
  }

  public getSnake(): Snake {
    return this.snake;
  }

  public getCurrentHeadDirection(): Direction {
    const { head } = this.snake.getSnakeEnds();
    return this.grid[head.row][head.col].direction;
  }

  public getCurrentTailDirection(): Direction {
    const { tail } = this.snake.getSnakeEnds();
    return this.grid[tail.row][tail.col].direction;
  }

  public setCurrentHeadDirection(direction: Direction) {
    const { head } = this.snake.getSnakeEnds();
    this.grid[head.row][head.col].direction = direction;
  }

  public getPivotDirectionOnCurrentTail() {
    const { tail } = this.snake.getSnakeEnds();
    return this.grid[tail.row][tail.col].pivot;
  }

  public setCurrentTailDirection(direction: Direction) {
    const { tail } = this.snake.getSnakeEnds();
    this.grid[tail.row][tail.col].direction = direction;
  }

  setPivotOnCurrentHeadDirection(pivot: Direction) {
    const { head } = this.snake.getSnakeEnds();
    this.grid[head.row][head.col].pivot = pivot;
  }

  public initGridData() {
    const { tail, head } = this.snake.getSnakeEnds();

    this.grid[tail.row][tail.col].direction = Direction.None;
    this.grid[head.row][head.col].direction = Direction.None;

    this.grid[tail.row][tail.col].role = Role.Tail;
    this.grid[head.row][head.col].role = Role.Head;

    if (tail.row === head.row) {
      // horizontal snake
      for (let i = tail.col + 1; i < head.col; i++) {
        this.grid[tail.row][i].role = Role.Body;
        this.grid[head.row][i].role = Role.Body;
      }
    } else if (tail.col === head.col) {
      // vertical snake
      for (let i = tail.row + 1; i < head.row; i++) {
        this.grid[i][tail.col].role = Role.Body;
        this.grid[i][tail.col].role = Role.Body;
      }
    } else {
      throw new Error("Snake init invalid");
    }

    this.setRandomBytePositions();
  }

  // sprinkles the next word on the grid
  public setRandomBytePositions() {
    const nextWord = this.bytes.getNextWord();
    for (let i = 0; i < nextWord.length; i++) {
      do {
        let randomRow = Math.floor(Math.random() * this.gridSize);
        let randomCol = Math.floor(Math.random() * this.gridSize);

        if (this.grid[randomRow][randomCol].role === Role.Canvas) {
          this.grid[randomRow][randomCol].role = Role.Byte;
          this.grid[randomRow][randomCol].letter = nextWord
            .charAt(i)
            .toUpperCase();
          break;
        } else {
          console.log("Invalid random position");
        }
      } while (1);
    }
  }
} // end of grid
