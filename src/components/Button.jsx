import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  fullWidth = true,
  onClick,
  disabled = false,
  tone,
  type = 'button',
  className = '',
  style,
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    tone ? `btn--tone-${tone}` : '',
    fullWidth ? 'btn--full' : '',
    disabled ? 'btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
