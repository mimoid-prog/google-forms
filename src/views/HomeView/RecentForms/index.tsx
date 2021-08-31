import {
  makeStyles,
  Box,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { useState } from "react";
import Container from "src/components/Container";
import useFormStore from "src/hooks/useFormStore";
import FormItem from "./FormItem";

const useStyles = makeStyles((theme) => ({
  root: {},
  noFormsBox: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  noFormsSubtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
  },
  formsList: {
    display: "grid",
    gridTemplateColumns: "100%",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
  },
}));

const RecentForms = observer(() => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const { forms, addForm } = useFormStore();

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h5">Ostatnie formularze</Typography>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={() => {
            addForm(value);
            setValue("");
          }}
        >
          Click
        </button>
        {forms.length === 0 ? (
          <Box className={classes.noFormsBox}>
            <Card>
              <CardContent>
                <Typography variant="h4">
                  Jeszcze nie masz żadnych formularzy
                </Typography>
                <Typography variant="body1" className={classes.noFormsSubtitle}>
                  Aby utworzyć nowy formularz, kliknij +.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box className={classes.formsList}>
            {forms.map((form) => (
              <FormItem key={form.title} form={form} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
});

export default RecentForms;
