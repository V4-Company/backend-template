declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      userId: string;
      name: string;
      email: string;
      unitId: string;
      iat: number;
      exp: number;
      message?: string;
      token?: string;
    };
    files: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      destination: string;
      filename: string;
      path: string;
      size: number;
    }[];
    token: string;
  }
}
