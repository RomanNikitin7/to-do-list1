import { SxProps } from "@mui/material";

export const filterButtonsContainerSx: SxProps = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "auto",
};

export const getListItemSx = (task: boolean): SxProps => ({
  padding: "0px",
  justifyContent: "space-between",
  opacity: task ? 0.5 : 1,
});
