import { DeviceEntity } from 'src/core/domain/entities/device.entity';

describe('DeviceEntity', () => {
  it('should create a valid device entity', () => {
    const device = new DeviceEntity(1, 1, 'Blue', 123);
    expect(device).toBeInstanceOf(DeviceEntity);
    expect(device.id).toBe(1);
    expect(device.categoryId).toBe(1);
    expect(device.color).toBe('Blue');
    expect(device.partNumber).toBe(123);
  });

  it('should throw an error if color has invalid characters', () => {
    expect(() => {
      new DeviceEntity(1, 1, 'Blue123', 123);
    }).toThrow('Invalid color');
  });

  it('should throw an error if color exceeds max length', () => {
    expect(() => {
      new DeviceEntity(1, 1, 'A'.repeat(17), 123);
    }).toThrow('Invalid color');
  });

  it('should throw an error if partNumber is not positive', () => {
    expect(() => {
      new DeviceEntity(1, 1, 'Green', 0);
    }).toThrow('Part number must be positive');
  });
});
