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
    result: null
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
      nextState = {
        ...init(),
        isRunning: true,
        functionType,
        parameters,
        step: 0
      };
      meta = { name: "Start Recursion", complexity: "O(1)" };
      break;

    case "STEP_FORWARD":
      if (!nextState.isRunning) break;
      
      // Simulate one step of recursion
      nextState.step += 1;
      
      // Add to call stack for visualization
      const callEntry = {
        id: nextState.step,
        functionType: nextState.functionType,
        parameters: getNextParameters(nextState.functionType, nextState.parameters, nextState.step),
        depth: Math.min(nextState.step, 5) // Limit depth for visualization
      };
      
      nextState.callStack = [...nextState.callStack, callEntry];
      nextState.currentFunction = callEntry;
      
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
      
      meta = { name: "Step Backward", complexity: "O(1)" };
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