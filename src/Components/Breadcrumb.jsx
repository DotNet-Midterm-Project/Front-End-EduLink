import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // تقسيم المسار إلى أجزاء
  const paths = location.pathname.split("/").filter((path) => path);

  // دالة لتنسيق النصوص
  const formatPath = (path) => {
    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="text-blue-500 ml-8 mt-24 text-lg">
      <ul className="flex space-x-2">
        <li>
          <Link to="/student-page">Home</Link>
        </li>
        {paths.map((path, index) => {
          const to = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;
          return (
            <li key={to} className="flex items-center">
              <span className="mx-2">›</span>
              {isLast ? (
                <span className="text-blue-500 text-lg">{formatPath(path)}</span>
              ) : (
                <Link to={to}>{formatPath(path)}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
