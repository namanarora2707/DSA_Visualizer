import { useNavigate } from "react-router-dom";
import DSSelector from "../components/DSSelector.jsx";
import "./index.css";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <header className="home__header">
        <div className="container row">
          <div className="brand">
            <div className="logo" />
            <span className="brand__name">DSAPlay</span>
          </div>
          <div className="brand__tag">Build • Edit • Visualize</div>
        </div>
      </header>
      <br /><br />
      <main className="container main">
        <section className="hero">
          <h1 className="hero__title">Data Structures Playground</h1>
          <p className="hero__subtitle">Select a data structure to perform operations and visualize results live. Customize your steps and learn by doing.</p>
        </section>

        <DSSelector
          onSelect={(key) => navigate(`/visualizer/${key}`)}
          items={[
            { key: "linked-list", title: "Linked List", description: "Singly list: insert, delete, update", icon: "/linklist.png" },
            { key: "stack", title: "Stack", description: "Push, pop, peek", icon: "/stack.png" },
            { key: "queue", title: "Queue", description: "Enqueue and dequeue", icon: "/queue.png" },
            { key: "tree", title: "Binary Search Tree", description: "Insert and delete nodes", icon: "/bst.png" },
            { key: "graph", title: "Graph", description: "Add/remove nodes and edges", icon: "/graph.png" }
          ]}
        />
      </main>
    </div>
  );
}
