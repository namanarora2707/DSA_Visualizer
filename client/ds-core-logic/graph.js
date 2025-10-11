export function init() {
  return { adj: {} };
}
function clone(g) {
  const adj = {};
  for (const k in g.adj) adj[k] = new Set(Array.from(g.adj[k]));
  return { adj };
}
function ensureNode(g, id) {
  if (!g.adj[id]) g.adj[id] = new Set();
}
export function apply(curr, action) {
  let next = clone(curr);
  switch (action.op) {
    case "addNode": {
      const id = String(action.args);
      if (!id) throw new Error("Node id required");
      ensureNode(next, id);
      return {
        next,
        meta: { name: "Add Node", complexity: "O(1)", detail: id },
      };
    }
    case "removeNode": {
      const id = String(action.args);
      if (!id) throw new Error("Node id required");
      if (!next.adj[id])
        return {
          next,
          meta: {
            name: "Remove Node",
            complexity: "O(V+E)",
            detail: "Not found",
          },
        };
      delete next.adj[id];
      for (const k in next.adj) next.adj[k].delete(id);
      return {
        next,
        meta: { name: "Remove Node", complexity: "O(V+E)", detail: id },
      };
    }
    case "addEdge": {
      const { from, to } = action.args || {};
      if (!from || !to) throw new Error("Both nodes required");
      ensureNode(next, String(from));
      ensureNode(next, String(to));
      next.adj[String(from)].add(String(to));
      next.adj[String(to)].add(String(from));
      return {
        next,
        meta: {
          name: "Add Edge",
          complexity: "O(1)",
          detail: `${from} – ${to}`,
        },
      };
    }
    case "removeEdge": {
      const { from, to } = action.args || {};
      if (!from || !to) throw new Error("Both nodes required");
      next.adj[String(from)]?.delete(String(to));
      next.adj[String(to)]?.delete(String(from));
      return {
        next,
        meta: {
          name: "Remove Edge",
          complexity: "O(1)",
          detail: `${from} – ${to}`,
        },
      };
    }
    default:
      return { next, meta: { name: "No-op", complexity: "-" } };
  }
}
