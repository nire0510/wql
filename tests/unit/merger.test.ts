import distinct from '../../src/modules/main/merger';

describe('Merger', () => {
  test('should return the same number of elements merger is not applied', async () => {
    const array1 = distinct([{ a: 'a' }, { a: 'a' }]);
    const array2 = distinct([{ a: 'a' }, { a: 'a' }], false);

    expect(array1.length).toBe(2);
    expect(array2.length).toBe(2);
  });

  test('should return the the array with only unique values in it', async () => {
    const arrayWithDuplications = distinct([{ a: 'a' }, { a: 'a' }], true);
    const arrayWithoutDuplications = distinct([{ a: 'a' }, { b: 'b' }], true);

    expect(arrayWithDuplications.length).toBe(1);
    expect(arrayWithoutDuplications.length).toBe(2);
  });
});

