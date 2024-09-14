import Post from '../models/post.js';
import Member from '../models/member.js';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';

export const save = async function (saveRequest, memberId, transaction) {
    try {
        const newPost = await Post.create({
            title: saveRequest.title,
            imageUrl: saveRequest.image,
            problemUrl: saveRequest.url,
            memberId: memberId
        }, {transaction: transaction});
        return newPost;
    } catch (error) {
        console.log(error);
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const countByMemberId = async function (memberId, transaction) {
    try {
        const postCount = await Post.count({
            where: {
                memberId: memberId
            },
        }, {transaction: transaction});
        return postCount;
    } catch (error) {
        console.log(error);
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const findAllWithMember = async function (transaction) {
    try {
        const posts = await Post.findAll({
            include: Member,
            order: [
                ['postId', 'DESC']
            ],
            limit: 20
        }, {transaction: transaction});
        return posts;
    } catch (error) {
        console.log(error);
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

export const findById = async function (postId, transaction) {
    try {
        return await Post.findOne({
            where: {
                postId: postId
            }
        }, {transaction: transaction});
    } catch (error) {
        console.log(error);
        throw new ResponseError({responseCode: RESPONSE_CODE.DB_ERROR});
    }
};

