import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuButton } from "./MenuButton";
import { Container, useTheme } from "@mui/material";
import Switch from "@mui/material/Switch";

type Props = {
  onChange: () => void;
};
  
export function ButtonAppBar({ onChange }: Props) {
  const theme = useTheme();
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
                backgroundColor={theme.palette.primary.dark}
              >
                Login
              </MenuButton>
              <MenuButton color="inherit">Logout</MenuButton>
              <MenuButton color="inherit">FAQ</MenuButton>
              <Switch onChange={onChange} color="default" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
