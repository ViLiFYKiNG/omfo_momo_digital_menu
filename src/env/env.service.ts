import ENV_MODEL from './env.model';
import { ENV as ENV_LOCAL } from './env.local';
import { ENV as ENV_TEST } from './env.test';
import { ENV as ENV_PROD } from './env.prod';

export enum Environment {
  LOCAL = 'LOCAL',
  TEST = 'TEST',
  PROD = 'PROD',
}

const { hostname } = window.location;

function getEnvironment(): Environment {
  let env = Environment.PROD;

  if (['localhost', '127.0.0.1'].includes(hostname)) env = Environment.LOCAL;

  const domainParts = hostname.split('.');
  const prefix = domainParts[0];

  switch (prefix) {
    case 'omfomomo-local':
      return Environment.LOCAL;
    case 'omfomomo-test':
      return Environment.TEST;
    default:
      return Environment.PROD;
  }
}

function getEnvSettings(env: string): ENV_MODEL {
  switch (env) {
    case Environment.LOCAL:
      return ENV_LOCAL;
    case Environment.TEST:
      return ENV_TEST;
    case Environment.PROD:
    default:
      return ENV_PROD;
  }
}

export const CURRENT_ENVIRONMENT = getEnvironment();

export default function environment(): ENV_MODEL {
  return getEnvSettings(CURRENT_ENVIRONMENT);
}
