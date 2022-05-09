export class Score {
  private static instance: Score;
  private constructor() {}
  private currentScore = 0;
  //   private goldScore = 0;
  //   private silverScore = 0;
  //   private bronzeScore = 0;
  public setCurrentScore(score: number) {
    this.currentScore = score;
  }
  public getCurrentScore() {
    return this.currentScore;
  }
  public static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}
