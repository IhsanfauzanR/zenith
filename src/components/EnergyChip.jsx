import { ENERGY_CONFIG } from '../data/data.js';
import './EnergyChip.css';

export default function EnergyChip({ energy, onClick, hideEmoji = false }) {
  const cfg = ENERGY_CONFIG[energy];
  if (!cfg) return null;
  return (
    <button
      type="button"
      className="energy-chip"
      onClick={onClick}
      style={{
        background: cfg.soft,
        color: 'var(--text-primary)',
      }}
    >
      {!hideEmoji && <span className="energy-chip__emoji" aria-hidden="true">{cfg.emoji}</span>}
      <span className="energy-chip__label">{cfg.label}</span>
      <span className="energy-chip__sep" aria-hidden="true">·</span>
      <span className="energy-chip__action">ubah</span>
    </button>
  );
}
