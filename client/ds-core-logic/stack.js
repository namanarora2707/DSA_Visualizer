export function init(){ return []; }
export function asArray(s){ return s.slice(); }
export function apply(curr, action){
  let next = curr.slice();
  switch(action.op){
    case "push": if(action.args==="") throw new Error("Value required"); next.push(String(action.args)); return { next, meta:{ name:"Push", complexity:"O(1)", detail:String(action.args)} };
    case "pop": { const v=next.pop(); return { next, meta:{ name:"Pop", complexity:"O(1)", detail: v ?? "Empty" } }; }
    case "peek": { const v=next[next.length-1]; return { next, meta:{ name:"Peek", complexity:"O(1)", detail: v ?? "Empty" } }; }
    default: return { next, meta:{ name:"No-op", complexity:"-" } };
  }
}
