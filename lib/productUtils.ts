// Returns a list of numbers starting from min, then all numbers greater than min and less than or equal to max that are divisible by 500
export function getQuantityList(minQuantity: number, inStock: number): number[] {
    const result: number[] = [minQuantity];
    let next = Math.ceil((minQuantity + 1) / 500) * 500;
    while (next <= inStock) {
        result.push(next);
        next += 500;
    }
    return result;
}
