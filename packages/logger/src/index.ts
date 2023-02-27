import { createLogger, transports, format } from 'winston';

import { isDebug, nodeEnv } from 'app-config';

const logLevel = isDebug || nodeEnv === 'development' ? 'debug' : 'info';

const loggerFactory = (labelName: string) =>
  createLogger({
    transports: [
      new transports.Console({
        level: logLevel,
        format: format.combine(
          format.colorize({
            colors: {
              http: 'cyan',
              debug: 'yellow',
            },
          }),
          format.label({ label: labelName }),
          format.align(),
          format.printf(
            ({ level, message, label }) =>
              `${level}: \t[${label}] ${
                typeof message === 'object'
                  ? JSON.stringify(message, null, 2)
                  : message
              }`,
          ),
        ),
      }),
    ],
  });

if (logLevel === 'debug') {
  const log = loggerFactory('Logger');
  log.debug('Debug enabled');
}

export default loggerFactory;
