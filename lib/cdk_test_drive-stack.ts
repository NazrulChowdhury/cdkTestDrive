import { Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkTestDriveStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) { 
    super(scope, id, props);
    new Bucket(this,'sampleBucket',{
      lifecycleRules:[
        {
          
        }
      ]
    })
  }
}
