import { makeStyles, Box, Container as MuiContainer } from "@material-ui/core";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
  customMaxWidthSm: {
    maxWidth: 700,
  },
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
    <MuiContainer
      maxWidth={maxWidth}
      classes={{ maxWidthSm: classes.customMaxWidthSm }}
    >
      <Box py={verticalPadding}>{children}</Box>
    </MuiContainer>
  );
};

export default Container;
