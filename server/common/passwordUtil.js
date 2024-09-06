import bcrypt from 'bcrypt';

export const encryptPassword = async function (password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export const decryptPassword = async function (password, encryptPassword) {
    return await bcrypt.compare(password, encryptPassword);
}