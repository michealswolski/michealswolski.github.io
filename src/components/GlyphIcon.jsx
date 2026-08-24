/*
  Small category glyphs for the skills section. Deliberately geometric rather
  than brand logos — a hand-traced vendor logo that's slightly wrong looks worse
  than no logo at all, and each of these has to read at 14px in both themes.
*/

const PATHS = {
  code: (
    <>
      <path d="M9 5 3.5 10.5 9 16" />
      <path d="M13 5l5.5 5.5L13 16" />
    </>
  ),
  stack: (
    <>
      <path d="M11 2.6 19.4 7 11 11.4 2.6 7 11 2.6Z" />
      <path d="M2.6 11 11 15.4 19.4 11" />
      <path d="M2.6 15 11 19.4 19.4 15" />
    </>
  ),
  shield: (
    <>
      <path d="M11 2.6 4 5.4v5c0 4.2 2.9 7.6 7 8.9 4.1-1.3 7-4.7 7-8.9v-5L11 2.6Z" />
      <path d="M8.2 10.8 10.4 13l3.8-3.8" />
    </>
  ),
  brain: (
    <>
      <path d="M11 4.6a3 3 0 0 0-5.6 1.2A2.9 2.9 0 0 0 4 10.9a3 3 0 0 0 1.7 5.2A3 3 0 0 0 11 17.4Z" />
      <path d="M11 4.6a3 3 0 0 1 5.6 1.2A2.9 2.9 0 0 1 18 10.9a3 3 0 0 1-1.7 5.2A3 3 0 0 1 11 17.4Z" />
    </>
  ),
  grid: (
    <>
      <rect x="3.2" y="3.2" width="6.6" height="6.6" rx="1.4" />
      <rect x="12.2" y="3.2" width="6.6" height="6.6" rx="1.4" />
      <rect x="3.2" y="12.2" width="6.6" height="6.6" rx="1.4" />
      <rect x="12.2" y="12.2" width="6.6" height="6.6" rx="1.4" />
    </>
  ),
  chip: (
    <>
      <rect x="6.2" y="6.2" width="9.6" height="9.6" rx="1.6" />
      <path d="M9 3.2v3M13 3.2v3M9 15.8v3M13 15.8v3M3.2 9h3M3.2 13h3M15.8 9h3M15.8 13h3" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.8" y="4" width="16.4" height="14" rx="2" />
      <path d="M6.4 9.2 9 11.4l-2.6 2.2M11.6 14h4" />
    </>
  ),
};

export default function GlyphIcon({ name, size = 15 }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
