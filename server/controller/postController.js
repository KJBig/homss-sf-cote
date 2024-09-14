import * as postService from '../service/postService.js';

export const saveNewPost = async function (req, res) {
    const saveRequest = req.body;
    const memberId = req.session.memberId;
    try {
        const newMember = await postService.savePost(saveRequest, memberId);
        return res.status(200).json({ message: '등록 성공' });
    } catch (error) {
        console.log("postController.saveNewPost: ", error);
        return res.status(400).json({ message: '등록 실패' });
    }
};

export const getAllPost = async function (req, res) {
    try {
        return await postService.getAllPost();
    } catch (error) {
        console.log("postController.saveNewPost: ", error);
        return res.status(400).json({ message: '조회 실패' });
    }
};

export const getPostDetail = async function (req, res, postId) {
    try {
        const post = await postService.getPostDetail(postId);
        return post;
    } catch (error) {
        console.log("postController.saveNewPost: ", error);
        return res.status(400).json({ message: '조회 실패' });
    }
};