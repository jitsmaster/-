function bonAppetit(bill: number[], k: number, b: number): string {
	//get bill total
	const total = bill.reduce((acc, cur) => acc + cur, 0);

	const totalWithoutAnna = total - bill[k];

	const annaShareOwe = totalWithoutAnna / 2;

	const ownAnna = b - annaShareOwe;

	if (ownAnna == 0) {
		return "Bon Appetit";
	}
	else
		return ownAnna + "";

}