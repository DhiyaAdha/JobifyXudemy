import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
}

// custom message validation
export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('Company is required'),
    body('position').notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job location is required'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('Job status is invalid'),
    body('jobType')
        .isIn(Object.values(JOB_TYPE))
        .withMessage('Job type is invalid'),
]);