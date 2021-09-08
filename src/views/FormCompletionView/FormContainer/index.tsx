import { makeStyles, Box } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";

import { Container, ErrorMessage, Spinner } from "src/components";
import FormCompletionProvider from "src/contexts/FormCompletionContext";
import useFormStore from "src/hooks/useFormStore";
import { FormCompletionStore } from "src/stores/FormCompletionStore";
import { Form as FormType } from "src/types/Form";

import Form from "./Form";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export type Props = {
  id: string;
  showResponse: () => void;
};

const FormContainer = ({ id, showResponse }: Props) => {
  const classes = useStyles();

  const { fetchForm } = useFormStore();

  const [form, setForm] = useState<FormType | null>(null);
  const [error, setError] = useState(null);

  const formCompletionStore = useMemo(
    () => (form ? new FormCompletionStore(id, form.fields) : null),
    [form],
  );

  useEffect(() => {
    fetchForm(id)
      .then((data) => {
        setForm(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) return <ErrorMessage error={error} />;

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        {!form || !formCompletionStore ? (
          <Spinner />
        ) : (
          <Box>
            <Header title={form.title} description={form.description} />
            <FormCompletionProvider store={formCompletionStore}>
              <Form showResponse={showResponse} />
            </FormCompletionProvider>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FormContainer;
