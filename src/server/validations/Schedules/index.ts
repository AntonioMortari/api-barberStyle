import { Joi, Segments, celebrate } from 'celebrate';

const getAllScheduleValidation = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        date: Joi.date().iso().optional()
    })
});

const createScheduleValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        date: Joi.date().iso().required(),
        client_id: Joi.string().required()
    })
});

export { createScheduleValidation, getAllScheduleValidation };