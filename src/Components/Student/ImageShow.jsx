import image from "../../assets/imagesecation.png";
import Edud from "../../assets/Home/Edud.png";
import { EduLinklogo, yourProfile } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileImage } from "../../Redux/Slices/ImageProfileSlice";
import { useEffect } from "react";
function ImageShow(props) {
  const dispatch = useDispatch();
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const { profileImage } = useSelector((state) => state.profile);
  const isVolunteer = roles.includes("Volunteer");
 
  useEffect(()=>{
    dispatch(fetchProfileImage())
  },[dispatch])

  return (
    <div
      className={`relative  rounded-lg`}
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <div className="relative mx-auto w-full h-40 md:h-60 opacity-90">
        <img src={image} className="block w-full h-full" alt="background" />
        <div
          className="border-4 border-orange-500 ml-8 mt-42 absolute shadow-lg shadow-blue-500/50 bottom-[-40px] p-2 md:p-5 h-32 md:h-36 flex items-center text-left text-black bg-[#E0D9D9CC] bg-opacity-90"
          style={{ borderRadius: "0px 20px 20px 20px" }}
        >
          {isVolunteer && (
            <div className="absolute top-2 right-2">
              <img
                src={EduLinklogo}
                alt="Volunteer Logo"
                className="w-8 h-8 md:w-12 md:h-8"
              />
            </div>
          )}
          <div
            className="flex items-center space-x-4"
            style={{ borderRadius: "0px 20px 20px 20px" }}
          >
              <img
              src={profileImage ? 
                `${import.meta.env.VITE_URL_BACKEND}/Resources/${profileImage?.imageProfile}` : `${yourProfile}`
              }
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full border"
              />
            <div>
              <h5 className="text-lg md:text-2xl font-bold mt-1">
                {props.user}
              </h5>
              <p className="text-sm md:text-base">{props.email}</p>
            </div>
          </div>
        </div>

        {/* شعار المشروع في الزاوية إذا كان متطوعًا */}
      </div>
    </div>
  );
}

export default ImageShow;
