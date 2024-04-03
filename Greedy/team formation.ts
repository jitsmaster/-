/**
 * Divide the array into teams, while each team's members are increment of another member by 1
 * Find the largest smallest team size
 * Which means when allocating team members, smallest team should have priority
 * @param arr 
 */
export function teamFormation(arr: number[]) {
	arr.sort((a, b) => a - b); // Sort the array in ascending order
	let minTeamSize = Infinity; // Min team size
	if (arr.length === 0)
		// return [0, "[]"];
		return 0;

	//another edge case, only one candidate and his value is 0, so the team will be [0]
	if (arr.length === 1 && arr[0] === 0)
		// return [0, "[0]"];
		return 0;


	let teamsWithCount: { lastItem: number, count: number }[] = [{ lastItem: arr[0], count: 1 }]

	for (let i = 1; i < arr.length; i++) {
		//locate the team that with last item matching the current array item
		const prevTeams = teamsWithCount.filter((t) => t.lastItem === arr[i] - 1);
		if (prevTeams.length > 0) {
			prevTeams.sort((a, b) => a.count - b.count);
			prevTeams[0].lastItem = arr[i];
			prevTeams[0].count++;
		} else {
			teamsWithCount.unshift({ lastItem: arr[i], count: 1 });
		}
	}

	//we will have 

	// console.info(`Teams: ${teams.map(t => `[${t.join(", ")}]`).join(" ")}`)

	return Math.min(...teamsWithCount.map(t => t.count));
	// return [Math.min(...teams.map(t => t.length)), teams.map(t => `[${t.join(", ")}]`).join(" ")];
}