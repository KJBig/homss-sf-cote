export const response = ({isSuccess, code, message}) => {
    return {
         isSuccess: isSuccess,
         code: code,
         message: message
    }
};

export const dataResponse = ({isSuccess, code, message}, result) => {
    return {
         isSuccess: isSuccess,
         code: code,
         message: message,
         result: result
    }
};