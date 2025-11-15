// Recursion visualization logic

// Initialize the recursion state
export function init() {
  return {
    callStack: [],
    currentFunction: null,
    step: 0,
    isRunning: false,
    functionType: null, // 'factorial', 'fibonacci', 'binaryTree', 'doublyLinkedList'
    parameters: null,
    result: null,
    callQueue: [],
    pattern: null
  };
}


// Apply operations to the recursion state
export function apply(state, action) {
  const { type, payload } = action;
  let nextState = { ...state };
  let meta = null;

  switch (type) {
    case "START_RECURSION":
      const { functionType, parameters } = payload;
      const pattern = payload?.pattern || null;
      nextState = {
        ...init(),
        isRunning: true,
        functionType,
        parameters,
        step: 0
      };
      // Setup a small callQueue for custom patterns (depth-first simulation)
      if (functionType === "custom") {
        // callQueue is used as a LIFO stack to schedule forthcoming recursive calls
        nextState.callQueue = [];
        if (pattern === "decrement") {
          nextState.callQueue.push({ id: 1, functionType, parameters: { n: parameters.n }, depth: 0 });
        } else if (pattern === "split") {
          nextState.callQueue.push({ id: 1, functionType, parameters: { n: parameters.n }, depth: 0 });
        } else {
          nextState.callQueue.push({ id: 1, functionType, parameters: parameters, depth: 0 });
        }
        nextState.pattern = pattern;
      } else {
        nextState.callQueue = [];
        nextState.pattern = null;
      }
      meta = { name: "Start Recursion", complexity: "O(1)" };
      break;

    case "STEP_FORWARD":
      if (!nextState.isRunning) break;
      
      // Simulate one step of recursion
      nextState.step += 1;
      
      // For custom functions with a callQueue, pop and push entries from that queue
      let callEntry = null;
      if (nextState.functionType === "custom" && nextState.callQueue && nextState.callQueue.length > 0) {
        // depth-first: pop the last element
        const nextCall = nextState.callQueue.pop();
        callEntry = { id: nextCall.id, functionType: nextCall.functionType, parameters: nextCall.parameters, depth: nextCall.depth };
        // schedule more calls depending on pattern
        const n = Number(callEntry.parameters?.n ?? NaN);
        if (nextState.pattern === "decrement") {
          if (!isNaN(n) && n > 0) {
            const nextId = (nextState.callQueue.length ? nextState.callQueue[nextState.callQueue.length - 1].id : callEntry.id) + 1;
            nextState.callQueue.push({ id: nextId, functionType: callEntry.functionType, parameters: { n: n - 1 }, depth: callEntry.depth + 1 });
          }
        } else if (nextState.pattern === "split") {
          // push right then left so left is processed first (LIFO)
          if (!isNaN(n) && n > 1) {
            const nextId = (nextState.callStack.length ? nextState.callStack[nextState.callStack.length - 1].id : callEntry.id) + 1;
            // right child
            nextState.callQueue.push({ id: nextId + 1, functionType: callEntry.functionType, parameters: { n: n - 2 }, depth: callEntry.depth + 1 });
            // left child
            nextState.callQueue.push({ id: nextId, functionType: callEntry.functionType, parameters: { n: n - 1 }, depth: callEntry.depth + 1 });
          }
        }
      } else {
        callEntry = {
          id: nextState.step,
          functionType: nextState.functionType,
          parameters: getNextParameters(nextState.functionType, nextState.parameters, nextState.step),
          depth: Math.min(nextState.step, 5) // Limit depth for visualization
        };
      }

      if (callEntry) {
        nextState.callStack = [...nextState.callStack, callEntry];
        nextState.currentFunction = callEntry;
      }
      
      meta = { name: "Step Forward", complexity: "O(1)" };
      break;

    case "STEP_BACKWARD":
      if (!nextState.isRunning || nextState.callStack.length === 0) break;
      
      // Remove from call stack
      nextState.callStack = nextState.callStack.slice(0, -1);
      nextState.currentFunction = nextState.callStack.length > 0 
        ? nextState.callStack[nextState.callStack.length - 1] 
        : null;
      nextState.step -= 1;
      // Push the removed call back into the callQueue so stepping backward is reversible for custom patterns
      if (nextState.functionType === "custom") {
        const removed = nextState.currentFunction ? nextState.currentFunction : null;
        if (removed) nextState.callQueue.push(removed);
      }
      
      meta = { name: "Step Backward", complexity: "O(1)" };
      break;

    case "RESET":
      nextState = init();
      meta = { name: "Reset", complexity: "O(1)" };
      break;

    case "LOAD_CALLS":
      // External loader (e.g., AI) supplies a sequence of calls to visualize.
      if (payload && Array.isArray(payload.calls)) {
        // Convert to call entries and push into callQueue for depth-first processing
        const calls = payload.calls.map((c, idx) => ({ id: idx + 1, functionType: c.function || c.fn || nextState.functionType, parameters: c.params || c.parameters || {}, depth: c.depth || 0 }));
        // Save reversed so pop() yields the first call (LIFO)
        nextState.callQueue = calls.reverse();
      }
      meta = { name: "Load Calls", complexity: "O(k)" };
      break;

    default:
      break;
  }

  return { next: nextState, meta };
}

// Helper function to get parameters for the next recursive call
function getNextParameters(functionType, initialParameters, step) {
  switch (functionType) {
    case "factorial":
      // For factorial, decrement the number each step
      const currentN = initialParameters.n - step + 1;
      return { n: Math.max(0, currentN) };
      
    case "fibonacci":
      // For fibonacci, we'll simulate the branching
      return { n: Math.max(0, initialParameters.n - Math.floor(step / 2)) };
      
    case "binaryTree":
      // For binary tree traversal
      return { node: `Node${step}`, value: step };
      
    case "doublyLinkedList":
      // For doubly linked list traversal
      return { node: `Node${step}`, value: step };
    case "custom":
      // default custom simulation: decrement or pass through
      return initialParameters;
      
    default:
      return initialParameters;
  }
}

// Convert state to array for visualization
export function asArray(state) {
  return state.callStack.map(entry => ({
    id: entry.id,
    function: entry.functionType,
    parameters: entry.parameters,
    depth: entry.depth
  }));
}

// Get the current function for detailed view
export function getCurrentFunction(state) {
  return state.currentFunction;
}

// Get the result of the recursion
export function getResult(state) {
  return state.result;
}