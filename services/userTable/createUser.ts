import { DynamoDB } from 'aws-sdk'
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda"
import { v4 as uuidv4 } from "uuid"

const dbClient = new DynamoDB.DocumentClient()

export const handler = async(event:APIGatewayProxyEvent, context:Context) : Promise <APIGatewayProxyResult> => {

    const result: APIGatewayProxyResult = {
        statusCode : 200,
        body : 'user created!'
    }
    const user = typeof event.body == 'object'? event.body : JSON.parse(event.body) 
    user[process.env.PRIMARY_KEY!] = uuidv4()
    
    try{
        await dbClient.put({
            TableName : process.env.TABLE_NAME!,
            Item : user
        }).promise()
    } catch (error ){
        if(error instanceof Error) {
            result.statusCode = 500,
            result.body = error.message
        }
    }
    return result
}