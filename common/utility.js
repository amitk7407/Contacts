export const verifyPhoneNumber = (num) => {
    return num.length === 0 || num.length === 10
}

export const verifyEmailAddress = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return reg.test(email)
}