
export const formatDate = (datetimeStr) => {
    return datetimeStr?.split("T")[0];
};

export const splitDescription = (description, wordLimit) => {
    const words = description?.split(' ');
    return words?.length > wordLimit ? words?.slice(0, wordLimit).join(' ') + '...' : description;
};
