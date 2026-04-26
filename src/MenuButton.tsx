import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

type MenuButtonProps = {
  backgroundColor?: string;
};

export const MenuButton = styled(Button)<MenuButtonProps>(
  ({ backgroundColor, theme }) => ({
    minWidth: "110px",
    fontWeight: "bold",
    boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
    borderRadius: "2px",
    textTransform: "capitalize",
    margin: "0 10px",
    padding: "8px 24px",
    color: theme.palette.primary.contrastText,
    background: backgroundColor || theme.palette.primary.light,

    "&:hover": {
      background: "#1976d2",
      boxShadow: "0 0 0 2px #054B62, 2px 2px 0 0 #054B62",
    },
  }),
);
