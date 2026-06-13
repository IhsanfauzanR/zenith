import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import Button from '../components/Button.jsx';
import { useApp } from '../context/AppContext.jsx';
import './Login.css';

export default function Login() {
  const { navigate } = useApp();
  const [email, setEmail] = useState('rania@email.com');
  const [password, setPassword] = useState('zenith2026');

  return (
    <Screen className="login">
      <div className="login__hero" aria-hidden="true" />

      <header className="login__head">
        <h1 className="t-h1 login__title">Selamat datang kembali</h1>
        <p className="t-body t-secondary login__sub">
          Masuk dengan tenang. Tidak perlu terburu.
        </p>
      </header>

      <form className="login__form" onSubmit={(e) => { e.preventDefault(); navigate('energy-picker'); }}>
        <label className="login__field">
          <span className="login__label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login__input"
            autoComplete="email"
          />
        </label>

        <label className="login__field">
          <span className="login__label">Kata sandi</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login__input"
            autoComplete="current-password"
          />
        </label>

        <button type="button" className="login__forgot">Lupa kata sandi?</button>

        <Button type="submit">Masuk</Button>
      </form>

      <div className="login__divider">
        <span className="login__divider-line" />
        <span className="login__divider-text">atau</span>
        <span className="login__divider-line" />
      </div>

      <Button variant="outline" onClick={() => navigate('energy-picker')}>
        <span aria-hidden="true">🔵</span> Lanjut dengan Google
      </Button>

      <p className="login__footer">
        Belum punya akun? <button className="login__signup">Daftar</button>
      </p>
    </Screen>
  );
}
