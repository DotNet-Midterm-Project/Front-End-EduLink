import React from "react";

const TeamCard = ({ name, role }) => {
    return (
        <div className="text-center bg-gray-100 p-6 rounded-lg shadow-md">
            <img
                src="/images/default-avatar.png"
                alt={`${name}'s Avatar`}
                className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-lg font-bold text-blue-900">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
        </div>


    );
};

export default TeamCard;
