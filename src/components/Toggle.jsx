import './Toggle.css';

export default function Toggle({ on, onChange, ariaLabel }) {
  const handleClick = (e) => {
    e.stopPropagation();
    onChange?.(!on);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      className={`toggle ${on ? 'toggle--on' : 'toggle--off'}`}
      onClick={handleClick}
    >
      <span className="toggle__knob" />
    </button>
  );
}
