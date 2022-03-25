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
    console.log('got an event')
    console.log(event)
    return{
        statusCode : 200,
        body : "hello from the lambda"
    }
}