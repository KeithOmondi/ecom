import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import Header from "../components/Layout/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className= "flex bg-[#f5f5f5] py-10">
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
