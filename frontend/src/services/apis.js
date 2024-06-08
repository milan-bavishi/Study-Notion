const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp"
}

export const categories = {
    CATEGORIES_API: BASE_URL+ "/course/showAllCategories",
}
