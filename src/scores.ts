import { GraphData } from "./graphGrid";
import { getWorldScores, IScore } from "./launchSettings";

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
  private worldScores!: IScore;

  private myScoresGraph: GraphData = new GraphData();
  private worldScoresGraph: GraphData = new GraphData();

  private constructor() {
    this.loadWorldScores();
    this.loadMyScores();
  }

  private loadMyScores() {
    const personalScores = localStorage.getItem("personalScores");
    if (personalScores) {
      this.myScores = JSON.parse(personalScores);

      this.myScoresGraph.setGoldData(this.myScores.record.gold);
      this.myScoresGraph.setSilverData(this.myScores.record.silver);
      this.myScoresGraph.setBronzeData(this.myScores.record.bronze);
    }
  }

  private loadWorldScores() {
    const worldScores = localStorage.getItem("worldScores");
    if (worldScores) {
      this.worldScores = JSON.parse(worldScores);

      this.worldScoresGraph.setGoldData(this.worldScores.record.gold);
      this.worldScoresGraph.setSilverData(this.worldScores.record.silver);
      this.worldScoresGraph.setBronzeData(this.worldScores.record.bronze);
    }
  }

  private async putWorldScores(newScores: string) {
    let myHeaders = new Headers();
    myHeaders.append(
      "X-Master-Key",
      "$2b$10$k/NZNRRra1kD8akN1cw5nu3sxp7RSvLNx7xBlUb5GhDLhGlZbDx5m"
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: newScores,
    };

    try {
      await fetch(
        "https://api.jsonbin.io/v3/b/626b05ce38be296761f98e18",
        requestOptions
      );
    } catch (e) {
      console.log(e);
    }
  }

  private async updateWorldScore(score: number) {
    if (score > this.worldScores.record.gold.score) {
      this.worldScores.record.bronze.score =
        this.worldScores.record.silver.score;
      this.worldScores.record.silver.score = this.worldScores.record.gold.score;
      this.worldScores.record.gold.score = score;

      this.worldScores.record.bronze.country =
        this.worldScores.record.silver.country;
      this.worldScores.record.silver.country =
        this.worldScores.record.gold.country;
      const flag = await getCountryCode();
      this.worldScores.record.gold.country = flag;
    } else if (
      score > this.worldScores.record.silver.score &&
      score < this.worldScores.record.gold.score
    ) {
      this.worldScores.record.bronze.score =
        this.worldScores.record.silver.score;
      this.worldScores.record.silver.score = score;

      this.worldScores.record.bronze.country =
        this.worldScores.record.silver.country;
      const flag = await getCountryCode();
      this.worldScores.record.silver.country = flag;
    } else if (
      score > this.worldScores.record.bronze.score &&
      score < this.worldScores.record.silver.score
    ) {
      this.worldScores.record.bronze.score = score;
      const flag = await getCountryCode();
      this.worldScores.record.bronze.country = flag;
    } else return;

    const newWorldScores = JSON.stringify(this.worldScores);
    localStorage.setItem("worldScores", newWorldScores);
    this.worldScoresGraph.setGoldData(this.worldScores.record.gold);
    this.worldScoresGraph.setSilverData(this.worldScores.record.silver);
    this.worldScoresGraph.setBronzeData(this.worldScores.record.bronze);

    this.putWorldScores(JSON.stringify(this.worldScores.record));
  }

  private async updateMyScore(score: number) {
    if (score > this.myScores.record.gold.score) {
      this.myScores.record.bronze.score = this.myScores.record.silver.score;
      this.myScores.record.silver.score = this.myScores.record.gold.score;
      this.myScores.record.gold.score = score;

      this.myScores.record.bronze.country = this.myScores.record.silver.country;
      this.myScores.record.silver.country = this.myScores.record.gold.country;
      const flag = await getCountryCode();
      this.myScores.record.gold.country = flag;
    } else if (
      score > this.myScores.record.silver.score &&
      score < this.myScores.record.gold.score
    ) {
      this.myScores.record.bronze.score = this.myScores.record.silver.score;
      this.myScores.record.silver.score = score;

      this.myScores.record.bronze.country = this.myScores.record.silver.country;
      const flag = await getCountryCode();
      this.myScores.record.silver.country = flag;
    } else if (
      score > this.myScores.record.bronze.score &&
      score < this.myScores.record.silver.score
    ) {
      this.myScores.record.bronze.score = score;
      const flag = await getCountryCode();
      this.myScores.record.bronze.country = flag;
    } else return;

    localStorage.setItem("personalScores", JSON.stringify(this.myScores));
    this.myScoresGraph.setGoldData(this.myScores.record.gold);
    this.myScoresGraph.setSilverData(this.myScores.record.silver);
    this.myScoresGraph.setBronzeData(this.myScores.record.bronze);
  }

  public async setCurrentScore(score: number, intermediate: boolean = true) {
    this.currentScore = score;
    if (intermediate) return;

    await getWorldScores();
    this.loadWorldScores();
    await this.updateMyScore(score);
    await this.updateWorldScore(score);
  }

  public getCurrentScore() {
    return this.currentScore;
  }

  public getMyScoresGraph(): GraphData {
    return this.myScoresGraph;
  }

  public getWorldScoresGraph(): GraphData {
    return this.worldScoresGraph;
  }

  public static getInstance() {
    if (!Score.instance) {
      Score.instance = new Score();
    }
    return Score.instance;
  }
}
