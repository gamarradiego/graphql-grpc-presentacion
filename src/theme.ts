import type { SpectacleThemeOverrides } from 'spectacle';

const theme: SpectacleThemeOverrides = {
  colors: {
    primary: '#06b6d4',
    secondary: '#a78bfa',
    tertiary: '#fbbf24',
    quaternary: '#34d399',
    quinary: '#f87171',
  },
  fonts: {
    header: '"Inter", "Segoe UI", sans-serif',
    text: '"Inter", "Segoe UI", sans-serif',
    monospace: '"JetBrains Mono", "Fira Code", monospace',
  },
  fontSizes: {
    h1: '3.25rem',
    h2: '2.5rem',
    h3: '1.75rem',
    text: '1.3rem',
    monospace: '0.95rem',
  },
  space: [0, 8, 16, 24, 32, 40, 48, 64, 80, 112],
  size: {
    width: 1280,
    height: 720,
    maxCodePaneHeight: 300,
  },
};

export default theme;
