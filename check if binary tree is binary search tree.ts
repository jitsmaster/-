import type { TreeNode } from "./Breadth-first-search";

function checkIfBinaryTreeIsBinarySearchTree(root: TreeNode | null): boolean {
    //simpler than it looks
    //in order traversal of BST is sorted
    //so we can do an in order traversal and check if the result is sorted

    const res: number[] = [];

    function inOrderTraversal(node:TreeNode | null) {
        if (!node)
            return;

        inOrderTraversal(node.left);
        res.push(node.value);
        inOrderTraversal(node.right);
    }

    inOrderTraversal(root);

    //check to make sure the result is sorted
    for (let i = 0; i < res.length - 1; i++) {
        if (res[i] > res[i + 1])
            return false;
    }

    return true;
}