import { makeStyles, Box, Container as MuiContainer } from "@material-ui/core";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export type Props = {
  children: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  verticalPadding?: number;
};

const Container = ({
  children,
  maxWidth = "lg",
  verticalPadding = 3,
}: Props) => {
  const classes = useStyles();

  return (
    <MuiContainer maxWidth={maxWidth}>
      <Box py={verticalPadding}>{children}</Box>
    </MuiContainer>
  );
};

export default Container;
