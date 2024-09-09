import * as requestRepository from '../repository/requestRepository.js';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';
import db from '../models/index.js';

export const saveRequest = async function (memberId, content) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        
        await requestRepository.save(memberId, content, transaction);

        await transaction.commit();
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};