import './Screen.css';

export default function Screen({ children, className = '', padded = true, scroll = true, style }) {
  return (
    <div
      className={`screen ${padded ? 'screen--padded' : ''} ${scroll ? 'screen--scroll' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
