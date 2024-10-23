export type IJwtData = {
    userId: string;
    email: string;
}

export type ISignin = {
    email: string;
    password: string;
}

export type IJwtDecode = {
    userId: string;
    email: string;
    iat: number;
    exp: number;
}