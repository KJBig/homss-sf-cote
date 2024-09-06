import * as memberService from '../service/memberService.js';

export const getMemberMypage = async function (req, res) {
    const memberId = req.session.memberId;
    try {
        return await memberService.getMypageByMemberId(memberId);
    } catch (error) {
        console.log("memberController.getMemberMypage: ", error);
        return res.status(400).json({ message: '마이페이 조회 실패' });
    }
};

export const withdrawMember = async function (req, res) {
    const memberId = req.session.memberId;
    try {
        memberService.withdrawMember(memberId);
        return res.status(200).json({ message: '회원탈퇴 성공' });
    } catch (error) {
        console.log("memberController.withdrawMember: ", error);
        return res.status(400).json({ message: '회원탈퇴 실패' });
    }
};

export const getRanker = async function (req, res) {
    try {
        return memberService.getRanker();
    } catch (error) {
        console.log("memberController.withdrawMember: ", error);
        return res.status(400).json({ message: '회원탈퇴 실패' });
    }
};