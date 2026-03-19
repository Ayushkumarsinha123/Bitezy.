import { useEffect, useState } from 'react';
import Reel from '../components/reels/Reels';
import { fetchReels } from '../services/reelService';

const Feed = () => {
  const [reels, setReel ] = useState([]);

useEffect(() => {
   const loadReels = async () => {
   try{ const data = await fetchReels();
    setReel(data);}
   catch(error) {
    console.log(error);
  };
};
  loadReels();
},[])
  return (
    <div className="h-screen w-full sm:max-w-md sm:mx-auto bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      
      
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent">
        <h1 className="text-2xl font-extrabold tracking-tight">FeedArea</h1>
        <div className="font-semibold cursor-pointer">Near You</div>
      </div>

      
      {reels.map((reel) => (
        <Reel 
          key={reel._id}
          videoUrl={reel.videoUrl}
          dishName={reel.dishName}
          restaurantName={reel.restaurantName}
          price={reel.price}
        />
      ))}

    </div>
  );
};

export default Feed;