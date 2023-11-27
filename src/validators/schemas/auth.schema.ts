import Joi from "joi";

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one digit, and one special character",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const resetPasswordSchema = Joi.object({
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

const emailSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

export default {
  signupSchema,
  loginSchema,
  resetPasswordSchema,
  emailSchema,
};