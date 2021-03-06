import { Form } from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import AuthService from '../../Common/Services/AuthService'
import SignupStore from '../../Stores/SignupStore'

export default class SignupForm extends Form {
  plugins() {
    return {
      dvr: dvr({
        package: validatorjs,
        extend: ({ validator, form }) => {
          const messages = validator.getMessages('en')
          messages.required = "This field can't be empty!"
          messages.same = "Passwords are not matching!"
          messages.integer = "This field must be a number!"
          messages.between = "Password must be between 6 and 20 characters"
          validator.setMessages('en', messages)
        }
      })
    };
  }

  setup() {
    return {
      fields: [
        {
          name: "email",
          type: "text",
          rules: "required|string",
          label: "Email",
        },
        {
          name: "username",
          type: "text",
          rules: "required|string",
          label: "Username",
        },
        {
          name: "company",
          type: "text",
          rules: "required|string",
          label: "Company Name",
        },
        {
          name: "activity",
          type: "text",
          rules: "required|string",
          label: "Company Activity",
        },
        {
          name: "password",
          type: "password",
          path: "password",
          rules: "required|string|between:6,20",
          label: "Password",
        },
        {
          name: "confirmPass",
          type: "password",
          path: "password",
          rules: "required|string|between:6,20|same:password",
          label: "Confirm password",
        },
        {
          name: "country",
          label: "Country",
          type: "text",
          extra: SignupStore.countries
        }
      ]
    };
  }

  hooks() {
    return {
      onSuccess(form) {
        AuthService.signup(form.values())
        console.log("Form Values: ", form.values());
      },
      onError(form) {
        // get all form errors
        console.log("All form errors", form.errors());
      }
    };
  }
}