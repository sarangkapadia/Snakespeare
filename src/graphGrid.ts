export enum GraphRole {
  Empty,
  Podium,
  Country,
  Score,
}

const ScoreIndexs = {
  gold: { row: 1, col: 4 },
  silver: { row: 2, col: 3 },
  bronze: { row: 3, col: 2 },
};

const CountryIndexs = {
  gold: { row: 1, col: 0 },
  silver: { row: 2, col: 0 },
  bronze: { row: 3, col: 0 },
};

export type IGraphGridValue = number | string | null;
export type IGraphData = { score: number; country: string };

export interface IGraphGrid {
  role: GraphRole;
  value: IGraphGridValue;
}

export class GraphGridItem implements IGraphGrid {
  role = GraphRole.Empty;
  value: IGraphGridValue = null;
}

export class GraphData {
  private grid: GraphGridItem[][];
  private gridSize = 5;

  public constructor() {
    this.grid = new Array(this.gridSize);
    for (let i = 0; i < this.gridSize; i++) {
      this.grid[i] = new Array(this.gridSize);
    }

    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.grid[i][j] = new GraphGridItem();
      }
    }

    this.grid[1][0].role =
      this.grid[2][0].role =
      this.grid[3][0].role =
        GraphRole.Country;

    this.grid[1][0].value =
      this.grid[2][0].value =
      this.grid[3][0].value =
        "🇺🇸"; // default value

    this.grid[1][1].role =
      this.grid[1][2].role =
      this.grid[1][3].role =
        GraphRole.Podium;

    this.grid[2][1].role = this.grid[2][2].role = GraphRole.Podium;

    this.grid[3][1].role = GraphRole.Podium;

    this.grid[1][4].role = GraphRole.Score;
    this.grid[2][3].role = GraphRole.Score;
    this.grid[3][2].role = GraphRole.Score;
  }

  public getGoldData(): IGraphData {
    return {
      score: this.grid[ScoreIndexs.gold.row][ScoreIndexs.gold.col]
        .value as number,
      country: this.grid[CountryIndexs.gold.row][CountryIndexs.gold.col]
        .value as string,
    };
  }

  public getSilverData(): IGraphData {
    return {
      score: this.grid[ScoreIndexs.silver.row][ScoreIndexs.silver.col]
        .value as number,
      country: this.grid[CountryIndexs.silver.row][CountryIndexs.silver.col]
        .value as string,
    };
  }

  public getBronzeData(): IGraphData {
    return {
      score: this.grid[ScoreIndexs.bronze.row][ScoreIndexs.bronze.col]
        .value as number,
      country: this.grid[CountryIndexs.bronze.row][CountryIndexs.bronze.col]
        .value as string,
    };
  }

  public setGoldData(data: IGraphData) {
    this.grid[ScoreIndexs.gold.row][ScoreIndexs.gold.col].value = data.score;
    this.grid[CountryIndexs.gold.row][CountryIndexs.gold.col].value =
      data.country;
  }

  public setSilverData(data: IGraphData) {
    this.grid[ScoreIndexs.silver.row][ScoreIndexs.silver.col].value =
      data.score;
    this.grid[CountryIndexs.silver.row][CountryIndexs.silver.col].value =
      data.country;
  }

  public setBronzeData(data: IGraphData) {
    this.grid[ScoreIndexs.bronze.row][ScoreIndexs.bronze.col].value =
      data.score;
    this.grid[CountryIndexs.bronze.row][CountryIndexs.bronze.col].value =
      data.country;
  }

  public getGrid() {
    return this.grid;
  }

  public debugPrint() {
    for (let i = 0; i < this.gridSize; i++) {
      let str = "";
      for (let j = 0; j < this.gridSize; j++) {
        str += `${this.grid[i][j].role}, ${this.grid[i][j].value}    `;
      }
      console.log(str);
    }
  }
}
