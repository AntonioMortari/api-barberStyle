import { Joi, Segments, celebrate } from 'celebrate';

const createClientValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().min(3).required()
    })
});

export { createClientValidation };