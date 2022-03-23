// js code
/*
exports.main = async(event, context) => {
    return{
        statusCode : 200,
        body : "hello from the lambda"
    }
}
*/

export const handler = async(event: any, context: any) => {
    return{
        statusCode : 200,
        body : "hello from the lambda"
    }
}