import jwt from 'jsonwebtoken'
import config from '../config'
import { IJwtData, IJwtDecode } from '../types'

export const jwtToken = async (data: IJwtData) => {
    const token = jwt.sign(data, (config.jwt.secret as string), { expiresIn: config.jwt.expire })
    return token
}

export const jwtDecode = async (data: string) => {
    let decode;
    try {
        decode = jwt.verify(data, (config.jwt.secret as string)) as IJwtDecode
    } catch (error) {
        console.log(error);

    }
    return decode
}