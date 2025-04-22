export class DeviceEntity {
  public get categoryId(): number {
    return this._categoryId;
  }
  public set categoryId(value: number) {
    this._categoryId = value;
  }
  constructor(
    public readonly id: number,
    private _categoryId: number,
    public color: string,
    public partNumber: number,
  ) {
    if (!color.match(/^[A-Za-z]{1,16}$/))
      throw new Error(`${color} is not valid`);
    if (partNumber <= 0 || partNumber > 2147483647) {
      throw new Error(
        'Part number must be a positive integer up to 2,147,483,647',
      );
    }
  }
}
