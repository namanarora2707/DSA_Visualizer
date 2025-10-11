export function init(){ return []; }
export function asArray(q){ return q.slice(); }
export function apply(curr, action){
  let next = curr.slice();
  switch(action.op){
    case "enqueue": if(action.args==="") throw new Error("Value required"); next.push(String(action.args)); return { next, meta:{ name:"Enqueue", complexity:"O(1)", detail:String(action.args)} };
    case "dequeue": { const v=next.shift(); return { next, meta:{ name:"Dequeue", complexity:"O(1)", detail: v ?? "Empty" } }; }
    default: return { next, meta:{ name:"No-op", complexity:"-" } };
  }
}
