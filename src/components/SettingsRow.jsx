import Toggle from './Toggle.jsx';
import './SettingsRow.css';

export default function SettingsRow({
  icon,
  title,
  hint,
  value,
  variant = 'nav',
  on,
  onChange,
  onClick,
  danger = false,
}) {
  const cls = `settings-row settings-row--${variant} ${danger ? 'is-danger' : ''}`;

  const inner = (
    <>
      {icon && <span className="settings-row__icon" aria-hidden="true">{icon}</span>}
      <div className="settings-row__body">
        <div className="settings-row__title">{title}</div>
        {hint && <div className="settings-row__hint">{hint}</div>}
      </div>
      {variant === 'toggle' && (
        <Toggle on={on} onChange={onChange} ariaLabel={title} />
      )}
      {variant === 'nav' && (
        <span className="settings-row__right">
          {value && <span className="settings-row__value">{value}</span>}
          <span className="settings-row__chev" aria-hidden="true">›</span>
        </span>
      )}
    </>
  );

  if (variant === 'toggle') {
    return (
      <div
        className={cls}
        onClick={() => onChange?.(!on)}
        role="group"
      >
        {inner}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
