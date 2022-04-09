import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dbClient = new DynamoDB.DocumentClient({
region: process.env.AWS_REGION
})
const primaryKey = process.env.PRIMARY_KEY
const tableName = process.env.TABLE_NAME

export const handler = async(event:APIGatewayProxyEvent, context: Context) : Promise <APIGatewayProxyResult> => {

    const result : APIGatewayProxyResult = {
        statusCode : 200,
        body : ''
    }

    try{
        if(event.queryStringParameters?.[primaryKey!]){
                const keyValue = event.queryStringParameters[primaryKey!]
                const queryResponse = await dbClient.query({
                    TableName : tableName!,
                    KeyConditionExpression : '#userId = :id',
                    ExpressionAttributeNames : {
                        "#userId" : primaryKey!,
                    },
                    ExpressionAttributeValues : {
                        ":id" : keyValue
                    }
                }).promise()
                result.body = JSON.stringify(queryResponse)
        } 
        else {
            const queryResponse = await dbClient.scan({
                TableName : tableName!
            }).promise()
            result.body = JSON.stringify(queryResponse)
        }
        
    } catch(error) {
        if(error instanceof Error) { 
            result.statusCode = 400,
            result.body = error.message
        } else {  console.log('something went wrong')
            // result.statusCode = 500,
            // result.body = 'internal server error'
        }
    }
     
    return result
}