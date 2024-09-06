import * as memberRepository from '../repository/memberRepository.js';
import * as passwordUtil from '../common/passwordUtil.js';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';
import db from '../models/index.js';

export const joinMember = async function (joinRequest) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();

        const isExists = await memberRepository.existsByNickname(joinRequest.nickname, transaction);
        if (isExists) {
            throw new ResponseError({responseCode: RESPONSE_CODE.MEMBER_NICKNAME_ALREADY_EXIST_ERROR});
        }

        const encryptedPassword = await passwordUtil.encryptPassword(joinRequest.password);
        const newMember = await memberRepository.save(joinRequest.nickname, encryptedPassword,  transaction);

        await transaction.commit();
        return newMember;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};

export const loginMember = async function (loginRequest, password) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        const member = await memberRepository.findByNickname(loginRequest.nickname, transaction);
        
        if (member == null) {
            throw new ResponseError({responseCode: RESPONSE_CODE.MEMBER_NOT_FOUND_ERROR});
        }

        const isMached = await passwordUtil.decryptPassword(password, member.password);
        if (!isMached) {
            throw new ResponseError({responseCode: RESPONSE_CODE.PASSWORD_NOT_MATCH_ERROR});
        }
        await transaction.commit();
        return member;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};