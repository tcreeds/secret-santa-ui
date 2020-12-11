import cdk = require('@aws-cdk/core');
import stackService = require('./service');

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new stackService.SecretSantaUI(this, 'SecretSantaUI');
  }
}
