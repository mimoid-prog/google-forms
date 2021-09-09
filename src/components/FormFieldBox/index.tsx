import { makeStyles, Paper, Box } from "@material-ui/core";
import clsx from "clsx";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
    borderRadius: theme.spacing(1),
  },
  headerLine: {
    position: "absolute",
    height: 10,
    backgroundColor: theme.palette.primary.main,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  error: {
    border: `1px solid ${theme.palette.error.main}`,
  },
}));

export type Props = {
  children: ReactNode;
  header?: boolean;
  error?: boolean;
};

const FormFieldBox = ({ children, header = false, error = false }: Props) => {
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.root, error && classes.error)}>
      {header && <Box className={classes.headerLine} />}
      {children}
    </Paper>
  );
};

export default FormFieldBox;
