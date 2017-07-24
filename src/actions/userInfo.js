export const USERINFO_UPDATE = 'USERINFO_UPDATE';

export const updateUserInfo = userinfo => ({
  type: USERINFO_UPDATE,
  userinfo,
});
