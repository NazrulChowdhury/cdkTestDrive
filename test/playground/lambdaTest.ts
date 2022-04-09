import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { handler } from "../../services/userTable/readUser"


async function test() {
    const event : APIGatewayProxyEvent = {
        queryStringParameters : {
            userId : "8d2c88a3-1489-418c-8dc8-ec9249575482"
        }
    } as any
    const res = await handler(event,{} as any)
    const items = await JSON.parse(res.body)
        console.log(items)
}

test()