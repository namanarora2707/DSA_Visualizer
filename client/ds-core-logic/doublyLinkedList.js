// Doubly Linked List implementation

// Node class for doubly linked list
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// Initialize the doubly linked list
export function init() {
  return {
    head: null,
    tail: null,
    size: 0,
    current: null
  };
}

// Apply operations to the doubly linked list
export function apply(state, action) {
  const { type, payload } = action;
  let nextState = { ...state };
  let meta = null;

  switch (type) {
    case "INSERT_AT_HEAD":
      const newNodeHead = new Node(payload.data);
      if (!nextState.head) {
        nextState.head = newNodeHead;
        nextState.tail = newNodeHead;
      } else {
        newNodeHead.next = nextState.head;
        nextState.head.prev = newNodeHead;
        nextState.head = newNodeHead;
      }
      nextState.size += 1;
      nextState.current = nextState.head;
      meta = { name: "Insert at Head", complexity: "O(1)", detail: `Inserted ${payload.data}` };
      break;

    case "INSERT_AT_TAIL":
      const newNodeTail = new Node(payload.data);
      if (!nextState.tail) {
        nextState.head = newNodeTail;
        nextState.tail = newNodeTail;
      } else {
        newNodeTail.prev = nextState.tail;
        nextState.tail.next = newNodeTail;
        nextState.tail = newNodeTail;
      }
      nextState.size += 1;
      nextState.current = nextState.tail;
      meta = { name: "Insert at Tail", complexity: "O(1)", detail: `Inserted ${payload.data}` };
      break;

    case "INSERT_AT_INDEX":
      if (payload.index === 0) {
        return apply(nextState, { type: "INSERT_AT_HEAD", payload: { data: payload.data } });
      }
      
      if (payload.index >= nextState.size) {
        return apply(nextState, { type: "INSERT_AT_TAIL", payload: { data: payload.data } });
      }
      
      const newNodeIndex = new Node(payload.data);
      let current = nextState.head;
      for (let i = 0; i < payload.index; i++) {
        current = current.next;
      }
      
      newNodeIndex.next = current;
      newNodeIndex.prev = current.prev;
      current.prev.next = newNodeIndex;
      current.prev = newNodeIndex;
      
      nextState.size += 1;
      nextState.current = newNodeIndex;
      meta = { name: "Insert at Index", complexity: "O(n)", detail: `Inserted ${payload.data} at index ${payload.index}` };
      break;

    case "DELETE_AT_HEAD":
      if (!nextState.head) break;
      
      const deletedDataHead = nextState.head.data;
      if (nextState.head === nextState.tail) {
        nextState.head = null;
        nextState.tail = null;
      } else {
        nextState.head = nextState.head.next;
        nextState.head.prev = null;
      }
      nextState.size -= 1;
      nextState.current = nextState.head;
      meta = { name: "Delete at Head", complexity: "O(1)", detail: `Deleted ${deletedDataHead}` };
      break;

    case "DELETE_AT_TAIL":
      if (!nextState.tail) break;
      
      const deletedDataTail = nextState.tail.data;
      if (nextState.head === nextState.tail) {
        nextState.head = null;
        nextState.tail = null;
      } else {
        nextState.tail = nextState.tail.prev;
        nextState.tail.next = null;
      }
      nextState.size -= 1;
      nextState.current = nextState.tail;
      meta = { name: "Delete at Tail", complexity: "O(1)", detail: `Deleted ${deletedDataTail}` };
      break;

    case "DELETE_AT_INDEX":
      if (payload.index < 0 || payload.index >= nextState.size) break;
      
      if (payload.index === 0) {
        return apply(nextState, { type: "DELETE_AT_HEAD" });
      }
      
      if (payload.index === nextState.size - 1) {
        return apply(nextState, { type: "DELETE_AT_TAIL" });
      }
      
      let currentDelete = nextState.head;
      for (let i = 0; i < payload.index; i++) {
        currentDelete = currentDelete.next;
      }
      
      const deletedData = currentDelete.data;
      currentDelete.prev.next = currentDelete.next;
      currentDelete.next.prev = currentDelete.prev;
      
      nextState.size -= 1;
      nextState.current = currentDelete.next;
      meta = { name: "Delete at Index", complexity: "O(n)", detail: `Deleted ${deletedData} at index ${payload.index}` };
      break;

    case "TRAVERSE_FORWARD":
      if (nextState.head) {
        nextState.current = nextState.head;
        meta = { name: "Traverse Forward", complexity: "O(1)" };
      }
      break;

    case "TRAVERSE_BACKWARD":
      if (nextState.tail) {
        nextState.current = nextState.tail;
        meta = { name: "Traverse Backward", complexity: "O(1)" };
      }
      break;

    case "MOVE_NEXT":
      if (nextState.current && nextState.current.next) {
        nextState.current = nextState.current.next;
        meta = { name: "Move Next", complexity: "O(1)" };
      }
      break;

    case "MOVE_PREV":
      if (nextState.current && nextState.current.prev) {
        nextState.current = nextState.current.prev;
        meta = { name: "Move Previous", complexity: "O(1)" };
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

// Convert state to array for visualization
export function asArray(state) {
  const result = [];
  let current = state.head;
  while (current) {
    result.push({
      data: current.data,
      isCurrent: current === state.current,
      hasNext: !!current.next,
      hasPrev: !!current.prev
    });
    current = current.next;
  }
  return result;
}

// Get the size of the list
export function getSize(state) {
  return state.size;
}

// Check if list is empty
export function isEmpty(state) {
  return state.size === 0;
}

// Get head node
export function getHead(state) {
  return state.head;
}

// Get tail node
export function getTail(state) {
  return state.tail;
}

// Get current node
export function getCurrent(state) {
  return state.current;
}