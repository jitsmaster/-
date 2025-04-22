// Encode and Decode Strings
// Solved 
// Design an algorithm to encode a list of strings to a single string. The encoded string is then decoded back to the original list of strings.

// Please implement encode and decode

// Example 1:

// Input: ["neet","code","love","you"]

// Output:["neet","code","love","you"]
// Example 2:

// Input: ["we","say",":","yes"]

// Output: ["we","say",":","yes"]
// Constraints:

// 0 <= strs.length < 100
// 0 <= strs[i].length < 200
// strs[i] contains only UTF-8 characters.

function encode(strs: string[]) {
    //Time: O(n) - iterate through the strs once
    //Space: O(1) - constant space
    let output = ""
    for (const str of strs) {
        const len = str.length
        const eStr = `${len}#${str}`
        output += eStr
    }

    return output;
}


function decode(str: string) {
    const res = [] as string[]

    let i = 0;
    while(i < str.length) {
        let j = i;
        while(str[j] !== "#")
            j++;

        const len = parseInt(str.substring(i, j), 10)
        i = j + 1; //skip # characters
        j = i + len; //ending of the string

        res.push(str.substring(i, j));

        i = j; //fast forward post current string entry
    }

    return res;
}