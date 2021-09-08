import {
  makeStyles,
  Box,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { useEffect, useState } from "react";

import { Container, ErrorMessage, Spinner } from "src/components";
import useFormStore from "src/hooks/useFormStore";
import { ApiError } from "src/types/ApiError";
import { PreviewForm } from "src/types/PreviewForm";

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

const RecentForms = () => {
  const classes = useStyles();
  const { fetchForms, deleteForm } = useFormStore();
  const [forms, setForms] = useState<PreviewForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    fetchForms({ preview: true })
      .then((forms) => {
        setForms(forms);
        setIsLoading(false);
      })
      .catch((err: ApiError) => {
        setError(err);
      });
  }, []);

  const handleDelete = (id: string) => {
    deleteForm(id);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Typography variant="h5">Ostatnie formularze</Typography>
        {error ? (
          <ErrorMessage error={error} />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <>
            {forms.length === 0 ? (
              <Box className={classes.noFormsBox}>
                <Card>
                  <CardContent>
                    <Typography variant="h4">
                      Jeszcze nie masz żadnych formularzy
                    </Typography>
                    <Typography
                      variant="body1"
                      className={classes.noFormsSubtitle}
                    >
                      Aby utworzyć nowy formularz, kliknij +.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ) : (
              <Box className={classes.formsList}>
                {forms.map((form) => (
                  <FormItem
                    key={form.title}
                    form={form}
                    handleDelete={handleDelete}
                  />
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default RecentForms;
