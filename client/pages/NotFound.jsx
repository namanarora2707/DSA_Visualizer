export default function NotFound(){
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8fafc'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:48,margin:'0 0 12px'}}>404</h1>
        <p style={{fontSize:18,color:'#475569',marginBottom:16}}>Oops! Page not found</p>
        <a href="/" style={{color:'#1d4ed8',textDecoration:'underline'}}>Return to Home</a>
      </div>
    </div>
  );
}
