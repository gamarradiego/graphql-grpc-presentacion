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
    maxCodePaneHeight: 400,
  },
};

export const syntaxColors = {
  keyword: '#c678dd',
  string: '#98c379',
  number: '#d19a66',
  comment: '#5c6370',
  type: '#e5c07b',
  function: '#61afef',
  operator: '#56b6c2',
  punctuation: '#abb2bf',
  plain: '#e5e7eb',
};

export default theme;
