import path from 'path';

require('dotenv').config({ path: path.join(process.cwd(), '.env') })

export default {
    jwt: {
        secret: process.env.JWT_SECRET,
        expire: process.env.JWT_EXPIRE
    },
    bcrypt: {
        salt: process.env.SALT_ROUND
    }
}