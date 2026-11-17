import { useState } from 'react';
import Header from './components/Header.jsx';
import Counter from './components/Counter.jsx';
import AutoTimer from './components/AutoTimer.jsx';
import './index.css';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <Header
        title="My React Counter App"
        subtitle="Mastering Fundamental Hooks: useState & useEffect"
      />
      <main>
        <Counter />
        <button
          className="btn btn-reset"
          onClick={() => setShowTimer((visible) => !visible)}
        >
          {showTimer ? 'Masquer le chronomètre' : 'Afficher le chronomètre'}
        </button>
        {showTimer && <AutoTimer />}
      </main>
    </div>
  );
}