const PATHS = {
  home: "M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10",
  learn: "M4 6.5c2.5-1.3 5.3-1.3 7.5 0v11c-2.2-1.3-5-1.3-7.5 0v-11ZM19.5 6.5c-2.5-1.3-5.3-1.3-7.5 0v11c2.2-1.3 5-1.3 7.5 0v-11Z",
  profile: "M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c1.3-3.6 4.2-5.5 7.5-5.5S18.7 16.4 20 20",
  courses: "M4 5.5h7v13H4v-13ZM13 5.5h7v13h-7v-13ZM4 9h7M13 9h7",
  streak: "M12 3c1 3-2.5 4.3-2.5 7.2A3.5 3.5 0 0 0 13 13.7c1.7 0 3-1.4 3-3.1 2 1.6 3 4 3 6a7 7 0 1 1-14 0c0-4.2 3-6.4 3-8.6C8 6.5 10.3 4.6 12 3Z",
  xp: "m12 3 2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3-4.8-4.3 6.4-.6L12 3Z",
  heart: "M12 20.5s-7.5-4.6-9.6-9.1C1.1 8.2 2.7 5 6 5c2 0 3.4 1.2 4 2.5C10.6 6.2 12 5 14 5c3.3 0 4.9 3.2 3.6 6.4-2.1 4.5-9.6 9.1-9.6 9.1Z",
  close: "m5 5 14 14M19 5 5 19",
  chevron: "m9 6 6 6-6 6",
  trophy: "M8 4h8v4a4 4 0 0 1-8 0V4ZM6 5H4v2a4 4 0 0 0 4 4M18 5h2v2a4 4 0 0 1-4 4M10 15h4v2h-4zM8 21h8M12 15v2",
  book: "M4 5.5c2.4-1.2 5.1-1.2 7.5.3v12.7c-2.4-1.5-5.1-1.5-7.5-.3v-12.7ZM19.5 5.5c-2.4-1.2-5.1-1.2-7.5.3v12.7c2.4-1.5 5.1-1.5 7.5-.3v-12.7Z",
  lock: "M6 10.5V8a6 6 0 1 1 12 0v2.5M5 10.5h14v9.5H5z",
  globe: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17ZM3.7 9h16.6M3.7 15h16.6M12 3.5c2 2.3 3 5.2 3 8.5s-1 6.2-3 8.5c-2-2.3-3-5.2-3-8.5s1-6.2 3-8.5Z",
};

export function NavIcon({ name, size = 22, strokeWidth = 1.8, className = "" }) {
  const d = PATHS[name] || PATHS.home;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`nav-icon ${className}`}
      aria-hidden="true"
    >
      <path d={d} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
