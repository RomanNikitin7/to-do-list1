import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

type MenuButtonProps = {
  backgroundColor?: string;
};

export const MenuButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})<MenuButtonProps>(({ backgroundColor, theme }) => {
  // theme.vars — CSS-переменные, они меняются вместе с цветовой схемой
  const palette = (theme.vars ?? theme).palette;
  return {
    minWidth: 0,
    margin: "0 2px",
    padding: "6px 14px",
    borderRadius: "999px",
    fontWeight: 600,
    color: backgroundColor
      ? palette.primary.contrastText
      : palette.text.primary,
    background: backgroundColor || "transparent",

    "&:hover": {
      background: backgroundColor || palette.action.hover,
      filter: backgroundColor ? "brightness(1.08)" : "none",
    },
  };
});
