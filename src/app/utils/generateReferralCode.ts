export const generateReferralCode = (): string => {
    const prefix = "scx-";
    const randomString = Math.random().toString(36).substring(2, 8);
    // const timestamp = Date.now().toString(36);
  
    return `${prefix}${randomString}`;
};