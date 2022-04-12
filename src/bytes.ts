export class Bytes {
  private byteList: string[] = [];
  private index: number = 0;

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
  public constructor(byteList: string[], index?: number) {
    alert("this should be called only once");
    this.byteList = this.shuffle(byteList);
    this.index = index ? index : 0;
  }

  public getNextWord(): string {
    const nextWord = this.byteList[this.index];
    this.index = (this.index + 1) % this.byteList.length;
    return nextWord;
  }
}
