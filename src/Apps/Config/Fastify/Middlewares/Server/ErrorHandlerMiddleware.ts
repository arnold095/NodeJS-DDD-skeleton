import { FastifyReply, FastifyRequest } from 'fastify';

import { DomainError } from '../../../../../Contexts/Shared/Domain';

type SchemaValidationError = Error & {
  code?: string;
  statusCode?: number;
  validation?: {
    instancePath: string;
    schemaPath: string;
    keyword: string;
    params: Record<string, unknown>;
    message: string;
  }[];
};

const throwDomainError = (reply: FastifyReply, error: DomainError): void => {
  void reply.status(400).send({
    message: error.message,
  });
};

const throwSchemaValidationError = (
  reply: FastifyReply,
  error: SchemaValidationError,
): void => {
  const errors: {
    message: string;
  }[] = [];

  for (const errorValidation of error?.validation || []) {
    errors.push({
      message: errorValidation.message,
    });
  }

  void reply.status(400).send({
    message: 'Schema validation error',
    errors,
  });
};

const throwUnexpectedError = (reply: FastifyReply, error: Error): void => {
  void reply.status(500).send({
    message: error.message,
  });
};

const isValidationSchemaError = (error: SchemaValidationError): boolean => {
  return error?.code === 'FST_ERR_VALIDATION' && error?.statusCode === 400;
};

const isDomainError = (error: Error): boolean => error instanceof DomainError;

export const ErrorHandlerMiddleware = (
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply,
): void => {
  if (isDomainError(error)) {
    throwDomainError(reply, error);
  } else if (isValidationSchemaError(error)) {
    throwSchemaValidationError(reply, error);
  } else {
    throwUnexpectedError(reply, error);
  }
};
