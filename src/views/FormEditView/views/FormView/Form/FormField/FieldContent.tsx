import {
  makeStyles,
  Box,
  TextField,
  Radio,
  Typography,
  Button,
  IconButton,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  FormField,
  MultipleChoiceType,
  SingleChoiceType,
} from "src/types/FormField";
import CloseIcon from "@material-ui/icons/Close";
import useFormEdit from "src/hooks/useFormEdit";

const useStyles = makeStyles((theme) => ({
  root: {},
  shortAnswer: {
    width: "50%",
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
  longAnswer: {
    width: "70%",
    "& .MuiInputBase-root.Mui-disabled": {
      color: "black",
    },
  },
  optionBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  optionTextField: {
    width: "100%",
    margin: theme.spacing(0, 1),
  },
  addOptionBox: {
    display: "flex",
    alignItems: "center",
  },
  addOptionBtn: {
    textTransform: "none",
    fontWeight: 700,
  },
  scaleBox: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  scaleTextBox: {
    display: "flex",
    alignItems: "center",
  },
}));

export type Props = {
  formField: FormField;
};

const FieldContent = ({ formField }: Props) => {
  const classes = useStyles();

  const {
    changeFieldOption,
    addFieldOption,
    deleteFieldOption,
    toggleAllowOtherOption,
    changeMinScale,
    changeMinText,
    changeMaxScale,
    changeMaxText,
  } = useFormEdit();

  const handleOptionChange = (value: string, optionId: string) => {
    changeFieldOption({ id: formField.id, optionId, value });
  };

  const handleMinScaleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = e.target.value as string;

    changeMinScale({ formFieldId: formField.id, minScale: value });
  };

  const handleMaxScaleChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const value = e.target.value as string;

    changeMaxScale({ formFieldId: formField.id, maxScale: value });
  };

  switch (formField.type.value) {
    case "shortAnswer":
      return (
        <TextField
          placeholder="Tekst krótkiej odpowiedzi"
          className={classes.shortAnswer}
          disabled
        />
      );
    case "longAnswer":
      return (
        <TextField
          placeholder="Tekst długiej odpowiedzi"
          className={classes.longAnswer}
          disabled
        />
      );
    case "singleChoice": {
      return (
        <Box>
          {formField.type.options.map((option) => (
            <Box key={option.id} className={classes.optionBox}>
              <Radio disabled />
              <TextField
                value={option.label}
                onChange={(e) => handleOptionChange(e.target.value, option.id)}
                className={classes.optionTextField}
              />
              <IconButton
                disabled={
                  (formField.type as SingleChoiceType).options.length === 1
                }
                onClick={() =>
                  deleteFieldOption({
                    formFieldId: formField.id,
                    optionId: option.id,
                  })
                }
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          {formField.type.allowOtherOption && (
            <Box className={classes.optionBox}>
              <Radio disabled />
              <TextField
                placeholder="Inna odpowiedź..."
                className={classes.optionTextField}
                disabled
              />
              <IconButton onClick={() => toggleAllowOtherOption(formField.id)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box className={classes.optionBox}>
            <Radio disabled />
            <Box className={classes.addOptionBox}>
              <Button
                color="secondary"
                className={classes.addOptionBtn}
                onClick={() => addFieldOption(formField.id)}
              >
                Dodaj opcję
              </Button>
              {!formField.type.allowOtherOption && (
                <>
                  <Typography>lub</Typography>
                  <Button
                    color="primary"
                    className={classes.addOptionBtn}
                    onClick={() => toggleAllowOtherOption(formField.id)}
                  >
                    dodaj opcję &quot;Inne&quot;
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      );
    }
    case "multipleChoice": {
      return (
        <Box>
          {formField.type.options.map((option) => (
            <Box key={option.id} className={classes.optionBox}>
              <Checkbox disabled />
              <TextField
                value={option.label}
                onChange={(e) => handleOptionChange(e.target.value, option.id)}
                className={classes.optionTextField}
              />
              <IconButton
                disabled={
                  (formField.type as MultipleChoiceType).options.length === 1
                }
                onClick={() =>
                  deleteFieldOption({
                    formFieldId: formField.id,
                    optionId: option.id,
                  })
                }
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          {formField.type.allowOtherOption && (
            <Box className={classes.optionBox}>
              <Checkbox disabled />
              <TextField
                placeholder="Inna odpowiedź..."
                className={classes.optionTextField}
                disabled
              />
              <IconButton onClick={() => toggleAllowOtherOption(formField.id)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Box className={classes.optionBox}>
            <Checkbox disabled />
            <Box className={classes.addOptionBox}>
              <Button
                color="secondary"
                className={classes.addOptionBtn}
                onClick={() => addFieldOption(formField.id)}
              >
                Dodaj opcję
              </Button>
              {!formField.type.allowOtherOption && (
                <>
                  <Typography>lub</Typography>
                  <Button
                    color="primary"
                    className={classes.addOptionBtn}
                    onClick={() => toggleAllowOtherOption(formField.id)}
                  >
                    dodaj opcję &quot;Inne&quot;
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      );
    }
    case "linearScale":
      return (
        <Box>
          <Box className={classes.scaleBox}>
            <Box>
              <FormControl variant="outlined">
                <InputLabel id="linearScaleMin">Od</InputLabel>
                <Select
                  labelId="linearScaleMin"
                  value={formField.type.minScale}
                  onChange={handleMinScaleChange}
                  label="Od"
                >
                  <MenuItem value="0">0</MenuItem>
                  <MenuItem value="1">1</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>-</Box>
            <Box>
              <FormControl variant="outlined">
                <InputLabel id="linearScaleMin">Od</InputLabel>
                <Select
                  labelId="linearScaleMin"
                  value={formField.type.maxScale}
                  onChange={handleMaxScaleChange}
                  label="Od"
                >
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box className={classes.scaleTextBox}>
            <Box>{formField.type.minScale}</Box>
            <TextField
              value={formField.type.minText}
              onChange={(e) =>
                changeMinText({
                  formFieldId: formField.id,
                  minText: e.target.value,
                })
              }
              placeholder="Etykieta (opcjonalna)"
              className={classes.optionTextField}
            />
          </Box>
          <Box className={classes.optionBox}>
            <Box>{formField.type.maxScale}</Box>
            <TextField
              value={formField.type.maxText}
              onChange={(e) =>
                changeMaxText({
                  formFieldId: formField.id,
                  maxText: e.target.value,
                })
              }
              placeholder="Etykieta (opcjonalna)"
              className={classes.optionTextField}
            />
          </Box>
        </Box>
      );
    default:
      return null;
  }
};

export default FieldContent;
