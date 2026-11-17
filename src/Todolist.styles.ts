import { SxProps, Theme } from "@mui/material";

// сегментированный переключатель фильтров
export const filterButtonsContainerSx: SxProps<Theme> = {
  display: "flex",
  gap: 0.5,
  p: 0.5,
  mt: "auto",
  borderRadius: "12px",
  bgcolor: "background.default",
  border: "1px solid",
  borderColor: "divider",
};

export const getFilterButtonSx = (isActive: boolean): SxProps<Theme> => ({
  flex: 1,
  borderRadius: "8px",
  color: isActive ? "text.primary" : "text.secondary",
  bgcolor: isActive ? "background.paper" : "transparent",
  boxShadow: isActive ? "0 1px 2px rgba(27, 35, 51, 0.12)" : "none",
  "&:hover": { bgcolor: isActive ? "background.paper" : "action.hover" },
});

// маркерная подложка под заголовком списка
export const todolistTitleSx: SxProps<Theme> = {
  minWidth: 0,
  maxWidth: "100%",
  width: "fit-content",
  px: 0.5,
  mx: -0.5,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  backgroundImage:
    "linear-gradient(transparent 58%, var(--marker) 58%, var(--marker) 92%, transparent 92%)",
};

export const getListItemSx = (isDone: boolean): SxProps<Theme> => ({
  px: 0.5,
  py: 0,
  borderRadius: "8px",
  justifyContent: "space-between",
  color: isDone ? "text.secondary" : "text.primary",
  "&:hover": { bgcolor: "action.hover" },
  // зачёркивание «прорисовывается» при отметке задачи
  "& .MuiBox-root > span:not(.MuiCheckbox-root)": {
    backgroundImage: "linear-gradient(currentColor, currentColor)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 55%",
    backgroundSize: isDone ? "100% 1.5px" : "0% 1.5px",
    transition: "background-size 0.25s ease",
  },
  // кнопка удаления проявляется при наведении (только там, где есть hover)
  "@media (hover: hover)": {
    "& .task-delete": { opacity: 0, transition: "opacity 0.15s" },
    "&:hover .task-delete, &:focus-within .task-delete": { opacity: 1 },
  },
});
