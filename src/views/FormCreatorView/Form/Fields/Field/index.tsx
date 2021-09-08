import {
  makeStyles,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  IconButton,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import RadioButtonCheckedOutlinedIcon from "@material-ui/icons/RadioButtonCheckedOutlined";
import ShortTextOutlinedIcon from "@material-ui/icons/ShortTextOutlined";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

import useFormCreatorStore from "src/hooks/useFormCreatorStore";
import { FormField, FormFieldConfigValue } from "src/types/FormField";

import FieldContent from "./FieldContent";

const useStyles = makeStyles((theme) => ({
  root: {},
  question: {
    width: "100%",
  },
  formControl: {
    width: "100%",
  },
  listItem: {
    padding: 0,
  },
  fieldContentBox: {
    margin: theme.spacing(2, 0, 4),
  },
  bottomBar: {},
  bottomBarDivider: {
    marginBottom: theme.spacing(2),
  },
  bottomBarList: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
}));

type TypeItem = {
  value: FormFieldConfigValue;
  label: string;
  icon: ReactNode;
};

const typeItems: TypeItem[] = [
  {
    value: "shortAnswer",
    label: "Krótka odpowiedź",
    icon: <ShortTextOutlinedIcon />,
  },
  {
    value: "longAnswer",
    label: "Długa odpowiedź",
    icon: <SubjectOutlinedIcon />,
  },
  {
    value: "singleChoice",
    label: "Jednokrotny wybór",
    icon: <RadioButtonCheckedOutlinedIcon />,
  },
  {
    value: "multipleChoice",
    label: "Wielokrotny wybór",
    icon: <CheckBoxIcon />,
  },
  {
    value: "linearScale",
    label: "Skala liniowa",
    icon: <LinearScaleIcon />,
  },
];

export type Props = {
  field: FormField;
};

const Field = observer(({ field }: Props) => {
  const classes = useStyles();

  const {
    fieldsAmount,
    changeFieldQuestion,
    changeFieldConfig,
    toggleSchemaProperty,
    deleteField,
    moveFieldUp,
    moveFieldDown,
  } = useFormCreatorStore();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            value={field.question}
            onChange={(e) => changeFieldQuestion(field.id, e.target.value)}
            placeholder="Pytanie"
            variant="filled"
            label=""
            hiddenLabel
            className={classes.question}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            size="small"
          >
            <InputLabel id="type">Typ odpowiedzi</InputLabel>
            <Select
              value={field.config.value}
              onChange={(e) =>
                changeFieldConfig(
                  field.id,
                  e.target.value as FormFieldConfigValue,
                )
              }
              labelId="type"
              label="Typ odpowiedzi"
            >
              {typeItems.map((typeItem) => (
                <MenuItem key={typeItem.value} value={typeItem.value}>
                  <ListItem dense className={classes.listItem} component="div">
                    <ListItemIcon>{typeItem.icon}</ListItemIcon>
                    <ListItemText>{typeItem.label}</ListItemText>
                  </ListItem>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box className={classes.fieldContentBox}>
        <FieldContent field={field} />
      </Box>
      <Box className={classes.bottomBar}>
        <Divider className={classes.bottomBarDivider} />
        <Box className={classes.bottomBarList}>
          <Tooltip title="Przesuń do góry" placement="bottom">
            <IconButton
              disabled={field.order === 0}
              onClick={() => moveFieldUp(field.id)}
            >
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Przesuń do dołu" placement="bottom">
            <IconButton
              disabled={field.order === fieldsAmount - 1 || fieldsAmount === 1}
              onClick={() => moveFieldDown(field.id)}
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>

          <IconButton disabled>
            <FilterNoneIcon />
          </IconButton>

          <Tooltip title="Usuń" placement="bottom">
            <IconButton onClick={() => deleteField(field.id)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />
          <FormControlLabel
            control={
              <Switch
                checked={field.schema.required}
                onChange={() => toggleSchemaProperty(field.id, "required")}
                name="required"
              />
            }
            label="Wymagane"
            labelPlacement="start"
          />
          <IconButton disabled>
            <MoreVertOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

export default Field;
