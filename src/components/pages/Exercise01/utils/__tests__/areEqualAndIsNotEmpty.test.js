import areEqualAndIsNotEmpty from '../areEqualAndIsNotEmpty'

it('should return true if the arrays are equal and not empty', () => {
    const arr1 = [1, 2, 3]
    const arr2 = [1, 2, 3]
    const result = areEqualAndIsNotEmpty(arr1, arr2)
    expect(result).toBe(true)
})