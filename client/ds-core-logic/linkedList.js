export function init() {
  return [];
}
export function asArray(list) {
  return list.slice();
}
export function apply(curr, action) {
  let next = curr.slice();
  switch (action.op) {
    case "insertHead":
      if (action.args === "") throw new Error("Value required");
      next.unshift(String(action.args));
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
      next.push(String(action.args));
      return {
        next,
        meta: {
          name: "Insert Tail",
          complexity: "O(1)",
          detail: String(action.args),
        },
      };
    case "delete": {
      const before = next.length;
      next = next.filter((v) => v !== String(action.args));
      const removed = before - next.length;
      return {
        next,
        meta: {
          name: "Delete by value",
          complexity: "O(n)",
          detail: removed ? "Removed" : "Not found",
        },
      };
    }
    case "update": {
      const parts = String(action.args).split("--").map(v => v.trim());
      if (parts.length !== 2) {
        return {
          next,
          meta: { name: "Update", complexity: "O(n)", detail: "Invalid format, use X -> Y" },
        };
      }

      const [oldValue, newValue] = parts;

      const idx = next.indexOf(String(oldValue));
      if (idx === -1) {
        return {
          next,
          meta: { name: "Update", complexity: "O(n)", detail: `${oldValue} not found` },
        };
      }
      next[idx] = String(newValue);

      return {
        next,
        meta: {
          name: "Update",
          complexity: "O(n)",
          detail: `Updated ${oldValue} to ${newValue}`,
        },
      };
    }
    default:
      return { next, meta: { name: "No-op", complexity: "-" } };
  }
}
