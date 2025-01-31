import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config Validation Error ENV ${error.message}`);
}

const enVars: EnvVars = value;

export const envs: EnvVars = {
  PORT: enVars.PORT,
  DATABASE_URL: enVars.DATABASE_URL,
  NATS_SERVERS: enVars.NATS_SERVERS,
};
