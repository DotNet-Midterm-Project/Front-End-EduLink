import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVolunteers } from "../../Redux/Slices/VolunteerSlice";
import Search from "../../Components/Search";
import NoData from "../../Components/Error/NoData";
import Loading from "../../Components/Loading";
import ServerError from "../../Components/Error/ServerError";
import CourseCard from "../../Components/Student/CourseCard";
import yourProfile from "../../assets/icons/yourProfile.svg";



export default function Volunteers() {
  
  const dispatch = useDispatch();
  const { volunteers, loading, error } = useSelector(
    (state) => state.volunteer
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Fetch volunteers data
  useEffect(() => {
    dispatch(fetchAllVolunteers());
  }, [dispatch]);

console.log(volunteers)
  // Filter volunteers based on search term
  const filteredVolunteers = volunteers?.filter((volunteer) =>
    volunteer.volunteerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ServerError error={error} />;
  }

  return (
    <>
      <div className="mt-28">
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search for volunteers..."
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        {filteredVolunteers?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {filteredVolunteers.map((volunteer) =>
              volunteer.approve ? (
                <CourseCard
                  key={volunteer?.volunteerID}
                  id={volunteer?.volunteerID}
                  name={volunteer?.volunteerName}
                  volunteer = {volunteer}   
                  profile = {volunteer?.profile !== "null" ?volunteer?.profile : yourProfile}       
                //  department={volunteer?.departmentName}
                 location="ShowProfileVolunteer"
                  onClick={() => setSelectedVolunteer(volunteer)} // Set the selected volunteer on click
                />
              ) : null
            )}
          </div>
        ) : (
          <NoData location="volunteer" />
        )}
      </div>

      {/* Render Modal */}
    
    </>
  );
}
