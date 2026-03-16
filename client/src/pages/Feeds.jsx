import Reel from '../components/reels/Reels';


const dummyReels = [
  {
    _id: "1",
    videoUrl: "https://videos.pexels.com/video-files/3106214/3106214-uhd_2560_1440_25fps.mp4", // Pizza video
    dishName: "Wood-Fired Margherita Pizza",
    restaurantName: "Luigi's Oven",
    price: 399
  },
  {
    _id: "2",
    videoUrl: "https://videos.pexels.com/video-files/29522914/12716035_1080_1920_30fps.mp4", // Burger video
    dishName: "Double Smash Cheeseburger",
    restaurantName: "Burger Cartel",
    price: 249
  },
  {
    _id: "3",
    videoUrl: "https://videos.pexels.com/video-files/19082260/19082260-uhd_2160_3840_30fps.mp4", // Noodles video
    dishName: "Spicy Ramen Bowl",
    restaurantName: "Tokyo Drift Diner",
    price: 450
  }
];

const Feed = () => {
  return (
    <div className="h-screen w-full sm:max-w-md sm:mx-auto bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      
      
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center text-white bg-gradient-to-b from-black/60 to-transparent">
        <h1 className="text-2xl font-extrabold tracking-tight">FeedArea</h1>
        <div className="font-semibold cursor-pointer">Near You</div>
      </div>

      
      {dummyReels.map((reel) => (
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