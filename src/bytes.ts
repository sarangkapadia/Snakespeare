import { byteList } from "./byteList";

export class Bytes {
  private byteList: string[] = [];
  private index: number = 0;

  public shuffle(array: string[]) {
    console.log("this should be called only once");
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
  }

  public getNextWord(): string {
    const nextWord = this.byteList[this.index];
    this.index = (this.index + 1) % this.byteList.length;
    localStorage.setItem("byteIndex", JSON.stringify(this.index));
    return nextWord;
  }
}
