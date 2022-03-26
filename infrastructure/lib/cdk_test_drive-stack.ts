import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { join } from 'path';
import { GenericTable } from '../generic/GenericTable';

export class CdkTestDriveStack extends Stack {

  private api = new RestApi(this, 'cdk-api')
  private userTable = new GenericTable(this,{
    tableName : 'userTable',
    primaryKey : 'userId',
    createLambdaPath : 'createUser'
    // readLambdaPath : 'readUser',
    // updateLambdaPath : 'updateUser',
    // deleteLambdaPath : 'deleteUser'
  })

  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props);
    const userResource = this.api.root.addResource('user')
    userResource.addMethod('POST', this.userTable.createLambdaIntegration)
    // userResource.addMethod('GET', this.userTable.readLambdaIntegration)
    // userResource.addMethod('PUT', this.userTable.updateLambdaIntegration)
    // userResource.addMethod('DELETE', this.userTable.deleteLambdaIntegration)
  }
}
