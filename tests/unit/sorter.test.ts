import Order from '../../src/models/order';
import order from '../../src/modules/main/sorter';

describe('Sorter', () => {
  test('should return the array with no change in elements order if order is not required', async () => {
    const array1 = order([{ a: 3, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 1 }, { a: 1, b: 6 }]);
    const array2 = order([{ a: 3, b: 4 }, { a: 1, b: 5 }, { a: 2, b: 1 }, { a: 1, b: 6 }], []);

    [array1, array2].forEach((array) => {
      expect(array.length).toBe(4);
      expect(array[0].a).toBe(3);
      expect(array[1].a).toBe(1);
      expect(array[2].a).toBe(2);
      expect(array[3].a).toBe(1);
    });
  });

  test('should return the array ascendingly ordered by a single property', async () => {
    const array1 = order([{ a: 3, b: 4 }, { a: 1, b: 6 }, { a: 2, b: 1 }, { a: 1, b: 5 }], [{ name: 'a' } as Order]);
    const array2 = order([{ a: 3, b: 4 }, { a: 1, b: 6 }, { a: 2, b: 1 }, { a: 1, b: 5 }], [{ name: 'a', direction: 'asc' } as Order]);
    const array3 = order([{ a: 3, b: 4 }, { a: 1, b: 6 }, { a: 2, b: 1 }, { a: 1, b: 5 }], [{ name: 'a', direction: 'ASC' } as Order]);

    [array1, array2, array3].forEach((array) => {
      expect(array.length).toBe(4);
      expect(array[0].a).toBe(1);
      expect(array[0].b).toBe(6);
      expect(array[1].a).toBe(1);
      expect(array[1].b).toBe(5);
      expect(array[2].a).toBe(2);
      expect(array[3].a).toBe(3);
    });
  });

  test('should return the array descendingly ordered by a single property', async () => {
    const array = order([{ a: 3, b: 4 }, { a: 1, b: 6 }, { a: 2, b: 1 }, { a: 1, b: 5 }], [{ name: 'a', direction: 'desc' } as Order]);

    expect(array.length).toBe(4);
    expect(array[0].a).toBe(3);
    expect(array[1].a).toBe(2);
    expect(array[2].a).toBe(1);
    expect(array[3].a).toBe(1);
  });

  test('should return the array ascendingly ordered by two properties', async () => {
    const array = order([{ a: 3, b: 4 }, { a: 1, b: 6 }, { a: 2, b: 1 }, { a: 1, b: 5 }],
      [{ name: 'a', direction: 'asc' } as Order, { name: 'b', direction: 'asc' } as Order]);

    expect(array.length).toBe(4);
    expect(array[0].a).toBe(1);
    expect(array[0].b).toBe(5);
    expect(array[1].a).toBe(1);
    expect(array[1].b).toBe(6);
    expect(array[2].a).toBe(2);
    expect(array[3].a).toBe(3);
  });
});

