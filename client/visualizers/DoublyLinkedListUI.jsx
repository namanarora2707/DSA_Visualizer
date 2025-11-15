import "./dll.css";

export default function DoublyLinkedListUI({ nodes }) {
  if (nodes.length === 0) return <div className="empty">Empty doubly linked list</div>;
  
  return (
    <div className="dll">
      {nodes.map((node, i) => (
        <div key={i} className="dll__item">
          <div className={`node ${node.type || ''}`}>{node.data}</div>
          {node.type && <div className="node-label">{node.type}</div>}
          {i < nodes.length - 1 && <span className="arrow">→</span>}
          {i > 0 && <span className="arrow-back">←</span>}
        </div>
      ))}
    </div>
  );
}