const Joi=require("joi")
const validatePost = (req, res, next) => {
  const packet = {
    ...req.body,
  };

  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  schema
    .validate(packet)
    .then(() => {
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        message: validationError.errorType,
        errorType: validationError.errorMessage,
      });
    });
};

module.exports={
  validatePost
}