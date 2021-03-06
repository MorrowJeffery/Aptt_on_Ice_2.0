const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.address = !isEmpty(data.address) ? data.address: "";
  data.city = !isEmpty(data.city) ? data.city: "";
  data.state = !isEmpty(data.state) ? data.state: "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber: "";
  data.instructorType = !isEmpty(data.instructorType) ? data.instructorType: "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

    //Address check
    if (Validator.isEmpty(data.address)) {
      errors.address = "Address field is required";
    }
  
    //City check
    if (Validator.isEmpty(data.city)) {
      errors.city = "City field is required";
    }
  
    //State check
    if (Validator.isEmpty(data.state)) {
      errors.state = "state field is required";
    }
  
    //Phone number check
    if (Validator.isEmpty(data.phoneNumber)) {
      errors.phoneNumber = "Phone number field is required";
    } else if (!Validator.isMobilePhone(data.phoneNumber)) {
      errors.phoneNumber = "Phone number is invalid";
    }

    //Instructor type check
    if (Validator.isEmpty(data.instructorType)) {
      errors.instructorType = "Instructor type field is required";
    }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
