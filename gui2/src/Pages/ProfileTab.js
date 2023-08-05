import React, { useContext } from "react";
import DataContext from '../contexts/DataContext';

const ProfilePage = ({ user }) => {
  const data = useContext(DataContext);
  let userId = "anonymous neighbor"
  if (user && user.auth && user.auth.currentUser && user.auth.currentUser.displayName && !user.auth.currentUser.isAnonymous) {
    userId = user.auth.currentUser.displayName;
 }
  return (
    <div>
      Welcome, {userId}!
    </div>
  );
};

export default ProfilePage;
