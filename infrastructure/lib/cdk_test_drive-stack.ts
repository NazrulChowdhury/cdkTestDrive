import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';
import { GenericTable } from '../generic/GenericTable';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTestDriveStack extends Stack {

  private api = new RestApi(this, 'cdk-api')
  private testTable = new GenericTable('first-cdk-table', 'testTableID', this)

  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props);

    // js lambda
    /*const helloLambda = new LambdaFunction(this, 'hello-lambda-function',{
      runtime : Runtime.NODEJS_14_X,
      code : Code.fromAsset(join(__dirname, '../../', 'services', 'hello')),
      handler : 'hello.main'
    })*/
    // ts lambda
    const helloLambda = new NodejsFunction(this, 'hello-lambda-function',{
      entry : (join(__dirname, '../../', 'services', 'hello', 'hello.ts')),
      handler : 'handler'
    })
    //  api lambda integration
    const apiIntegration = new LambdaIntegration(helloLambda)
    const apiResource = this.api.root.addResource('getHello')
    apiResource.addMethod('GET', apiIntegration)
  }
}
