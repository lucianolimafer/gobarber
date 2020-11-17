import { ValidationError } from 'yup';

interface ValiErrors {
  [Key: string]: string;
}

export default function getValidationErrors(err: ValidationError): ValiErrors {
  const validationErrors: ValiErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
