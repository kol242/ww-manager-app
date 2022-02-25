import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import WpCreateStore from '../../../Stores/Workplaces/WpCreateStore'

export default class CreateWP extends Form {
  plugins() {
    return {
      dvr: dvr({
        package: validatorjs,
        extend: ({ validator, form }) => {
          const messages = validator.getMessages('en')
          messages.required = "This field can't be empty!"
          messages.integer = 'This field must be a number!'
          validator.setMessages('en', messages)
        }
      })
    };
  }

  setup() {
    return {
      fields: [
        {
          name: "name",
          type: "text",
          rules: "required|string",
          placeholder: "Name...",
        },
        {
          name: "description",
          type: "text",
          rules: "required|string",
          placeholder: "Description...",
        },
        {
          name: "salary",
          rules: "required|integer",
          placeholder: "Salary...",
        },
        {
          name: "currency",
          extra: WpCreateStore.currencies
        }
      ]
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        WpCreateStore.createWorkplace(form.values())
        console.log("Success", form.values());
      },
      onError(form) {
        console.log("All form errors", form.errors());
      }
    };
  }
}