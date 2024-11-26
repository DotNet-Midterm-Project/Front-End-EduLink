
export const formatDate = (datetimeStr) => {
    return datetimeStr?.split("T")[0];
};

export const EventDateTime = ({ dateTime }) => (
    new Date(dateTime).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric",
       hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

export const splitDescription = (description, wordLimit) => {
    const words = description?.split(' ');
    return words?.length > wordLimit ? words?.slice(0, wordLimit).join(' ') + '...' : description;
};
