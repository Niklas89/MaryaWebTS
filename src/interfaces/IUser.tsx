export interface IUser {
    id?: number,
    firstName?: string,
    lasteName?: string,
    password?: string,
    pwd?: string,
    email?: string,
    isActive?: number,
    deactivatedDate?: string,
    createdAt?: string,
    updatedAt?: string,
    idRole?: number,
    resetToken?: string,
    resetTokenExpiration?: string,
    refreshToken?: string,
    role?: number,
    persist?: boolean,
    accessToken?: string
}