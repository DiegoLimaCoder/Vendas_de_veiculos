import { z } from 'zod';

export const envValidationSchema = z
  .object({
    PORT: z.coerce.number().optional().default(3000), // Porta padrão do servidor
    DB_TYPE: z.string(),
    DB_HOST: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
    DB_PORT: z.coerce.number().default(5432),
    MAIL_EMAIL: z.string().email(),
    MAIL_PASSWORD: z.string(),
    MAIL_HOST: z.string(),
    JWT_PRIVATE_KEY: z.string(),
    JWT_PUBLIC_KEY: z.string(),
  })
  .required();

export type Env = z.infer<typeof envValidationSchema>;
