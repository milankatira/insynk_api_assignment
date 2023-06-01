const Joi=require("joi")
 const validateSignup = async (req, res, next) => {
  const packet = {
    ...req.body,
  };

  const schema = joi.object({
    username: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(16)
      .required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,20})/)
      .messages({
        'string.pattern.base': `Password should be a One Uppercase, One Lowercase, One Number and One Special Case Character`,
        'string.empty': `Password should be a minimum of 8 characters. Max 16 characters`,
        'string.min': `Password should be a minimum of 8 characters. Max 16 characters`,
        'string.max': `Password should be a minimum of 8 characters. Max 16 characters`,
      }),
  });

  try {
    const result = await schema.validateAsync(packet);
    if (result) {
      next();
    }
  } catch (error) {
    return res.status(400).json({
      message: error,
      errorType: "VALIDATION_ERROR",
    });
  }
};

const validateSignIn = async (req, res, next) => {
  const packet = {
    ...req.body,
  };

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(8)
      .max(16)
      .required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,20})/)
      .messages({
        'string.pattern.base': `Password should be a One Uppercase, One Lowercase, One Number and One Special Case Character`,
        'string.empty': `Password should be a minimum of 8 characters. Max 16 characters`,
        'string.min': `Password should be a minimum of 8 characters. Max 16 characters`,
        'string.max': `Password should be a minimum of 8 characters. Max 16 characters`,
      }),
  });

  try {
    const result = await schema.validateAsync(packet);
    if (result) {
      next();
    }
  } catch (error) {
    return res.status(400).json({
        message: error,
        errorType: "VALIDATION_ERROR",
    });
  }
};

module.exports={
  validateSignup,
  validateSignIn
}