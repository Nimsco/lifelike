/**
 * Lifelike – Design Tokens
 *
 * Importable constants for consistency across components.
 * These mirror the @theme values in index.css.
 */

export const colors = {
    primary: "#6f91c2",
    primaryHover: "#5c7fae",
    primaryLight: "#eef4fb",
    heading: "#494a4c",
    body: "#555555",
    muted: "#8e8e8e",
    page: "#f0f2f5",
    card: "#ffffff",
    border: "#dbdbdb",
    inputBg: "#fafafa",
    danger: "#ef4444",
    success: "#22c55e",
    white: "#ffffff",
    black: "#000000",
};

export const typography = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
    },
    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
};

export const spacing = {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
};

export const borderRadius = {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
};

export const shadows = {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 2px 8px rgba(0,0,0,0.08)",
    lg: "0 4px 16px rgba(0,0,0,0.10)",
};

export const transitions = {
    fast: "all 0.15s ease",
    default: "all 0.2s ease",
};

export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
};

export default {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    transitions,
    breakpoints,
};
