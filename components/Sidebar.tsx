import React from 'react';

interface SidebarProps {
  currentPage?: 'home' | 'discover' | 'messages' | 'profile';
  userName?: string;
  userAvatar?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage = 'discover', userName = 'John Doe', userAvatar = '' }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#f8fcfb] dark:bg-[#0c1d18] p-4 border-r border-[#e6f4f0] dark:border-[#1a2e29] hidden lg:block">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <div className="flex gap-3 items-center px-3 pt-4">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                 style={{ backgroundImage: userAvatar ? `url(${userAvatar})` : undefined }}
                 title={userName}>
              {!userAvatar && (
                <div className="w-full h-full rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-[#0c1d18] dark:text-white text-base font-bold leading-normal">SEWNA</h1>
              <p className="text-[#45a185] dark:text-[#94c2b3] text-sm font-normal leading-normal">Independent Fashion</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'home'
                ? 'bg-primary/20 dark:bg-primary/30 text-[#0c1d18] dark:text-white'
                : 'text-[#0c1d18] dark:text-white hover:bg-[#e6f4f0] dark:hover:bg-[#1a2e29]'
            }`} href="#">
              <span className="material-symbols-outlined">home</span>
              <p className="text-sm font-medium leading-normal">Home</p>
            </a>
            <a className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'discover'
                ? 'bg-primary/20 dark:bg-primary/30 text-[#0c1d18] dark:text-white'
                : 'text-[#0c1d18] dark:text-white hover:bg-[#e6f4f0] dark:hover:bg-[#1a2e29]'
            }`} href="#">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
              <p className="text-sm font-medium leading-normal">Discover</p>
            </a>
            <a className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'messages'
                ? 'bg-primary/20 dark:bg-primary/30 text-[#0c1d18] dark:text-white'
                : 'text-[#0c1d18] dark:text-white hover:bg-[#e6f4f0] dark:hover:bg-[#1a2e29]'
            }`} href="#">
              <span className="material-symbols-outlined">mail</span>
              <p className="text-sm font-medium leading-normal">Messages</p>
            </a>
            <a className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'profile'
                ? 'bg-primary/20 dark:bg-primary/30 text-[#0c1d18] dark:text-white'
                : 'text-[#0c1d18] dark:text-white hover:bg-[#e6f4f0] dark:hover:bg-[#1a2e29]'
            }`} href="#">
              <span className="material-symbols-outlined">person</span>
              <p className="text-sm font-medium leading-normal">My Profile</p>
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
            <span className="truncate">For Designers</span>
          </button>
          <div className="flex flex-col gap-1 border-t border-[#e6f4f0] dark:border-[#1a2e29] pt-4">
            <a className="flex items-center gap-3 px-3 py-2 text-[#0c1d18] dark:text-white hover:bg-[#e6f4f0] dark:hover:bg-[#1a2e29] rounded-lg transition-colors" href="#">
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium leading-normal">Settings</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-[#0c1d18] dark:text-white hover:bg-[#e6f4f0] dark:hover:bg-[#1a2e29] rounded-lg transition-colors" href="#">
              <span className="material-symbols-outlined">logout</span>
              <p className="text-sm font-medium leading-normal">Log out</p>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;