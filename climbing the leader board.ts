function climbingLeaderboard(ranked: number[], player: number[]): number[] {
    
    //rank is unique value
    //so distinct first
    const set = new Set<number>(ranked);
    let counter = 1;
    const map = new Map<number, number>();
    
    set.forEach((v, k, s) => {
        map.set(v, counter);
        counter++;
    })

    //binary search approach
    function getRank(score: number) {
        if (score < ranked[ranked.length - 1]) 
            return map.get(ranked[ranked.length - 1]) as number + 1;
    
        if (score > ranked[0])
            return 1;

        let left = 1;
        let right = ranked.length;
        let mid = 0;
        let rank = 0;
        
        while (left <= right) {
            //find the mid point, and compare the score with the mid point
            mid = Math.floor((left + right) / 2);
            if (ranked[mid - 1] === score) {
                rank = map.get(score) as number;
                break;
            } else if (ranked[mid - 1] < score) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        if (rank === 0) {
            console.info(`left: ${left}, right: ${right}, mid: ${mid}`);
            console.info(`ranked[mid - 1]: ${ranked[mid - 1]}, score: ${score}`);

            if (ranked[mid - 1] > score) {
                //if the score is less than the current ranked score, then the rank is the current rank + 1
                rank = map.get(ranked[mid - 1]) as number + 1;
            } else {
                //if the score is greater than the current ranked score, then the rank is the current rank
                rank = map.get(ranked[mid - 1]) as number;
            }
        }
        
        return rank;
    }

    return player.map(s => getRank(s));
}