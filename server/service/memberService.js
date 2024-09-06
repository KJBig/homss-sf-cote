import * as memberRepository from '../repository/memberRepository.js';
import * as postRepository from '../repository/postRepository.js';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';
import db from '../models/index.js';

export const getMypageByMemberId = async function (memberId) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        
        const member = await memberRepository.findById(memberId, transaction);
        if (member == null) {
            throw new ResponseError({responseCode: RESPONSE_CODE.MEMBER_NOT_FOUND_ERROR});
        }

        const solvedCount = await postRepository.countByMemberId(memberId, transaction);
        
        await transaction.commit();
        return {
            "nickname": member.nickname,
            "solvedCount": solvedCount
        }
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};

export const withdrawMember = async function (memberId) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        
        const member = await memberRepository.deleteById(memberId, transaction);
        
        await transaction.commit();
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};

export const getRanker = async function () {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        
        const rankers = await memberRepository.getRankerLimit10(transaction);
        
        const results = [];

        for(let i=0; i<rankers.length; i++) {
            const dto = {
                rank: `${i+1}등`,
                nickname: rankers[i].nickname,
                solvedCount: rankers[i].get('postCount')
            }

            results.push(dto);
        }

        await transaction.commit();
        return results;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};