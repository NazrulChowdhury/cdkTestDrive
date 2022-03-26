import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda"
export const handler = (event:APIGatewayProxyEvent, context:Context) => {
    return {
        statusCode : 200,
        body : 'it is working!'
    }
}