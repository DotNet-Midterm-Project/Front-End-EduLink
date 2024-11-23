import image from "../../assets/imagesecation.png";
import Edud from "../../assets/Home/Edud.png";

function ImageShow(props) {
  // جلب الأدوار من localStorage
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  // التحقق مما إذا كان المستخدم متطوعًا
  const isVolunteer = roles.includes("Volunteer");

  return (
    <div
      className={`relative  rounded-lg`}
      data-te-carousel-init
      data-te-ride="carousel"
    >
      {/* الصورة الخلفية */}
      <div className="relative mx-auto w-full h-40 md:h-60 opacity-90">
        <img src={image} className="block w-full h-full" alt="background" />

        {/* كارت معلومات الطالب */}
        <div
          className="border-4 border-orange-500 ml-8 mt-42 absolute shadow-lg shadow-blue-500/50 bottom-[-40px] p-2 md:p-5 h-32 md:h-36 flex items-center text-left text-black bg-[#E0D9D9CC] bg-opacity-90"
          style={{ borderRadius: "0px 20px 20px 20px" }}
        >
           {isVolunteer && (
          <div className="absolute top-2 right-2">
            <img
              src={Edud}
              alt="Volunteer Logo"
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </div>
        )}
          {/* صورة المستخدم */}
          <div
            className="flex items-center space-x-4"
            style={{ borderRadius: "0px 20px 20px 20px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="84"
              height="84"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                fill="white"
              />
            </svg>
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
