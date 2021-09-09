import {
  makeStyles,
  Box,
  Typography,
  Divider,
  IconButton,
  Grid,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { Field, FormFieldBox } from "src/components";
import useFormCreatorStore from "src/hooks/useFormCreatorStore";
import { Answer } from "src/types/Answer";
import { FormFieldWithState } from "src/types/FormField";
import { addStateToFields } from "src/utils";

const useStyles = makeStyles((theme) => ({
  root: {},
  noFormText: {
    textAlign: "center",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  paginator: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  noEditText: {
    color: "gray",
  },
  title: {
    marginTop: theme.spacing(2),
  },
  headerDivider: {
    margin: theme.spacing(1, 0),
  },
}));

const getAnswersTitle = (count: number) => {
  let title = `${count} `;

  if (count === 1) {
    title += "odpowiedź";
  } else {
    title += "odpowiedzi";
  }

  return title;
};

const Answers = observer(() => {
  const classes = useStyles();

  const { form } = useFormCreatorStore();

  const [page, setPage] = useState(0);
  const [fieldsWithState, setFieldsWithState] = useState<FormFieldWithState[]>(
    [],
  );

  useEffect(() => {
    if (form && form.answers.length > 0) {
      const answer: Answer | undefined = form.answers[page];
      const newFieldsWithState = addStateToFields(form.fields, answer);
      setFieldsWithState(newFieldsWithState);
    }
  }, [page]);

  return (
    <Box className={classes.root}>
      {!form ? (
        <Typography variant="body1" className={classes.noFormText}>
          Dodaj pola do formularza. <br /> Gdy ktoś wypełni twój formularz,
          odpowiedzi na na niego pojawią się tutaj.
        </Typography>
      ) : (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormFieldBox>
                <Typography variant="h2">
                  {getAnswersTitle(form.answers.length)}
                </Typography>
                <Divider className={classes.divider} />
                <Box className={classes.paginator}>
                  <IconButton
                    disabled={page === 0}
                    onClick={() => setPage((state) => state - 1)}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography variant="body1">{page + 1}</Typography>
                  <IconButton
                    disabled={
                      page === form.answers.length ||
                      page === form.answers.length - 1
                    }
                    onClick={() => setPage((state) => state + 1)}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Box>
              </FormFieldBox>
            </Grid>

            {form.answers.length === 0 ? (
              <Grid item xs={12}>
                <FormFieldBox>
                  <Typography>Oczekuje na odpowiedzi</Typography>
                </FormFieldBox>
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <FormFieldBox header>
                    <Typography variant="body2" className={classes.noEditText}>
                      Odpowiedzi nie można edytować
                    </Typography>
                    <Typography variant="h2" className={classes.title}>
                      {form.title}
                    </Typography>
                    <Divider className={classes.headerDivider} />
                    <Typography variant="body2" color="error">
                      *Wymagane
                    </Typography>
                  </FormFieldBox>
                </Grid>
                {fieldsWithState.map((field) => (
                  <Grid item xs={12} key={Math.random()}>
                    <Field field={field} />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
});

export default Answers;
