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
    console.log(sortedUnique);
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

    const insert = (root, data) => {
        if (root == null) {
            root = nodeFactory(data);
            return root;
        }
        if (data > root.data) {
            root.right = insert(root.right, data);
        } else if (data < root.data) {
            root.left = insert(root.left, data);
        } else {
            return null;
        }
        return root;
    };

    const deleteNode = (root, data) => {
        if (root == null) {
            return null;
        }
        if (root.data == data) {
            if (root.left == null && root.right == null) {
                root = null;
                return root;
            }
            if (root.left == null || root.right == null) {
                if (root.left == null) {
                    root = root.right;
                    return root;
                } else {
                    root = root.left;
                    return root;
                }
            }
            let rightSide = root.right;
            while (rightSide.left) {
                rightSide = rightSide.left;
            }
            root.data = rightSide.data;
            root.right = deleteNode(root.right, rightSide.data);
            return root;
        } else {
            if (data > root.data) {
                root.right = deleteNode(root.right, data);
            } else if (data < root.data) {
                root.left = deleteNode(root.left, data);
            }
        }
        return root;
    };

    root = buildTree(sortedUnique, 0, sortedUnique.length - 1);
    return { root, insert, deleteNode };
};

const newBinaryTree = treeFactory([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

newBinaryTree.insert(newBinaryTree.root, 50);
newBinaryTree.insert(newBinaryTree.root, 320);
console.log(newBinaryTree);
