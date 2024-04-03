/**
 * Meereen is famous for its fighting pits where fighters fight each other to the death.

Initially, there are  fighters and each fighter has a strength value. The  fighters are divided into  teams, and each fighter belongs exactly one team. For each fight, the Great Masters of Meereen choose two teams,  and , that must fight each other to the death. The teams attack each other in alternating turns, with team  always launching the first attack. The fight ends when all the fighters on one of the teams are dead.

Assume each team always attacks optimally. Each attack is performed as follows:

The attacking team chooses a fighter from their team with strength .
The chosen fighter chooses at most  fighters from other team and kills all of them.
The Great Masters don't want to see their favorite fighters fall in battle, so they want to build their teams carefully and know who will win different team matchups. They want you to perform two type of queries:

1 p x Add a new fighter with strength  to team . It is guaranteed that this new fighter's strength value will not be less than any current member of team .
2 x y Print the name of the team that would win a matchup between teams  and  in their current state (recall that team  always starts first). It is guaranteed that .
Given the initial configuration of the teams and  queries, perform each query so the Great Masters can plan the next fight.

Note: You are determining the team that would be the winner if the two teams fought. No fighters are actually dying in these matchups so, once added to a team, a fighter is available for all future potential matchups.
 * @param k : number of teams
 * @param fighters : array of fighters, each fighter is an array of 2 elements, first element is the strength of the fighter, second element is the team number
 * @param queries : array of queries, each query is an array of 3 elements, first element is the type of query, second element is the team number, third element is the strength of the fighter
 * @returns 
 */
function fightingPits(k: number, fighters: number[][], queries: number[][]): number[] {
	//Complexity Analysis:
	//Time complexity: O(n log(n)) where n is the number of fighters - 3 loops, plus we need to sort the fighters by strength
	//Space complexity: O(n * 3) where n is the number of fighters - 3 maps are used to keep track of the strength of the teams, the strength of the team fighters, and the strength of the team fighters in ascending order


	//Analysis: 
	//1. We need to keep track of the strength of the teams
	//2. We need to keep track of the strength of the team fighters
	//3. We need to keep track of the strength of the team fighters in ascending order
	//4. We need to keep track of the strength of the team fighters in ascending order, but accumulated
	//Using these maps, we can track the progress for query type 1. For query type 2, we can perform the actual fight to get the result


	let teamMap = new Map<number, number[]>(),
		strMap = new Map<number, number>,
		teamStrMap = new Map<number, number[]>()
	fighters.forEach(x => {
		//x[0] is the strength of the fighter, x[1] is the team number
		teamMap.set(x[1], teamMap.get(x[1]) || []);
		teamMap.get(x[1])!.push(x[0]); //push the strength of the fighter to the team
		strMap.set(x[1], (strMap.get(x[1]) || 0) + x[0]); //sum the strength of the team by adding the strength of the fighter

		//just init the teamStrMap with empty array
		if (!teamStrMap.has(x[1]))
			teamStrMap.set(x[1], []);
	});

	//sort the teamMap and calculate the sum of the strength of the team
	let winners: number[] = [];
	for (let s of teamMap) {
		//s[0] is the team number, s[1] is the array of the strength of the team fighters
		//sort the strength of the team, the the team fighters
		s[1].sort((a, b) => a - b);
		let strForTeam = teamStrMap.get(s[0]), accumulatedStr = 0;;

		//accumulate the strength of the team fighters
		s[1].forEach(x => {
			accumulatedStr += x;
			strForTeam!.push(accumulatedStr);
		})
	}

	queries.forEach(([queryType, strOfFighter, team]) => {
		if (queryType === 1) {
			//query type 1 is to to add a new fighter with strength q3 to team q2
			let h = teamMap.get(team);
			if (!h) {
				teamMap.set(team, [strOfFighter]);
				strMap.set(team, strOfFighter);
				teamStrMap.set(team, [strOfFighter]);
				return;
			}
			if (h[h.length - 1] <= strOfFighter) {
				h.push(strOfFighter);
				strMap.set(team, strMap.get(team)! + strOfFighter);
				teamStrMap.get(team)!.push(strMap.get(team)!);
			}
		}
		else if (queryType === 2) {
			//query type 2 is to get the team that would win a matchup between teams q2 and q3 in their current state
			if (strMap.get(strOfFighter)! >= strMap.get(team)!) {
				//if the strength of the fighter is greater than the strength of the team, then the fighter will win
				return winners.push(strOfFighter);
			}

			//if not, we perform the actual fight to get result
			const fightResult = fight(teamMap.get(strOfFighter)!, teamMap.get(team)!,
				strOfFighter, team,
				strMap.get(strOfFighter)!, strMap.get(team)!,
				teamMap.get(strOfFighter)!.length, teamMap.get(team)!.length,
				teamStrMap.get(strOfFighter)!, teamStrMap.get(team)!);

			winners.push(
				fightResult)
		}
	})
	return winners;
}

function fight(attackers: number[], defenders: number[],
	attackerTeam: number, defenderTeam: number,
	attackerStr: number, defenderStr: number,
	attackersSize: number, defendersSize: number,
	attackersStrs: number[], defendersStrs: number[]) {

	//the actual fight has to be exhaustively carried out.
	//it is sorta like dp, except we are not building a table, just updating the values

	let attacking = true;
	while (true) {
		if (attacking) {
			attacking = false;

.			//if the strength of the attacker is greater than or equals to the strength of the defender, then the attacker will win
			if (attackerStr >= defenderStr)
				return attackerTeam;

			//if run out of attackers at this round, defender will win
			if (attackersSize <= 0) {
				return defenderTeam;
			}

			//if run out of defenders at this round, attacker will win
			if (defendersSize <= 0) {
				return attackerTeam;
			}

			//if neither is the case, then we reduce defender size and strength
			let fighter = attackers[attackersSize - 1];
			defendersSize -= fighter;
			defenderStr = defendersStrs[defendersSize - 1] || -1;
		} else {
			//if the strength of the defender is greater than or equals to the strength of the attacker, then the defender will win
			if (attackerStr <= defenderStr)
				return defenderTeam;
			//flip the attacking flag, only after making sure defender didn't win yet
			attacking = true

			//if run out of defenders at this round, attacker will win
			if (defendersSize <= 0) {
				return attackerTeam;
			}

			//if run out of attackers at this round, defender will win
			if (attackersSize <= 0) {
				return defenderTeam;
			}

			//if neither is the case, then we reduce attacker size and strength, since defender is doing the attack in this round
			let fighter = defenders[defendersSize - 1];
			attackersSize -= fighter;
			attackerStr = attackersStrs[attackersSize - 1] || - 1;
		}
	}

}