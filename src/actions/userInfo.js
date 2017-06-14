export const USERINFO_UPDATE = 'USERINFO_UPDATE';

export const updateUserInfo = (userinfo) =>{
    return {
        type:USERINFO_UPDATE,
        userinfo,
    };
};