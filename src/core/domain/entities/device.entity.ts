// src/domain/entity/device.entity.ts
export class DeviceEntity {
  constructor(
    public readonly id: number,
    public categoryId: number,
    public color: string,
    public partNumber: number,
  ) {
    if (!color.match(/^[A-Za-z]{1,16}$/)) throw new Error('Invalid color');
    if (partNumber <= 0) throw new Error('Part number must be positive');
  }
}
