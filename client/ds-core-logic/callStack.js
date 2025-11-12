// Call Stack visualization logic for recursion

// Initialize the call stack state
export function init() {
  return {
    stack: [],
    currentFunction: null,
    isRunning: false,
    functionName: "",
    parameters: {},
    result: null,
    step: 0
  };
}

// Apply operations to the call stack state
export function apply(state, action) {
  const { type, payload } = action;
  let nextState = { ...state };
  let meta = null;

  switch (type) {
    case "INITIALIZE_FUNCTION":
      const { functionName, parameters } = payload;
      nextState = {
        ...init(),
        isRunning: true,
        functionName,
        parameters
      };
      meta = { name: "Initialize Function", complexity: "O(1)" };
      break;

    case "PUSH_CALL":
      const callEntry = {
        id: nextState.stack.length + 1,
        functionName: payload.functionName || nextState.functionName,
        parameters: payload.parameters || {},
        timestamp: Date.now()
      };
      
      nextState.stack = [...nextState.stack, callEntry];
      nextState.currentFunction = callEntry;
      nextState.step += 1;
      
      meta = { name: "Push Call", complexity: "O(1)" };
      break;

    case "POP_CALL":
      if (nextState.stack.length > 0) {
        const poppedCall = nextState.stack[nextState.stack.length - 1];
        nextState.stack = nextState.stack.slice(0, -1);
        nextState.currentFunction = nextState.stack.length > 0 
          ? nextState.stack[nextState.stack.length - 1] 
          : null;
        nextState.result = payload.result || null;
        nextState.step += 1;
        
        meta = { name: "Pop Call", complexity: "O(1)" };
      }
      break;

    case "UPDATE_PARAMETERS":
      if (nextState.currentFunction) {
        nextState.currentFunction.parameters = {
          ...nextState.currentFunction.parameters,
          ...payload.parameters
        };
      }
      meta = { name: "Update Parameters", complexity: "O(1)" };
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
  return state.stack;
}

// Get the current function
export function getCurrentFunction(state) {
  return state.currentFunction;
}

// Get the result
export function getResult(state) {
  return state.result;
}

// Check if stack is empty
export function isEmpty(state) {
  return state.stack.length === 0;
}

// Get stack size
export function size(state) {
  return state.stack.length;
}