import Member from '../models/member.js';
import Post from '../models/post.js';
import { Sequelize } from 'sequelize';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';

export const save = async function (nickname, password, transaction) {
    try {
        const newMember = await Member.create({
            nickname: nickname,
            password: password
        }, {transaction: transaction});
        return newMember;
    } catch (error) {
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const existsByNickname = async function (nickname, transaction) {
    try {
        const memberCount = await Member.count({
            where: {
                nickname: nickname
            }
        }, {transaction: transaction});
        return memberCount > 0;
    } catch (error) {
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const findByNickname = async function (nickname, transaction) {
    try {
        const member = await Member.findOne({
            where: {
                nickname: nickname
            }
        }, {transaction: transaction});
        return member;
    } catch (error) {
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const findById = async function (memberId, transaction) {
    try {
        const member = await Member.findOne({
            where: {
                memberId: memberId
            }
        }, {transaction: transaction});
        return member;
    } catch (error) {
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const deleteById = async function (memberId, transaction) {
    try {
        Member.destroy({
            where: {
                memberId: memberId
            }
        }, {transaction: transaction});
    } catch (error) {
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const getRankerLimit10 = async function (transaction) {
    try {
        return await Member.findAll({
            attributes: [
                'member_id', 
                'nickname',
                [Sequelize.fn('COUNT', Sequelize.col('Posts.post_id')), 'postCount'] // postCount 속성 추가
            ],
            include: [{
                model: Post,
                attributes: [] // Post 속성은 가져오지 않음, 단순히 조인만 사용
            }],
            group: ['Member.member_id'], // member_id로 그룹화
            order: [
                [Sequelize.literal('postCount'), 'DESC'] // postCount 기준으로 내림차순 정렬
            ]
        });

    } catch (error) {
        console.log(error);
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};