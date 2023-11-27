import Joi from "joi";

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .regex(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .required()
    .label("Password")
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one digit, and one special character",
    }),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} must match with password!" }),
});

export default {
  changePasswordSchema,
};
