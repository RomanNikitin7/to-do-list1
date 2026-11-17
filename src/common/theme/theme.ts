import { createTheme } from "@mui/material/styles";

const displayFont = '"Unbounded", "Golos Text", system-ui, sans-serif';
const bodyFont = '"Golos Text", system-ui, -apple-system, "Segoe UI", sans-serif';

export const theme = createTheme({
  // CSS-переменные + класс на <html> нужны, чтобы переключать тему вручную
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#3346D3" },
        secondary: { main: "#1F9D74" },
        background: { default: "#EEF1F6", paper: "#FFFFFF" },
        text: { primary: "#1B2333", secondary: "#5B6578" },
        divider: "#DCE1EA",
      },
    },
    dark: {
      palette: {
        primary: { main: "#8C9BFF" },
        secondary: { main: "#4FD1A5" },
        background: { default: "#11151D", paper: "#191F2B" },
        text: { primary: "#E6E9F0", secondary: "#98A2B5" },
        divider: "#2A3242",
      },
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: bodyFont,
    h6: {
      fontFamily: displayFont,
      fontWeight: 600,
      fontSize: "1.05rem",
      letterSpacing: "-0.01em",
    },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        // цвет маркера под заголовками списков
        ":root": { "--marker": "#FFE36E" },
        ":root.dark": { "--marker": "rgba(250, 204, 21, 0.32)" },
        body: {
          // точечная сетка, как в блокноте
          backgroundImage: `radial-gradient(${(theme.vars ?? theme).palette.divider} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          backgroundAttachment: "fixed",
        },
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            transition: "none !important",
            animation: "none !important",
          },
        },
      }),
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: (theme.vars ?? theme).palette.background.paper,
          borderBottom: `1px solid ${(theme.vars ?? theme).palette.divider}`,
        }),
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          border: `1px solid ${(theme.vars ?? theme).palette.divider}`,
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: (theme.vars ?? theme).palette.background.default,
        }),
      },
    },
    MuiCheckbox: {
      defaultProps: { color: "secondary" },
    },
  },
});
