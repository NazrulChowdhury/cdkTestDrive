import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTestDriveStack extends Stack {

  private api = new RestApi(this, 'cdk-api')

  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, 'hello-lambda-function',{
      runtime : Runtime.NODEJS_14_X,
      code : Code.fromAsset(join(__dirname, '../../', 'services', 'hello')),
      handler : 'hello.main'
    })
    //  api lambda integration
    const apiIntegration = new LambdaIntegration(helloLambda)
    const apiResource = this.api.root.addResource('getHello')
    apiResource.addMethod('GET', apiIntegration)
  }
}
