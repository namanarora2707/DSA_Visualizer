import "./dsselector.css";

export default function DSSelector({ items, onSelect }){
  return (
    <div className="ds-grid">
      {items.map((item)=> (
        <button key={item.key} onClick={()=>onSelect(item.key)} className="ds-card">
          <div className="ds-card__icon">
            <img src={item.icon} alt={item.title} style={{ width: "48px", height: "48px" }} />
          </div>
          <h3 className="ds-card__title">{item.title}</h3>
          <p className="ds-card__desc">{item.description}</p>
          <div className="ds-card__cta">Open Visualizer <span>↗</span></div>
        </button>
      ))}
    </div>
  );
}
