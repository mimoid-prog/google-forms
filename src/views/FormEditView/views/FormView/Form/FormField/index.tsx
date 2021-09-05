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
import { FormField, FormFieldTypeValue } from "src/types/FormField";
import { ReactNode } from "react";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import FieldContent from "./FieldContent";
import useFormEdit from "src/hooks/useFormEdit";

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
  value: FormFieldTypeValue;
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
  formField: FormField;
  // changeFieldQuestion: (data: { id: string; question: string }) => void;
  // changeFieldType: (data: { id: string; typeValue: string }) => void;
};

const FormFieldComp = ({ formField }: Props) => {
  const classes = useStyles();

  const { changeFieldQuestion, changeFieldType, changeFieldRequired } =
    useFormEdit();

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    changeFieldQuestion({ id: formField.id, question: e.target.value });
  };

  const handleTypeChange = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>
  ) => {
    const newValue = e.target.value as FormFieldTypeValue;

    changeFieldType({ id: formField.id, typeValue: newValue });
  };

  const handleRequiredChange = () => {
    changeFieldRequired(formField.id);
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            value={formField.question}
            onChange={handleQuestionChange}
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
              value={formField.type.value}
              onChange={handleTypeChange}
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
        <FieldContent formField={formField} />
      </Box>
      <Box className={classes.bottomBar}>
        <Divider className={classes.bottomBarDivider} />
        <Box className={classes.bottomBarList}>
          <IconButton disabled>
            <FilterNoneIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlinedIcon />
          </IconButton>
          <Divider orientation="vertical" flexItem />
          <FormControlLabel
            control={
              <Switch
                checked={formField.required}
                onChange={handleRequiredChange}
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
};

export default FormFieldComp;
