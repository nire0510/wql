import limit from '../../src/modules/main/limiter';

describe('Limiter', () => {
  test('should return the same number of elements if limit is not specified', async () => {
    const array = limit([{ a: 'a' }, { b: 'b' }]);

    expect(array.length).toBe(2);
  });

  test('should return the same number of elements if limit equals to 0', async () => {
    const array = limit([{ a: 'a' }, { b: 'b' }], 0);

    expect(array.length).toBe(2);
  });

  test('should return the array with the number of elements specified in limit', async () => {
    const array = limit([{ a: 'a' }, { b: 'b' }], 1);

    expect(array.length).toBe(1);
  });
});

