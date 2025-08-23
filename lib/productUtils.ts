// Returns a list of numbers starting from min, then all numbers greater than min and less than or equal to max that are divisible by 500
export function getAvailableQuantities(minQuantity: number, inStock: number): number[] {
    const result: number[] = [];

    // Return empty array if product is out of stock or invalid quantities
    if (inStock <= 0 || minQuantity <= 0) {
        return result;
    }

    // Only add minQuantity to the list if it is greater than or equal to inStock
    if (inStock >= minQuantity) {
        result.push(minQuantity);
    }

    let next = Math.ceil((minQuantity + 1) / 500) * 500;
    while (next <= inStock) {
        result.push(next);
        next += 500;
    }
    return result;
}

// Helper function to check if quantity is valid for add to cart
export function isValidQuantityForCart(quantity: number, quantityList: number[]): boolean {
    return quantity > 0 && quantityList.length > 0 && quantityList.includes(quantity);
}
