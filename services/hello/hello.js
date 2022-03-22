exports.main = async(event, context) => {
    return{
        statusCode : 200,
        body : "hello from the lambda"
    }
}