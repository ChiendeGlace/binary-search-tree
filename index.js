const nodeFactory = (data, left = null, right = null) => {
    return { data, left, right };
};

const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
};

const merge = (leftSide, rightSide) => {
    let output = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < leftSide.length && rightIndex < rightSide.length) {
        if (leftSide[leftIndex] < rightSide[rightIndex]) {
            output.push(leftSide[leftIndex]);
            leftIndex++;
        } else {
            output.push(rightSide[rightIndex]);
            rightIndex++;
        }
    }
    return [
        ...output,
        ...leftSide.slice(leftIndex),
        ...rightSide.slice(rightIndex),
    ];
};

const mergeSort = (arr) => {
    if (arr.length == 0) {
        return 'Empty array or no array.';
    }
    if (arr.length == 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let leftSide = arr.slice(0, mid);
    let rightSide = arr.slice(mid, arr.length);
    return merge(mergeSort(leftSide), mergeSort(rightSide));
};

const treeFactory = (array) => {
    root = null;
    const sorted = mergeSort(array);
    const sortedUnique = removeDuplicates(sorted);
    const buildTree = (array, start = 0, end) => {
        if (start > end) {
            return null;
        }
        let mid = parseInt((start + end) / 2);
        let node = nodeFactory(array[mid]);
        if (root == null) {
            root = node;
        }
        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end);
        return node;
    };

    const insert = (data, treeRoot = root) => {
        if (treeRoot == null) {
            treeRoot = nodeFactory(data);
            return treeRoot;
        }
        if (data > treeRoot.data) {
            treeRoot.right = insert(data, treeRoot.right);
        } else if (data < treeRoot.data) {
            treeRoot.left = insert(data, treeRoot.left);
        } else {
            return null;
        }
        return treeRoot;
    };

    const deleteNode = (data, treeRoot = root) => {
        if (treeRoot == null) {
            return null;
        }
        if (treeRoot.data == data) {
            if (treeRoot.left == null && treeRoot.right == null) {
                treeRoot = null;
                return treeRoot;
            }
            if (treeRoot.left == null || treeRoot.right == null) {
                if (treeRoot.left == null) {
                    treeRoot = treeRoot.right;
                    return treeRoot;
                } else {
                    treeRoot = treeRoot.left;
                    return treeRoot;
                }
            }
            let rightSide = treeRoot.right;
            while (rightSide.left) {
                rightSide = rightSide.left;
            }
            treeRoot.data = rightSide.data;
            treeRoot.right = deleteNode(rightSide.data, treeRoot.right);
            return treeRoot;
        } else {
            if (data > treeRoot.data) {
                treeRoot.right = deleteNode(data, treeRoot.right);
            } else if (data < treeRoot.data) {
                treeRoot.left = deleteNode(data, treeRoot.left);
            }
        }
        return treeRoot;
    };

    const findNode = (data, treeRoot = root) => {
        if (treeRoot == null) {
            return 'Tree is empty or wrong value';
        }
        if (data == treeRoot.data) {
            return treeRoot;
        }
        if (data > treeRoot.data) {
            treeRoot.right = findNode(data, treeRoot.right);
            return treeRoot.right;
        }
        if (data < treeRoot.data) {
            treeRoot.left = findNode(data, treeRoot.left);
            return treeRoot.left;
        }
    };

    const levelOrder = () => {
        const arr = [];
        const queue = [];
        queue.push(root);
        while (queue.length > 0) {
            arr.push(queue[0].data);
            if (queue[0].left !== null) {
                queue.push(queue[0].left);
            }
            if (queue[0].right !== null) {
                queue.push(queue[0].right);
            }
            queue.shift();
        }
        return arr;
    };

    const levelOrderRecursive = (arr = [], queue = [], treeRoot = root) => {
        if (treeRoot == null) return;

        arr.push(treeRoot.data);

        queue.push(treeRoot.left);
        queue.push(treeRoot.right);

        while (queue.length > 0) {
            const newRoot = queue[0];
            queue.shift();
            levelOrderRecursive(arr, queue, newRoot);
        }
        return arr;
    };

    const preorder = (treeRoot = root, arr = []) => {
        if (treeRoot == null) return;
        arr.push(treeRoot.data);
        if (treeRoot.left !== null) {
            preorder(treeRoot.left, arr);
        }
        if (treeRoot.right !== null) {
            preorder(treeRoot.right, arr);
        }
        return arr;
    };
    const inorder = (treeRoot = root, arr = []) => {
        if (treeRoot == null) return;
        if (treeRoot.left !== null) {
            inorder(treeRoot.left, arr);
        }
        arr.push(treeRoot.data);
        if (treeRoot.right !== null) {
            inorder(treeRoot.right, arr);
        }
        return arr;
    };
    const postorder = (treeRoot = root, arr = []) => {
        if (treeRoot == null) return;
        if (treeRoot.left !== null) {
            postorder(treeRoot.left, arr);
        }

        if (treeRoot.right !== null) {
            postorder(treeRoot.right, arr);
        }
        arr.push(treeRoot.data);
        return arr;
    };

    const findHeight = (treeRoot = root) => {
        if (treeRoot == null) return -1;
        const leftHeight = findHeight(treeRoot.left);
        const rightHeight = findHeight(treeRoot.right);
        return Math.max(leftHeight, rightHeight) + 1;
    };

    const findDepth = (data, treeRoot = root, count = 0) => {
        if (treeRoot == null) {
            return 'Tree is empty or wrong value';
        }
        if (data == treeRoot.data) {
            return count;
        }
        if (data > treeRoot.data) {
            return findDepth(data, treeRoot.right, count + 1);
        }
        if (data < treeRoot.data) {
            return findDepth(data, treeRoot.left, count + 1);
        }
    };
    const isBalanced = () => {
        let leftHeight = findHeight(root.left);
        let rightHeight = findHeight(root.right);
        if (Math.abs(leftHeight - rightHeight) <= 1) {
            return true;
        }
        return false;
    };

    root = buildTree(sortedUnique, 0, sortedUnique.length - 1);

    const rebalance = () => {
        let newArr = inorder();
        const newSortedArr = mergeSort(newArr);
        const newSortedUnique = removeDuplicates(newSortedArr);
        root = buildTree(newSortedUnique, 0, newSortedUnique.length - 1);
    };

    const display = (treeRoot = root) => {
        return root;
    };

    return {
        root,
        insert,
        deleteNode,
        findNode,
        levelOrder,
        levelOrderRecursive,
        preorder,
        inorder,
        postorder,
        findHeight,
        findDepth,
        isBalanced,
        rebalance,
        display,
    };
};

const newBinaryTree = treeFactory([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

newBinaryTree.insert(50);
newBinaryTree.insert(320);
console.log(newBinaryTree.isBalanced());
console.log(newBinaryTree.levelOrder());
console.log(newBinaryTree.preorder());
console.log(newBinaryTree.inorder());
console.log(newBinaryTree.postorder());

newBinaryTree.insert(659);
newBinaryTree.insert(3476);
newBinaryTree.insert(565);
newBinaryTree.insert(9090);
newBinaryTree.insert(11092);
newBinaryTree.insert(201);
console.log(newBinaryTree.isBalanced());
console.log(newBinaryTree.display());
newBinaryTree.rebalance();
console.log(newBinaryTree.display());
console.log(newBinaryTree.isBalanced());
console.log(newBinaryTree.levelOrder());
console.log(newBinaryTree.preorder());
console.log(newBinaryTree.inorder());
console.log(newBinaryTree.postorder());
console.log(newBinaryTree.findNode(67));

