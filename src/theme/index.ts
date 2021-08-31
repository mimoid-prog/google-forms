import { createTheme } from "@material-ui/core";

import typography from "./typography";

export const theme = createTheme({
  palette: {
    background: {},
    primary: {
      light: "#aa85ed",
      main: "#673ab7",
      dark: "#451f87",
    },
  },
  typography,
});
