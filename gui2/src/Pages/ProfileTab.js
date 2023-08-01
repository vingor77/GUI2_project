import React, { useContext } from "react";
import DataContext from '../contexts/DataContext';

const ProfilePage = ({ user }) => {
  const data = useContext(DataContext);
  return (
    <div>
      hi
    </div>
  );
};

export default ProfilePage;
