class HuffmanNode {
    value: string;
    frequency: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;

    constructor(value: string, frequency: number) {
        this.value = value;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}



function decodeHuffmanString(encodedData: string): string {
    function buildHuffmanEncodingTree(encodedData: string): HuffmanNode {
        //the sequence is almost identical to the encoding
        //except we sort the stack last for each turn

        // Count the frequency of each character in the encoded data
        const frequencyMap: Map<string, number> = new Map();
        for (const char of encodedData) {
            if (!frequencyMap.has(char)) {
                frequencyMap.set(char, 1);
            } else {
                frequencyMap.set(char, frequencyMap.get(char)! + 1);
            }
        }

        // Create a stack of Huffman nodes based on their frequencies
        const stack: HuffmanNode[] = [];

        for (const [char, frequency] of frequencyMap.entries()) {
            const node = new HuffmanNode(char, frequency);
            stack.push(node);
        }

        //sort before start looping
        stack.sort((a, b) => a.frequency - b.frequency);

        // Build the Huffman tree by merging nodes with the lowest frequencies
        while (stack.length > 1) {
            const leftNode = stack.shift();
            const rightNode = stack.shift();
            const mergedNode = new HuffmanNode('',
                (leftNode?.frequency || 0) + (rightNode?.frequency || 0));

            mergedNode.left = leftNode as HuffmanNode;
            mergedNode.right = rightNode as HuffmanNode;

            stack.push(mergedNode);

            //unlike encoding, we sort the stack last for each turn
            stack.sort((a, b) => a.frequency - b.frequency);
        }

        // Return the root of the Huffman tree
        return stack[0];
    }

    const root = buildHuffmanEncodingTree(encodedData);
    let currentNode = root;
    let decodedString = '';

    for (const bit of encodedData) {
        if (bit === '0') {
            currentNode = currentNode.left!;
        } else if (bit === '1') {
            currentNode = currentNode.right!;
        }

        if (!currentNode.left && !currentNode.right) {
            decodedString += currentNode.value;
            currentNode = root;
        }
    }

    return decodedString;
}

