import * as memberRepository from '../repository/memberRepository.js';
import * as postRepository from '../repository/postRepository.js';
import ResponseError from '../common/responseError.js'
import RESPONSE_CODE from '../common/responseCode.js';
import db from '../models/index.js';

export const savePost = async function (saveRequest, memberId) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        
        const member = await memberRepository.findById(memberId, transaction);
        if (member == null) {
            throw new ResponseError({responseCode: RESPONSE_CODE.MEMBER_NOT_FOUND_ERROR});
        }
        
        const newPost = await postRepository.save(saveRequest, member.memberId, transaction);

        await transaction.commit();
        return newPost;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};

export const getAllPost = async function () {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        
        const posts = await postRepository.findAllWithMember(transaction);

        const results = [];

        for(let i=0; i<posts.length; i++) {
            const time = posts[i].createdAt;
            const date = new Date(time);

            // 연도, 월, 일, 시, 분, 초를 추출
            const year = date.getFullYear().toString().slice(-2); // '24'
            const month = String(date.getMonth() + 1).padStart(2, '0'); // '09'
            const day = String(date.getDate()).padStart(2, '0'); // '04'
            const hours = String(date.getHours()).padStart(2, '0'); // '14'
            const minutes = String(date.getMinutes()).padStart(2, '0'); // '42'
            const seconds = String(date.getSeconds()).padStart(2, '0'); // '16'

            const dto = {
                postId: posts[i].postId,
                memberNickname: posts[i].Member.nickname,
                title: posts[i].title,
                imageUrl: posts[i].imageUrl,
                problemUrl: posts[i].problemUrl,
                createdAt: `${year}-${month}-${day}/${hours}:${minutes}:${seconds}`
            }
            results.push(dto);
        }

        await transaction.commit();
        // return posts;
        return results;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};

export const getPostDetail = async function (postId) {
    let transaction;

    try {
        transaction = await db.sequelize.transaction();
        const post = await postRepository.findById(postId, transaction);

        await transaction.commit();
        return post;
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }

};