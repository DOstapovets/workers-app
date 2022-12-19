import { createLogger, transports, format } from 'winston';

export default (labelName: string) =>
  createLogger({
    transports: [
      new transports.Console({
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
            ({ level, message, label }) => `${level}: \t[${label}] ${message}`,
          ),
        ),
      }),
    ],
  });
