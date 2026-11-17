import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuButton } from "./MenuButton";
import { Container } from "@mui/material";
import { useColorScheme, useTheme } from "@mui/material/styles";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

export function ButtonAppBar() {
  const theme = useTheme();
  const { mode, systemMode, setMode } = useColorScheme();
  // mode может быть "system" — тогда реальную тему берём из systemMode
  const isDark = (mode === "system" ? systemMode : mode) === "dark";

  const changeMode = () => {
    setMode(isDark ? "light" : "dark");
  };
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo List
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
              <MenuButton
                color="inherit"
                backgroundColor={theme.vars?.palette.primary.main}
              >
                Login
              </MenuButton>
              <MenuButton color="inherit">Logout</MenuButton>
              <MenuButton color="inherit">FAQ</MenuButton>
              {mode && (
                <IconButton
                  onClick={changeMode}
                  aria-label={isDark ? "Light theme" : "Dark theme"}
                  sx={{ ml: 1 }}
                >
                  {isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
