import { celebrate, Joi, Segments } from 'celebrate';

const createRootValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3)
    })
});

export { createRootValidation };