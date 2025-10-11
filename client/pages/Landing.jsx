import { Link } from "react-router-dom";
import "./index.css"; // Re-using styles from the old index page

export default function Landing() {
  return (
    <div className="home">
      <header className="home__header">
        <div className="container row">
          <div className="brand">
            <div className="logo" />
            <span className="brand__name">DSAPlay</span>
          </div>
          <div className="auth-links">
            <Link to="/login" className="btn" style={{margin:10}}>Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          </div>
        </div>
      </header>
      <br /><br />
      <main className="container main">
        <section className="hero">
          <h1 className="hero__title">Data Structures Playground</h1>
          <br /><br />
          <p className="hero__subtitle">
            Build, edit, and visualize data structures live. Customize your
            steps and learn by doing.
          </p>
          <br /><br /> <br /><br /><br /><br />
          <div className="hero__cta">
            <Link to="/login" className="btn btn-large btn-primary">Get Started for Free</Link>
          </div>
        </section>
        <br />
        <section className="info">
          <div className="card">
            <div className="card__title">Goal</div>
            <p>Interactive, customizable DSA visualizer similar to VisuAlgo.</p>
          </div>
          <div className="card">
            <div className="card__title">Tech</div>
            <p>React • Vite • Node.js • Express • MongoDB</p>
          </div>
          <div className="card">
            <div className="card__title">Flow</div>
            <p>Choose a structure → Operate → Visualize → See complexity</p>
          </div>
        </section>
      </main>
    </div>
  );
}