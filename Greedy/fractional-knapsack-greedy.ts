interface Item {
    weight: number;
    value: number;
}

function fractionalKnapsack(items: Item[], capacity: number): number {
    // Sort items by value-to-weight ratio in descending order
    // the firs step of greedy algorithm is to figure out what makes it the optimal solution
    // which is value/weight ratio
    items.sort((a, b) => b.value / b.weight - a.value / a.weight);

    let totalValue = 0;
    let remainingCapacity = capacity;

    // Iterate through the items, starting from the item with the highest value-to-weight ratio
    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            //can fit the whole item, then take the whole item
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            //can't fit the whole item, then take a fraction of the item
            const fraction = remainingCapacity / item.weight;
            totalValue += fraction * item.value;
            break;
        }
    }

    return totalValue;
}
