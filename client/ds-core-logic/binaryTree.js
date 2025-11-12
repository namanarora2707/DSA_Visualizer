// Binary Tree implementation

// Node class for binary tree
class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Initialize the binary tree
export function init() {
  return {
    root: null,
    current: null,
    size: 0,
    traversalPath: []
  };
}

// Apply operations to the binary tree
export function apply(state, action) {
  const { type, payload } = action;
  let nextState = { ...state };
  let meta = null;

  switch (type) {
    case "INSERT":
      const newNode = new TreeNode(payload.data);
      if (!nextState.root) {
        nextState.root = newNode;
        nextState.current = newNode;
      } else {
        insertNode(nextState.root, newNode);
      }
      nextState.size += 1;
      nextState.current = newNode;
      meta = { name: "Insert Node", complexity: "O(log n)", detail: `Inserted ${payload.data}` };
      break;

    case "DELETE":
      if (nextState.root) {
        nextState.root = deleteNode(nextState.root, payload.data);
        nextState.size -= 1;
        nextState.current = nextState.root;
        meta = { name: "Delete Node", complexity: "O(log n)", detail: `Deleted ${payload.data}` };
      }
      break;

    case "SEARCH":
      const found = searchNode(nextState.root, payload.data);
      nextState.current = found;
      meta = { name: "Search Node", complexity: "O(log n)", detail: `Searched for ${payload.data}` };
      break;

    case "TRAVERSE_INORDER":
      nextState.traversalPath = [];
      inorderTraversal(nextState.root, (node) => {
        nextState.traversalPath.push(node.data);
      });
      meta = { name: "Inorder Traversal", complexity: "O(n)" };
      break;

    case "TRAVERSE_PREORDER":
      nextState.traversalPath = [];
      preorderTraversal(nextState.root, (node) => {
        nextState.traversalPath.push(node.data);
      });
      meta = { name: "Preorder Traversal", complexity: "O(n)" };
      break;

    case "TRAVERSE_POSTORDER":
      nextState.traversalPath = [];
      postorderTraversal(nextState.root, (node) => {
        nextState.traversalPath.push(node.data);
      });
      meta = { name: "Postorder Traversal", complexity: "O(n)" };
      break;

    case "MOVE_TO_ROOT":
      nextState.current = nextState.root;
      meta = { name: "Move to Root", complexity: "O(1)" };
      break;

    case "MOVE_TO_LEFT":
      if (nextState.current && nextState.current.left) {
        nextState.current = nextState.current.left;
        meta = { name: "Move to Left Child", complexity: "O(1)" };
      }
      break;

    case "MOVE_TO_RIGHT":
      if (nextState.current && nextState.current.right) {
        nextState.current = nextState.current.right;
        meta = { name: "Move to Right Child", complexity: "O(1)" };
      }
      break;

    case "MOVE_TO_PARENT":
      // This would require parent references, so we'll simulate it
      nextState.current = findParent(nextState.root, nextState.current);
      if (nextState.current) {
        meta = { name: "Move to Parent", complexity: "O(log n)" };
      }
      break;

    case "RESET":
      nextState = init();
      meta = { name: "Reset", complexity: "O(1)" };
      break;

    default:
      break;
  }

  return { next: nextState, meta };
}

// Helper function to insert a node
function insertNode(root, newNode) {
  if (newNode.data < root.data) {
    if (!root.left) {
      root.left = newNode;
    } else {
      insertNode(root.left, newNode);
    }
  } else {
    if (!root.right) {
      root.right = newNode;
    } else {
      insertNode(root.right, newNode);
    }
  }
}

// Helper function to delete a node
function deleteNode(root, data) {
  if (!root) return null;
  
  if (data < root.data) {
    root.left = deleteNode(root.left, data);
  } else if (data > root.data) {
    root.right = deleteNode(root.right, data);
  } else {
    // Node to delete found
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    
    // Node with two children
    const successor = findMin(root.right);
    root.data = successor.data;
    root.right = deleteNode(root.right, successor.data);
  }
  
  return root;
}

// Helper function to find minimum value node
function findMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}

// Helper function to search for a node
function searchNode(root, data) {
  if (!root || root.data === data) return root;
  
  if (data < root.data) {
    return searchNode(root.left, data);
  } else {
    return searchNode(root.right, data);
  }
}

// Helper function for inorder traversal
function inorderTraversal(node, callback) {
  if (node) {
    inorderTraversal(node.left, callback);
    callback(node);
    inorderTraversal(node.right, callback);
  }
}

// Helper function for preorder traversal
function preorderTraversal(node, callback) {
  if (node) {
    callback(node);
    preorderTraversal(node.left, callback);
    preorderTraversal(node.right, callback);
  }
}

// Helper function for postorder traversal
function postorderTraversal(node, callback) {
  if (node) {
    postorderTraversal(node.left, callback);
    postorderTraversal(node.right, callback);
    callback(node);
  }
}

// Helper function to find parent of a node
function findParent(root, targetNode) {
  if (!root || root === targetNode) return null;
  
  if ((root.left === targetNode) || (root.right === targetNode)) {
    return root;
  }
  
  const leftParent = findParent(root.left, targetNode);
  if (leftParent) return leftParent;
  
  return findParent(root.right, targetNode);
}

// Convert tree to array representation for visualization
export function toArray(state) {
  if (!state.root) return [];
  
  const result = [];
  const queue = [{ node: state.root, level: 0, position: "root" }];
  
  while (queue.length > 0) {
    const { node, level, position } = queue.shift();
    
    result.push({
      data: node.data,
      level,
      position,
      isCurrent: node === state.current,
      hasLeft: !!node.left,
      hasRight: !!node.right
    });
    
    if (node.left) {
      queue.push({ node: node.left, level: level + 1, position: "left" });
    }
    
    if (node.right) {
      queue.push({ node: node.right, level: level + 1, position: "right" });
    }
  }
  
  return result;
}

// Get the root node
export function getRoot(state) {
  return state.root;
}

// Get the current node
export function getCurrent(state) {
  return state.current;
}

// Get the size of the tree
export function getSize(state) {
  return state.size;
}

// Get traversal path
export function getTraversalPath(state) {
  return state.traversalPath;
}

// Check if tree is empty
export function isEmpty(state) {
  return state.size === 0;
}