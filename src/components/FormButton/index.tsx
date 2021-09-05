import {
  makeStyles,
  Box,
  Button,
  CircularProgress,
  Theme,
} from "@material-ui/core";

type Alignment = "left" | "right";

type StylesProps = {
  alignment: Alignment;
};

const useStyles = makeStyles<Theme, StylesProps>((theme) => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: (props) =>
      props.alignment === "left" ? "row" : "row-reverse",
  },
  loader: {
    margin: (props) =>
      props.alignment === "left"
        ? theme.spacing(0, 0, 0, 2)
        : theme.spacing(0, 2, 0, 0),
  },
}));

export type Props = {
  loading: boolean;
  text?: string;
  alignment?: Alignment;
  mt?: number;
};

const FormButton = ({
  loading,
  text = "Zapisz",
  alignment = "left",
  mt = 2,
  ...props
}: Props) => {
  const classes = useStyles({ alignment });

  return (
    <Box className={classes.root} mt={mt}>
      <Box className={classes.content}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          {...props}
        >
          {text}
        </Button>
        {loading && <CircularProgress size={20} className={classes.loader} />}
      </Box>
    </Box>
  );
};

export default FormButton;
