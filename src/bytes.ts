import { byteList, byteList7 } from "./byteList";

export class Bytes {
  private byteList: string[] = [];
  private byteList7: string[] = [];

  private index: number = 0;
  private index7: number = 0;

  public shuffle(array: string[]) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  public constructor() {
    const storageByteList = localStorage.getItem("byteList");
    if (storageByteList) {
      this.byteList = JSON.parse(storageByteList);
    } else {
      this.byteList = this.shuffle(byteList);
      localStorage.setItem("byteList", JSON.stringify(this.byteList));
    }

    const storageIndex = localStorage.getItem("byteIndex");
    if (storageIndex) {
      this.index = JSON.parse(storageIndex);
    } else {
      this.index = 0;
      localStorage.setItem("byteIndex", JSON.stringify(this.index));
    }

    // for 7
    const storageByteList7 = localStorage.getItem("byteList7noS");
    if (storageByteList7) {
      this.byteList7 = JSON.parse(storageByteList7);
    } else {
      this.byteList7 = this.shuffle(byteList7);
      localStorage.setItem("byteList7noS", JSON.stringify(this.byteList7));
    }

    if (localStorage.getItem("byteList7")) {
      localStorage.removeItem("byteList7");
    }

    const storageIndex7 = localStorage.getItem("byteIndex7");
    if (storageIndex7) {
      this.index7 = JSON.parse(storageIndex7);
    } else {
      this.index7 = 0;
      localStorage.setItem("byteIndex7", JSON.stringify(this.index7));
    }
  }

  public getNextWord(): string {
    const nextWord = this.byteList[this.index];
    this.index = (this.index + 1) % this.byteList.length;
    localStorage.setItem("byteIndex", JSON.stringify(this.index));
    return nextWord;
  }

  public getNextWord7(): string {
    const nextWord = this.byteList7[this.index7];
    this.index7 = (this.index7 + 1) % this.byteList7.length;
    localStorage.setItem("byteIndex7", JSON.stringify(this.index7));
    return nextWord;
  }
}
