export class Bytes {
  private byteList: string[] = [];
  private index: number = 0;

  public constructor(byteList: string[], index: number) {
    this.byteList = byteList;
    this.index = index;
  }

  public getNextWord(): string {
    return this.byteList[++this.index];
  }
}
