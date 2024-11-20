import { Link } from "react-router-dom";

function SideBar({ onClose }) {
const user = localStorage.getItem("userName") || "";

  return (
    <>
      <div className="fixed top-0 right-0 h-screen w-64 bg-[#0D47A1]">
        <div className="h-screen w-64 pb-10">
          <div className="flex h-screen flex-grow flex-col rounded-br-lg rounded-tr-lg bg-[#0D47A1] shadow-md">
            <div className="flex mt-4 items-center px-4">
              <svg
                className=" h-8 w-8 align-middle hover:text-[#F28E33]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#ffffff"
                    stroke-width="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <div className="flex ml-3 flex-col">
                <h3 className="font-medium text-white">{user}</h3>
              </div>
              <div className="ml-14">
                <button onClick={onClose}>
                  <svg
                    fill="#ffffff"
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xml:space="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <polygon points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 512,452.922 315.076,256 "></polygon>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative inline-block mx-4">
              <hr className="h-px mt-4 bg-white border-0 dark:bg-white" />
            </div>
            <div className="flex mt-3 flex-1 flex-col">
              <div className="">
                <nav className="flex-1">
                  <Link
                    href="#"
                    title=""
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle hover:text-[#F28E33]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#ffffff"
                      width="24"
                      height="24"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                    Your Profile
                  </Link>

                  <Link
                    href="/student-page"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle"
                      width="130px"
                      height="130px"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M29 3.5C29 2.67157 28.3284 2 27.5 2C26.6716 2 26 2.67157 26 3.5V6.50082C26 7.32925 26.6716 8.00082 27.5 8.00082C28.3284 8.00082 29 7.32925 29 6.50082V3.5Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M14 4.18945H12.0356C9.82644 4.18945 8.03558 5.98031 8.03558 8.18945V36.1895C8.03558 38.3986 9.82644 40.1895 12.0356 40.1895H32.0356C34.2447 40.1895 36.0356 38.3986 36.0356 36.1895V8.18945C36.0356 5.98031 34.2447 4.18945 32.0356 4.18945H30V6.5C30 7.88071 28.8807 9 27.5 9C26.1193 9 25 7.88071 25 6.5V4.18945H19V6.5C19 7.88071 17.8807 9 16.5 9C15.1193 9 14 7.88071 14 6.5V4.18945ZM14 15C14 14.4477 14.4477 14 15 14H29C29.5523 14 30 14.4477 30 15C30 15.5523 29.5523 16 29 16H15C14.4477 16 14 15.5523 14 15ZM15.0355 19.1895C14.4832 19.1895 14.0355 19.6372 14.0355 20.1895C14.0355 20.7417 14.4832 21.1895 15.0355 21.1895H29.0355C29.5878 21.1895 30.0355 20.7417 30.0355 20.1895C30.0355 19.6372 29.5878 19.1895 29.0355 19.1895H15.0355ZM14.0355 25.1895C14.0355 24.6372 14.4832 24.1895 15.0355 24.1895H29.0355C29.5878 24.1895 30.0355 24.6372 30.0355 25.1895C30.0355 25.7417 29.5878 26.1895 29.0355 26.1895H15.0355C14.4832 26.1895 14.0355 25.7417 14.0355 25.1895ZM15.0355 29.2441C14.4832 29.2441 14.0355 29.6919 14.0355 30.2441C14.0355 30.7964 14.4832 31.2441 15.0355 31.2441H23.0355C23.5878 31.2441 24.0355 30.7964 24.0355 30.2441C24.0355 29.6919 23.5878 29.2441 23.0355 29.2441H15.0355Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M5.03553 8.95703C5.58781 8.95703 6.03553 9.40475 6.03553 9.95703L6.03552 36.9996C6.03552 39.761 8.2741 41.9996 11.0355 41.9996H30.1001C30.6524 41.9996 31.1001 42.4473 31.1001 42.9996C31.1001 43.5518 30.6524 43.9996 30.1001 43.9996H11.0355C7.16953 43.9996 4.03552 40.8655 4.03552 36.9996L4.03553 9.95703C4.03553 9.40475 4.48324 8.95703 5.03553 8.95703Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M16.5086 2C17.337 2 18.0086 2.67157 18.0086 3.5V6.50082C18.0086 7.32925 17.337 8.00082 16.5086 8.00082C15.6802 8.00082 15.0086 7.32925 15.0086 6.50082V3.5C15.0086 2.67157 15.6802 2 16.5086 2Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M42 10H40C38.8954 10 38 10.8954 38 12V16H44V12C44 10.8954 43.1046 10 42 10Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M44 17H38V35L41 39L44 35V17Z"
                          fill="#ffffff"
                        ></path>{" "}
                      </g>
                    </svg>
                    Your Courses
                  </Link>
                  <Link
                    href="#"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    Your Events
                  </Link>

                  <Link
                    href="#"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 15H8M11 15H13M16 15H18M6 18H8M11 18H13M16 18H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          strokeLinecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                    Book a Session
                  </Link>
                  <div className="relative w-[280px] inline-block mx-4">
                    <hr className="h-px bg-white border-0 dark:bg-white" />
                  </div>
                  <Link
                    href="#"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle"
                     fill="#ffffff" viewBox="0 0 16 16" id="register-16px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="Path_184" data-name="Path 184" d="M57.5,41a.5.5,0,0,0-.5.5V43H47V31h2v.5a.5.5,0,0,0,.5.5h5a.5.5,0,0,0,.5-.5V31h2v.5a.5.5,0,0,0,1,0v-1a.5.5,0,0,0-.5-.5H55v-.5A1.5,1.5,0,0,0,53.5,28h-3A1.5,1.5,0,0,0,49,29.5V30H46.5a.5.5,0,0,0-.5.5v13a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-2A.5.5,0,0,0,57.5,41ZM50,29.5a.5.5,0,0,1,.5-.5h3a.5.5,0,0,1,.5.5V31H50Zm11.854,4.646-2-2a.5.5,0,0,0-.708,0l-6,6A.5.5,0,0,0,53,38.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.354-.146l6-6A.5.5,0,0,0,61.854,34.146ZM54,40V38.707l5.5-5.5L60.793,34.5l-5.5,5.5Zm-2,.5a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,40.5Zm0-3a.5.5,0,0,1-.5.5h-2a.5.5,0,0,1,0-1h2A.5.5,0,0,1,52,37.5ZM54.5,35h-5a.5.5,0,0,1,0-1h5a.5.5,0,0,1,0,1Z" transform="translate(-46 -28)"></path> </g></svg>
                    Register as a Volunteer
                  </Link>

                  <div className="relative w-[280px] inline-block mx-4">
                    <hr className="h-px bg-white border-0 dark:bg-white" />
                  </div>

                  <Link
                    href="#"
                    className="flex cursor-pointer items-center border-l-[#F28E33] py-2 px-4 text-sm font-medium text-white outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-[#F28E33] hover:text-gray-200 focus:border-l-4"
                  >
                    <svg
                      className="mr-4 h-5 w-5 align-middle"
                       viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill="#ffffff"></path> </g></svg>
                      Profile Settings
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
