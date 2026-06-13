import { useApp } from '../context/AppContext.jsx';
import './BackBar.css';

export default function BackBar({ title }) {
  const { navigateBack } = useApp();
  return (
    <header className="back-bar">
      <button className="back-bar__btn" onClick={navigateBack}>
        <span aria-hidden="true">←</span> Kembali
      </button>
      {title && <span className="back-bar__title">{title}</span>}
    </header>
  );
}
