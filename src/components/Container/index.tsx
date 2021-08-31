import { makeStyles, Box, Container as MuiContainer } from "@material-ui/core";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export type Props = {
  children: ReactNode;
  verticalPadding?: number;
};

const Container = ({ children, verticalPadding = 3 }: Props) => {
  const classes = useStyles();

  return (
    <MuiContainer>
      <Box py={verticalPadding}>{children}</Box>
    </MuiContainer>
  );
};

export default Container;
