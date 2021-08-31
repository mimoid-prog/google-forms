import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@material-ui/core/styles/createPalette" {
  export interface TypeBackground {
    dark: string;
  }
}
