// Doubly Linked List implementation

// Initialize the doubly linked list
export function init() {
  return [];
}

// Convert state to array for visualization
export function asArray(list) {
  return list.slice();
}

// Apply operations to the doubly linked list
export function apply(curr, action) {
  let next = curr.slice();
  
  switch (action.op) {
    case "insertHead":
      if (action.args === "") throw new Error("Value required");
      next.unshift({ data: String(action.args), type: "head" });
      return {
        next,
        meta: {
          name: "Insert Head",
          complexity: "O(1)",
          detail: String(action.args),
        },
      };
      
    case "insertTail":
      if (action.args === "") throw new Error("Value required");
      next.push({ data: String(action.args), type: "tail" });
      return {
        next,
        meta: {
          name: "Insert Tail",
          complexity: "O(1)",
          detail: String(action.args),
        },
      };
      
    case "insertAt":
      const parts = String(action.args).split("--").map(v => v.trim());
      if (parts.length !== 2) {
        return {
          next,
          meta: { name: "Insert At", complexity: "O(n)", detail: "Invalid format, use index--value" },
        };
      }
      
      const [indexStr, value] = parts;
      const index = parseInt(indexStr);
      
      if (isNaN(index) || index < 0) {
        return {
          next,
          meta: { name: "Insert At", complexity: "O(n)", detail: "Invalid index" },
        };
      }
      
      if (index > next.length) {
        return {
          next,
          meta: { name: "Insert At", complexity: "O(n)", detail: "Index out of bounds" },
        };
      }
      
      next.splice(index, 0, { data: String(value), type: "middle" });
      
      return {
        next,
        meta: {
          name: "Insert At",
          complexity: "O(n)",
          detail: `Inserted ${value} at index ${index}`,
        },
      };
      
    case "delete": {
      const before = next.length;
      next = next.filter((node) => node.data !== String(action.args));
      const removed = before - next.length;
      return {
        next,
        meta: {
          name: "Delete by value",
          complexity: "O(n)",
          detail: removed ? `Removed ${removed} node(s)` : "Not found",
        },
      };
    }
    
    case "deleteAt": {
      const index = parseInt(action.args);
      if (isNaN(index) || index < 0 || index >= next.length) {
        return {
          next,
          meta: { name: "Delete At", complexity: "O(n)", detail: "Invalid index" },
        };
      }
      
      const removedValue = next[index].data;
      next.splice(index, 1);
      
      return {
        next,
        meta: {
          name: "Delete At",
          complexity: "O(n)",
          detail: `Removed ${removedValue} at index ${index}`,
        },
      };
    }
    
    case "update": {
      const parts = String(action.args).split("--").map(v => v.trim());
      if (parts.length !== 2) {
        return {
          next,
          meta: { name: "Update", complexity: "O(n)", detail: "Invalid format, use index--newvalue" },
        };
      }
      
      const [indexStr, newValue] = parts;
      const index = parseInt(indexStr);
      
      if (isNaN(index) || index < 0 || index >= next.length) {
        return {
          next,
          meta: { name: "Update", complexity: "O(n)", detail: "Invalid index" },
        };
      }
      
      const oldValue = next[index].data;
      next[index] = { ...next[index], data: String(newValue) };
      
      return {
        next,
        meta: {
          name: "Update",
          complexity: "O(n)",
          detail: `Updated index ${index} from ${oldValue} to ${newValue}`,
        },
      };
    }
    
    default:
      return { next, meta: { name: "No-op", complexity: "-" } };
  }
}