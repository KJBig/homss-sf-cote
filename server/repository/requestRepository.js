import Request from '../models/request.js';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';

export const save = async function (memberId, content, transaction) {
    try {
        const newRequest = await Request.create({
            content: content,
            memberId: memberId
        }, {transaction: transaction});
        return newRequest;
    } catch (error) {
        console.log(error);
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};