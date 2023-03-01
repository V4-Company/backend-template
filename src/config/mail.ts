interface IMailConfig {
  driver: 'nodeMailer' | 'local';
  devMode: boolean;
}

export default {
  driver: process.env.PAYMENT_DRIVER || 'local',
  devMode: process.env.NODE_ENV !== 'production',
} as IMailConfig;
