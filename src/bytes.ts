export class Bytes {
  private byteList: string[] = [];
  private index: number = 0;

  public constructor(byteList: string[], index?: number) {
    this.byteList = byteList;
    this.index = index ? index : 0;
  }

  public getNextWord(): string {
    const index = this.index + 1 < this.byteList.length ? this.index + 1 : 0;
    return this.byteList[index];
  }
}
