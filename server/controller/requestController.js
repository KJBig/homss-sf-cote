import * as requestService from '../service/requestService.js';

export const saveRequest = async function (req, res) {
    const memberId = req.session.memberId;
    const { content } = req.body;

    try {
        await requestService.saveRequest(memberId, content);
        return res.status(200).json({ message: '문의사항 등록 성공' });
    } catch (error) {
        console.log("requestController.saveRequest: ", error);
        return res.status(400).json({ message: '문의사항 등록 실패' });
    }
};