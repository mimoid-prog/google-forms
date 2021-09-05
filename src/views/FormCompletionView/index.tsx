import { makeStyles, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "src/components";
import useFormStore from "src/hooks/useFormStore";
import { Form as FormType } from "src/types/Form";
import Form from "./Form";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f5e6ff",
  },
}));

const FormCompletionView = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const { fetchForm } = useFormStore();

  const [form, setForm] = useState<FormType | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForm(id)
      .then((data) => {
        setForm(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  if (error) return <p>Wystąpił błąd!</p>;

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        {!form ? (
          <p>loading...</p>
        ) : (
          <Box>
            <Header title={form.title} description={form.description} />
            <Form fields={form.fields} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FormCompletionView;
