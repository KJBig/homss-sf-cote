import * as loginService from '../service/loginService.js';

export const loginMember = async function (req, res) {
    const loginRequest = req.body;
    const password = req.header('Authorization');
    try {
        const newMember = await loginService.loginMember(loginRequest, password);
        req.session.memberId = newMember.memberId
        return res.status(200).json({ message: '로그인 성공' });
    } catch (error) {
        console.log("loginController.loginMember: ", error);
        return res.status(400).json({ message: '로그인 실패' });
    }
};

export const joinMember = async function (req, res) {
    const joinRequest = req.body;
    try {
        const newMember = await loginService.joinMember(joinRequest);
        return res.status(200).json({ message: '회원가입 성공' });
    } catch (error) {
        console.log("loginController.joinMember: ", error);
        return res.status(400).json({ message: '회원가입 실패' });
    }
};