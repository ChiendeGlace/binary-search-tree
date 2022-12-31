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
        node.left = buildTree(array, start, mid - 1);
        node.right = buildTree(array, mid + 1, end);
        return node;
    };

    root = buildTree(sortedUnique, 0, sortedUnique.length - 1);
    
    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node.right !== null) {
            prettyPrint(
                node.right,
                `${prefix}${isLeft ? '│   ' : '    '}`,
                false
            );
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            prettyPrint(
                node.left,
                `${prefix}${isLeft ? '    ' : '│   '}`,
                true
            );
        }
    };
    prettyPrint(root);
    return { root };
};

const newBinaryTree = treeFactory([
    1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);
