export class Category {
  constructor(
    public readonly id: number | undefined,
    public name: string,
  ) {
    if (!name || name.length > 128) {
      throw new Error('Invalid category name');
    }
  }
}
