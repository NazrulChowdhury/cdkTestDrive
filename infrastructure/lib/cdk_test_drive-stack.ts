import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTestDriveStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props);
    new LambdaFunction(this, 'hello-lambda-function',{
      runtime : Runtime.NODEJS_14_X,
      code : Code.fromAsset(join(__dirname, '../../', 'services', 'hello')),
      handler : 'hello.main'
    })
  }
}
