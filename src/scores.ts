import { GraphData } from "./graphGrid";
import { IScore } from "./launchSettings";

const days_to_wait = 7;

export const getCountryCode = async (): Promise<string> => {
  const myCountry = localStorage.getItem("myCountry");
  if (myCountry) {
    const myCountryObj = JSON.parse(myCountry);
    if (
      Math.floor((Date.now() - myCountryObj.date) / (1000 * 60 * 60 * 24)) <
      days_to_wait
    ) {
      console.log("returning stored country code", myCountryObj.flag);
      return myCountryObj.flag;
    }
  }

  const url =
    "https://ipgeolocation.abstractapi.com/v1/?api_key=0a280173921d485985d6bb19559927bd";
  const response = await fetch(url);
  if (response.status === 200) {
    const data = await response.json();
    const flag = data.flag.emoji;
    console.log("returning fetched country code", flag);
    localStorage.setItem(
      "myCountry",
      JSON.stringify({ flag: flag, date: Date.now() })
    );
    return flag;
  }
  console.log("unable to fetch country code!");
  return "--";
};

export class Score {
  private static instance: Score;
  private currentScore = 0;
  private myScores!: IScore;
  private myScoresGraph: GraphData = new GraphData();
  // private worldScoresGraph: GraphData = new GraphData();

  private constructor() {
    const personalScores = localStorage.getItem("personalScores");
    if (personalScores) {
      this.myScores = JSON.parse(personalScores);

      this.myScoresGraph.setGoldData(this.myScores.gold);
      this.myScoresGraph.setSilverData(this.myScores.silver);
      this.myScoresGraph.setBronzeData(this.myScores.bronze);
    }
  }

  public async setCurrentScore(score: number, intermediate: boolean = true) {
    this.currentScore = score;
    if (intermediate) return;
    if (score > this.myScores.gold.score) {
      this.myScores.bronze.score = this.myScores.silver.score;
      this.myScores.silver.score = this.myScores.gold.score;
      this.myScores.gold.score = score;

      this.myScores.bronze.country = this.myScores.silver.country;
      this.myScores.silver.country = this.myScores.gold.country;
      const flag = await getCountryCode();
      this.myScores.gold.country = flag;
    } else if (
      score > this.myScores.silver.score &&
      score < this.myScores.gold.score
    ) {
      this.myScores.bronze.score = this.myScores.silver.score;
      this.myScores.silver.score = score;

      this.myScores.bronze.country = this.myScores.silver.country;
      const flag = await getCountryCode();
      this.myScores.silver.country = flag;
    } else if (
      score > this.myScores.bronze.score &&
      score < this.myScores.silver.score
    ) {
      this.myScores.bronze.score = score;
      const flag = await getCountryCode();
      this.myScores.bronze.country = flag;
    } else return;

    localStorage.setItem("personalScores", JSON.stringify(this.myScores));
    this.myScoresGraph.setGoldData(this.myScores.gold);
    this.myScoresGraph.setSilverData(this.myScores.silver);
    this.myScoresGraph.setBronzeData(this.myScores.bronze);
  }
  public getCurrentScore() {
    return this.currentScore;
  }
  public getMyScoresGraph(): GraphData {
    return this.myScoresGraph;
  }
  public static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}
