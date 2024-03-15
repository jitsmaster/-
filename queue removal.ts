/**
 * Queue Removals
 * You're given a list of n integers arr, which represent elements in a queue (in order from front to back). 
 * 
 * You're also given an integer x, and must perform x iterations of the following 3-step process:
 * Pop x elements from the front of queue (or, if it contains fewer than x elements, pop all of them)
 * Of the elements that were popped, find the one with the largest value (if there are multiple such elements,
 * take the one which had been popped the earliest), and remove it
 * 
 * For each one of the remaining elements that were popped (in the order they had been popped), 
 * decrement its value by 1 if it's positive (otherwise, if its value is 0, then it's left unchanged), 
 * and then add it back to the queue 
 * 
 * Compute a list of x integers output, the ith of which is the 1-based index in the original array of the element which had been removed in step 2 during the ith iteration.
 */
function findPositions(arr: number[], x: number): number[] {
    const output: number[] = [];
    const arrWithOrigState = arr
        .map((item, i) => {
            return {
                value: item,
                origIndex: i //store original index here
            };
        })

    for (let i = 0; i < x; i++) {
        const poppedElements = arrWithOrigState.slice(0, Math.min(x, arrWithOrigState.length));
        const maxElement = Math.max(...poppedElements.map(item => item.value));

        //the index has to be the original index, not the index of the changed array
        const maxElementIndex = arrWithOrigState.find(item => item.value === maxElement)!.origIndex;
        // const maxElementIndex = origArr.indexOf(maxElement);

        arrWithOrigState.splice(0, Math.min(x, arrWithOrigState.length));

        let removed = false;

        for (let j = 0; j < poppedElements.length; j++) {
            //only push the remaing elements to the end of the queue
            if (poppedElements[j].value === maxElement && !removed) {
                removed = true;
                continue;
            }
            if (poppedElements[j].value > 0) {
                poppedElements[j].value--;
            }
            arrWithOrigState.push(poppedElements[j]);
        }
        
        // console.log(poppedElements.join("-"), maxElement, maxElementIndex, arrWithOrigState
        //     .map(i => i.value).join("-"));

        output.push(maxElementIndex + 1);
    }

    return output;
}
