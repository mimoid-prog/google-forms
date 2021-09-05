import { FormFieldWithState } from "src/types/FormField";

const messages = {
  required: "Odpowiedź na to pytanie jest wymagana",
  default: "Wystąpił błąd",
};

// const validate = (
//   form,
//   schema: {
//     required?: boolean;
//     allowOtherOption?: boolean;
//   }
// ) => {
//   if (typeof value === "string") {
//     if (schema.required !== undefined) {
//       if (!value) {
//         return messages.required;
//       }
//     }
//   } else if (Array.isArray(value)) {
//     if (schema.required) {
//       if (value.length === 0) {
//         return messages.required;
//       }
//     }
//   } else {
//     return messages.default;
//   }

//   return null;
// };

// const validate = (field: FormFieldWithState) => {
//   if (
//     field.type.value === "shortAnswer" ||
//     field.type.value === "longAnswer" ||
//     field.type.value === "linearScale"
//   ) {
//     if (field.required) {
//       if (field.type.state.value === "") {
//         return messages.required;
//       }
//     }
//   } else if (field.type.value === "singleChoice") {
//     if (field.required) {
//       if (
//         field.type.state.value === null ||
//         (field.type.state.value.name === "other" &&
//           field.type.state.value.label === "")
//       ) {
//         return messages.required;
//       }
//     }
//   } else if (field.type.value === "multipleChoice") {
//     if (field.required) {
//       if (field.type.state.value.length === 0) {
//         return messages.required;
//       }
//     }
//   }

//   return null;
// };

const validate = (field: FormFieldWithState) => {
  if (
    field.type.value === "shortAnswer" ||
    field.type.value === "longAnswer" ||
    field.type.value === "linearScale"
  ) {
    if (field.required) {
      if (field.type.state.value === "") {
        return messages.required;
      }
    }
  } else if (field.type.value === "singleChoice") {
    // if (field.required) {
    //   if (
    //     field.type.state.value === null ||
    //     (field.type.state.value.name === "other" &&
    //       field.type.state.value.label === "")
    //   ) {
    //     return messages.required;
    //   }
    // }
  } else if (field.type.value === "multipleChoice") {
    if (field.required) {
      if (field.type.state.value.length === 0) {
        return messages.required;
      }
    }
  }

  return null;
};

export default validate;
