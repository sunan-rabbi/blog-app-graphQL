import jwt from 'jsonwebtoken'
import config from '../config'
import { IJwtData } from '../types'

export const jwtToken = (data: IJwtData) => {
    const token = jwt.sign(data, (config.jwt.secret as string), { expiresIn: config.jwt.expire, algorithm: 'RS256' })
    return token
}