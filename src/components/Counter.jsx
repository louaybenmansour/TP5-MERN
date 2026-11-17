import { useCallback, useEffect, useState } from 'react';

const MIN_COUNT = -50;
const MAX_COUNT = 50;

export default function Counter() {
  const [count, setCount] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_valeur');
    return sauvegarde !== null ? parseInt(sauvegarde, 10) : 0;
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Aucun clic pour le moment');
  const [totalClics, setTotalClics] = useState(0);
  const [historique, setHistorique] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_historique');
    return sauvegarde !== null ? JSON.parse(sauvegarde) : [];
  });
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    document.title = 'Compteur : ' + count;
  }, [count]);

  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem(
      'mon_compteur_historique',
      JSON.stringify(historique),
    );
  }, [historique]);

  const isMaxReached = count + step > MAX_COUNT;
  const isMinReached = count - step < MIN_COUNT;

  // Gestionnaire d'incrémentation
  const handleIncrement = useCallback(() => {
    if (count + step > MAX_COUNT) {
      setAlertMessage('Seuil maximal de 50 atteint !');
      return;
    }

    setAlertMessage('');
    setCount(count + step);
    setMessage('Ajout de ' + step);
    setTotalClics((total) => total + 1);
    setHistorique((actions) => [...actions, '+' + step]);
  }, [count, step]);

  // Gestionnaire de décrémentation
  const handleDecrement = useCallback(() => {
    if (count - step < MIN_COUNT) {
      setAlertMessage('Seuil minimal de -50 atteint !');
      return;
    }

    setAlertMessage('');
    setCount(count - step);
    setMessage('Retrait de ' + step);
    setTotalClics((total) => total + 1);
    setHistorique((actions) => [...actions, '-' + step]);
  }, [count, step]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        handleIncrement();
      } else if (event.key === 'ArrowDown') {
        handleDecrement();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDecrement, handleIncrement]);

  // Gestionnaire de remise à zéro
  const handleReset = () => {
    setCount(0);
    setMessage('Remise à zéro');
    setAlertMessage('');
    setTotalClics((total) => total + 1);
    setHistorique([]);
  };

  // Couleur dynamique selon le signe du compteur
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';

    return 'counter-display zero';
  };

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>

      {alertMessage && (
        <div className="alert-message">{alertMessage}</div>
      )}

      <div className="btn-group">
        <button
          className="btn btn-dec"
          onClick={handleDecrement}
          disabled={isMinReached}
        >
          -{step}
        </button>

        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>

        <button
          className="btn btn-inc"
          onClick={handleIncrement}
          disabled={isMaxReached}
        >
          +{step}
        </button>
      </div>

      <div className="step-control">
        <label>Pas d'incrémentation :</label>

        <select
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="history-card">
        <p>
          <strong>Dernière action :</strong> {message}
        </p>

        <p>
          <strong>Total des clics :</strong> {totalClics}
        </p>

        {historique.length > 0 && (
          <p>
            <strong>Historique :</strong> {historique.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}