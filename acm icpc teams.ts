// This function takes an array of strings representing topics and returns an array with two values:
// the maximum number of topics a team can know and the number of teams that can know that maximum number of topics.
export function acmTeam(topic: string[]): number[] {
    const numTopics = topic[0].length; // Get the number of topics by checking the length of the first string in the array
    let maxTeams = 0; // Variable to store the maximum number of topics a team can know
    let numMaxTeams = 0; // Variable to store the number of teams that can know the maximum number of topics

    // Iterate through all possible pairs of team members
    for (let i = 0; i < topic.length - 1; i++) {
        for (let j = i + 1; j < topic.length; j++) {

            //bigint binary string must start with 0b
            const teamTopics = (BigInt('0b' + topic[i]) | BigInt('0b' + topic[j])).toString(2)
                .replace(/0/g, '').length; //remove all 0s and count the length of the string, which is the number of topics the team knows

            // Update the maximum number of topics and the number of teams accordingly
            if (teamTopics > maxTeams) {
                maxTeams = teamTopics;
                numMaxTeams = 1;
            } else if (teamTopics === maxTeams) {
                numMaxTeams++;
            }
        }
    }

    // Return the maximum number of topics and the number of teams that can know that maximum number of topics
    return [maxTeams, numMaxTeams];
}