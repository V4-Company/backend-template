import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import { UsersApi } from '@shared/utils/UsersApi';
import { CustomerApi } from '@shared/utils/CustomerApi';
import { LegacyFinanceAPI } from '@shared/utils/LegacyFinanceApi';
import { UnitsAPI } from '@shared/utils/UnitsApi';

interface IValidateAuth {
  userId: string;
  name: string;
  email: string;
  unitId: string;
  iat: number;
  exp: number;
  message?: string;
  token?: string;
}

export default async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const validateToken = await UsersApi.post<IValidateAuth>('auth/validate', {
      token,
    });

    const decoded = validateToken.data;

    if (!decoded) throw new AppError('Invalid JWT token', 401);

    if (decoded.message) throw new AppError(decoded.message, 401);

    (<Request>request).user = decoded;

    UsersApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    CustomerApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    LegacyFinanceAPI.defaults.headers.common.Authorization = `Bearer ${process.env.LEGACY_FINANCE_TOKEN}`;
    UnitsAPI.defaults.headers.common.Authorization = `Bearer ${token}`;

    return next();
  } catch (e) {
    if (e instanceof AppError) {
      throw new AppError(e.message, e.statusCode);
    }

    const typedError = e as { message: string };

    if (typedError?.message.includes('ECONNREFUSED')) {
      throw new AppError('Could not connect to User service', 401);
    }

    throw new AppError('Invalid JWT token', 401);
  }
}
