import {SecretsManager} from 'aws-sdk';

export const loadEnvironmentVariables = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      return resolve();
    }

    if (!process.env.APP_ENV) {
      return reject(new Error('APP_ENV loading failed'));
    }

    // Load secrets from AWS SecretsManager
    // https://docs.aws.amazon.com/code-samples/latest/catalog/javascript-secrets-secrets_getsecretvalue.js.html
    const awsClient = new SecretsManager({
      region: 'ap-northeast-2',
    });
    const secretName = `${process.env.APP_ENV}/lms`;

    awsClient.getSecretValue({SecretId: secretName}, (err, data) => {
      if (err) {
        switch (err.code) {
          case 'DecryptionFailureException': {
            return reject(
              new Error(
                "Secrets Manager can't decrypt the protected secret text using the provided KMS key"
              )
            );
          }
          case 'InternalServiceErrorException': {
            return reject(new Error('An error occurred on the server side'));
          }
          case 'InvalidParameterException': {
            return reject(
              new Error('You provided an invalid value for a parameter')
            );
          }
          case 'InvalidRequestException': {
            return reject(
              new Error(
                'You provided a parameter value that is not valid for the current state of the resource'
              )
            );
          }
          case 'ResourceNotFoundException': {
            return reject(
              new Error("We can't find the resource that you asked for")
            );
          }
        }
      }

      if (!data?.SecretString) {
        return reject(new Error('Secret loading failed'));
      }

      const secrets = JSON.parse(data.SecretString!);

      Object.keys(secrets).forEach(key => {
        process.env[key] = secrets[key];
      });

      resolve();
    });
  });
};
