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
import CloseIcon from "@material-ui/icons/Close";
import { observer } from "mobx-react-lite";

import useFormCreatorStore from "src/hooks/useFormCreatorStore";
import {
  FormField,
  MultipleChoiceConfig,
  SingleChoiceConfig,
} from "src/types/FormField";

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
  field: FormField;
};

const FieldContent = observer(({ field }: Props) => {
  const classes = useStyles();

  const {
    toggleSchemaProperty,
    changeFieldOption,
    addFieldOption,
    deleteFieldOption,
    changeLinearScaleConfigProperty,
  } = useFormCreatorStore();

  const handleOptionChange = (value: string, optionId: string) => {
    changeFieldOption({ fieldId: field.id, optionId, value });
  };

  switch (field.config.value) {
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
          {field.config.options.map((option) => {
            console.log(option.label);
            return (
              <Box key={option.id} className={classes.optionBox}>
                <Radio disabled />
                <TextField
                  value={option.label}
                  onChange={(e) =>
                    handleOptionChange(e.target.value, option.id)
                  }
                  className={classes.optionTextField}
                />
                <IconButton
                  disabled={
                    (field.config as SingleChoiceConfig).options.length === 1
                  }
                  onClick={() =>
                    deleteFieldOption({
                      fieldId: field.id,
                      optionId: option.id,
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            );
          })}
          {field.schema.allowOtherOption && (
            <Box className={classes.optionBox}>
              <Radio disabled />
              <TextField
                placeholder="Inna odpowiedź..."
                className={classes.optionTextField}
                disabled
              />
              <IconButton
                onClick={() =>
                  toggleSchemaProperty(field.id, "allowOtherOption")
                }
              >
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
                onClick={() => addFieldOption(field.id)}
              >
                Dodaj opcję
              </Button>
              {!field.schema.allowOtherOption && (
                <>
                  <Typography>lub</Typography>
                  <Button
                    color="primary"
                    className={classes.addOptionBtn}
                    onClick={() =>
                      toggleSchemaProperty(field.id, "allowOtherOption")
                    }
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
          {field.config.options.map((option) => (
            <Box key={option.id} className={classes.optionBox}>
              <Checkbox disabled />
              <TextField
                value={option.label}
                onChange={(e) => handleOptionChange(e.target.value, option.id)}
                className={classes.optionTextField}
              />
              <IconButton
                disabled={
                  (field.config as MultipleChoiceConfig).options.length === 1
                }
                onClick={() =>
                  deleteFieldOption({
                    fieldId: field.id,
                    optionId: option.id,
                  })
                }
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
          {field.schema.allowOtherOption && (
            <Box className={classes.optionBox}>
              <Checkbox disabled />
              <TextField
                placeholder="Inna odpowiedź..."
                className={classes.optionTextField}
                disabled
              />
              <IconButton
                onClick={() =>
                  toggleSchemaProperty(field.id, "allowOtherOption")
                }
              >
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
                onClick={() => addFieldOption(field.id)}
              >
                Dodaj opcję
              </Button>
              {!field.schema.allowOtherOption && (
                <>
                  <Typography>lub</Typography>
                  <Button
                    color="primary"
                    className={classes.addOptionBtn}
                    onClick={() =>
                      toggleSchemaProperty(field.id, "allowOtherOption")
                    }
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
                  value={field.config.minScale}
                  onChange={(e) =>
                    changeLinearScaleConfigProperty({
                      fieldId: field.id,
                      value: e.target.value as string,
                      property: "minScale",
                    })
                  }
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
                  value={field.config.maxScale}
                  onChange={(e) =>
                    changeLinearScaleConfigProperty({
                      fieldId: field.id,
                      value: e.target.value as string,
                      property: "maxScale",
                    })
                  }
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
            <Box>{field.config.minScale}</Box>
            <TextField
              value={field.config.minText}
              onChange={(e) =>
                changeLinearScaleConfigProperty({
                  fieldId: field.id,
                  value: e.target.value,
                  property: "minText",
                })
              }
              placeholder="Etykieta (opcjonalna)"
              className={classes.optionTextField}
            />
          </Box>
          <Box className={classes.optionBox}>
            <Box>{field.config.maxScale}</Box>
            <TextField
              value={field.config.maxText}
              onChange={(e) =>
                changeLinearScaleConfigProperty({
                  fieldId: field.id,
                  value: e.target.value,
                  property: "maxText",
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
});

export default FieldContent;
