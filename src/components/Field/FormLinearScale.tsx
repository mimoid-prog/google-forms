import {
  makeStyles,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";

import { FormErrorMessage } from "src/components";
import { LinearScaleConfigWithState } from "src/types/FormField";

const useStyles = makeStyles((theme) => ({
  root: {},
  scaleBox: {
    display: "flex",
    alignItems: "flex-end",
    gap: theme.spacing(1),
  },
  formControl: {
    width: "100%",
  },
  radioGroup: {
    justifyContent: "space-between",
  },
  formControlLabel: {
    fontSize: "12px",
    margin: 0,
  },
}));

export type Props = {
  config: LinearScaleConfigWithState;
  handleAction?: (value: string) => void;
};

const FormLinearScale = ({ config, handleAction }: Props) => {
  const classes = useStyles();

  const radios = Array.from(
    Array(parseInt(config.maxScale) - parseInt(config.minScale) + 1),
  ).map((x, i) => {
    const value = (i + parseInt(config.minScale)).toString();

    return (
      <FormControlLabel
        key={value}
        value={value}
        control={<Radio />}
        label={value}
        labelPlacement="top"
        className={classes.formControlLabel}
      />
    );
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handleAction) {
      handleAction(e.target.value);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.scaleBox}>
        <Typography variant="body1"> {config.minText}</Typography>
        <FormControl
          component="fieldset"
          className={classes.formControl}
          disabled={!handleAction}
        >
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={config.state.value}
            onChange={onChange}
            className={classes.radioGroup}
            row
          >
            {radios}
          </RadioGroup>
        </FormControl>
        <Typography variant="body1">{config.maxText}</Typography>
      </Box>
      {!!config.state.error && <FormErrorMessage />}
    </Box>
  );
};

export default FormLinearScale;
