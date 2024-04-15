

const ar = [0, 5, 2, 9, -3, 5, 20, 10, -7, 2, 3, -4, 0, -2, 15, 5];


const o: ReversableOperator<number> = {
	firstItem: () => 0,
	merge: (a, b) => a + b,
	exclude: (c, b) => c - b,
};

const ft = new NumsArray(ar, o);

console.log("value at 3 =", ft.valueAt(3));
console.log("sum(1, 3) =", ft.queryRange(1, 3));

ft.update(2, 20);
console.log("sum(1, 3) =", ft.queryRange(1, 3));