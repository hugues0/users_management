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



export default {
  signupSchema,
  loginSchema,
};