// Class that represents a node in the Huffman tree
// It's a binary tree node with a character value, frequency
class HuffmanNode {
    //character value
    public character: string;
    //number of times the character appears in the text
    public frequency: number;
    //left child of the node
    public left: HuffmanNode | null;
    //right child of the node
    public right: HuffmanNode | null;

    constructor(character: string, frequency: number, left: HuffmanNode | null = null, right: HuffmanNode | null = null) {
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
    }
}


// Compress a string using Huffman coding
function compressString(text: string): string {
    /**
 * Building the Huffman tree from the input text
 * @param text 
 * @returns 
 */
    function buildHuffmanEncodingTree(text: string): HuffmanNode | null {
        // Create a frequency map to store the frequency of each character in the text
        const frequencyMap: Map<string, number> = new Map();

        // Accumulate the frequency of each character
        for (const char of text) {
            if (!frequencyMap.has(char)) {
                frequencyMap.set(char, 1);
            } else {
                frequencyMap.set(char, frequencyMap.get(char)! + 1);
            }
        }

        // Create a stack to store the Huffman nodes
        const stack: HuffmanNode[] = [];

        // Create a leaf node for each character and add it to the stack
        for (const [char, frequency] of frequencyMap.entries()) {
            stack.push(new HuffmanNode(char, frequency));
        }

        // Build the Huffman tree by repeatedly combining the two nodes with the lowest frequency
        while (stack.length > 1) {
            // Sort the stack based on the frequency of the nodes first
            // for each turn. This is for encoding
            // for decoding, we sort the stack last for each turn
            stack.sort((a, b) => a.frequency - b.frequency);

            // Take the two nodes with the lowest frequency
            const leftNode = stack.shift();
            const rightNode = stack.shift();

            // Create a new node with the combined frequency and the two nodes as children
            // note, if the right code is null, the frequency will be 0
            const combinedNode = new HuffmanNode('',
                (leftNode?.frequency) || 0 + (rightNode?.frequency || 0), leftNode, rightNode);

            // Add the combined node back to the stack
            stack.push(combinedNode);
        }

        // Return the root of the Huffman tree
        return stack[0] || null;
    }

    // Using huffman tree to generate a map of characters and their huffman codes
    function generateHuffmanCodes(root: HuffmanNode | null, currentCode: string, huffmanCodes: Map<string, string>) {
        if (root === null) {
            return;
        }

        // If the node is a leaf node, assign the current code to the character
        if (!root.left && !root.right) {
            huffmanCodes.set(root.character, currentCode);
            return;
        }

        // Recursively traverse the left and right subtrees
        // left side of the tree will have the current code plus 0
        // right side of the tree will have the current code plus 1
        // most important part of huffman coding
        generateHuffmanCodes(root.left, currentCode + '0', huffmanCodes);
        generateHuffmanCodes(root.right, currentCode + '1', huffmanCodes);
    }
    
    // Build the Huffman tree
    const huffmanTree = buildHuffmanEncodingTree(text);

    // Generate the Huffman codes for each character
    const huffmanCodes: Map<string, string> = new Map();
    generateHuffmanCodes(huffmanTree, '', huffmanCodes);

    // Compress the string using the Huffman codes
    let compressedString = '';

    for (const char of text) {
        compressedString += huffmanCodes.get(char)!;
    }

    return compressedString;
}
