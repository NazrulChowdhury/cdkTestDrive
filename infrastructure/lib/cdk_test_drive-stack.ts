import { Stack, StackProps } from 'aws-cdk-lib'
import { RestApi } from 'aws-cdk-lib/aws-apigateway'
import { Construct } from 'constructs'
import { GenericTable } from '../generic/GenericTable'

export class CdkTestDriveStack extends Stack {

  private api = new RestApi(this, 'cdk-api')
  private userTable = new GenericTable(this,{
    tableName : 'userTable',
    primaryKey : 'userId',
    createLambdaPath : 'createUser',
    readLambdaPath : 'readUser',
    // updateLambdaPath : 'updateUser',
    // deleteLambdaPath : 'deleteUser'
  })

  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props)
    // resource 
    const userResource = this.api.root.addResource('user')
    // api integration
    userResource.addMethod('POST', this.userTable.createLambdaIntegration)
    userResource.addMethod('GET', this.userTable.readLambdaIntegration)
    // userResource.addMethod('PUT', this.userTable.updateLambdaIntegration)
    // userResource.addMethod('DELETE', this.userTable.deleteLambdaIntegration)
  }
}
