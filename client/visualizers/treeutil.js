export function getLevels(root){
  const levels=[]; const q=[root];
  while(q.length){
    const size=q.length; const level=[]; let hasNonNull=false;
    for(let i=0;i<size;i++){
      const n=q.shift()||null;
      if(n){
        level.push(n.value); q.push(n.left); q.push(n.right);
        if(n.left||n.right) hasNonNull=true;
      } else { level.push(null); q.push(null); q.push(null); }
    }
    levels.push(level); if(!hasNonNull) break;
  }
  return levels;
}
