/* eslint-disable jsx-a11y/alt-text */
import MetaData from '@/components/MetaData';
import Profile from '@/components/icons/p'
import Card from '@/components/Card'

import CustomButton from '@/components/CustomButton';

const handleLogout = () => {
  // Implement your logout logic here
  console.log('Logging out...');
};
export default function Gsap() {
    return(
        <>
            <MetaData
                title="GSAP"
            />
  <div className='mt-52 grid gap-8 justify-center md:grid-cols-2'>
  <div className='flex items-center justify-center w-60 h-60 pl-12'>
    <Profile />
  </div>
  <div className='pr-12'>
  <div className="w-full  h-[239px] bg-gradient-to-r from-orange-500 via-amber-300 to-orange-200 rounded-lg border border-red-800 mr-56">
    <div className="text-center text-white text-2xl md:text-3xl font-normal tracking-wide">BALANCES</div>
    <div className="flex justify-center mt-4">
      <img className="w-[83px] h-[83px] rounded-full border border-red-800" src="https://via.placeholder.com/83x83" alt="Profile" />
    </div>
    </div>
  </div>
</div>
<div className='mt-12'>
<div className=" pl-12 py-4 text-white text-[42px] font-normal capitalize">Favorites :</div>
<div className="flex items-center justify-center ">
<div className="w-[1287px] h-[289px] bg-gradient-to-t from-amber-400 to-orange-400 rounded-[40px] border-2 border-red-800" >
<div className="flex items-center justify-center grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <Card/>
      <Card />
      <Card />
    </div>
</div>
</div>
</div>
<div class="flex items-center justify-center mt-12">
<CustomButton text="LOG OUT" onClick={handleLogout} />
            
</div>   
        </>
    );
}