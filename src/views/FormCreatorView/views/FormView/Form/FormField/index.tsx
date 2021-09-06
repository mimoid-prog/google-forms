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
} from "@material-ui/core";
import ShortTextOutlinedIcon from "@material-ui/icons/ShortTextOutlined";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import RadioButtonCheckedOutlinedIcon from "@material-ui/icons/RadioButtonCheckedOutlined";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import LinearScaleIcon from "@material-ui/icons/LinearScale";
import { FormField, FormFieldConfigValue } from "src/types/FormField";
import { ReactNode } from "react";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import FieldContent from "./FieldContent";
import { observer } from "mobx-react-lite";
import formCreatorStore from "src/stores/formCreatorStore";

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
    changeFieldQuestion,
    changeFieldConfig,
    toggleSchemaProperty,
    deleteField,
  } = formCreatorStore;

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
                  e.target.value as FormFieldConfigValue
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
          <IconButton disabled>
            <FilterNoneIcon />
          </IconButton>
          <IconButton onClick={() => deleteField(field.id)}>
            <DeleteOutlinedIcon />
          </IconButton>
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
