
import React from 'react';
import SidebarProfile from './SidebarProfile';
import ProfileTabs from './ProfileTabs';

const ProfileSection = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-7xl mx-auto animate-fade-in">
      <SidebarProfile />
      <ProfileTabs />
    </div>
  );
};

export default ProfileSection;
