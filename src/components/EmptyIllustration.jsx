import './EmptyIllustration.css';

export default function EmptyIllustration({ emoji, glowColor = 'var(--brand-primary)', size = 220 }) {
  return (
    <div
      className="empty-illust"
      aria-hidden="true"
      style={{ width: size, height: size, '--glow': glowColor }}
    >
      <div className="empty-illust__glow" />
      <div className="empty-illust__emoji">{emoji}</div>
    </div>
  );
}
