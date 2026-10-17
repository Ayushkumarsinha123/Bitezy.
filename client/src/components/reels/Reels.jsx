
import { useRef, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { likeReel } from "../../services/reelService";
import { useCart } from "../../context/CartContext";

const Reel = ({
  _id,
  videoUrl,
  dishName,
  restaurantName,
  price,
  like = 0,
}) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(like || 0);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const { addToCart } = useCart();

  // LIKE / UNLIKE REEL
  const handleLike = async (e) => {
    e.stopPropagation();

    if (isLiking) return;

    try {
      setIsLiking(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Please log in to like a reel.");
        return;
      }

      const data = await likeReel(_id, token);

      setLiked(data.liked);
      setLikes(data.likes);
    } catch (error) {
      console.error(
        "LIKE ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setIsLiking(false);
    }
  };

  // AUTO-PLAY VIDEO WHEN VISIBLE
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const handlePlay = (entries) => {
      entries.forEach((entry) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(
      handlePlay,
      options
    );

    const video = videoRef.current;

    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) observer.unobserve(video);
      observer.disconnect();
    };
  }, []);

  // PLAY / PAUSE VIDEO
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("VIDEO PLAY ERROR:", error);
        });
    }
  };

  // ADD TO CART
  const handleOrderClick = (e) => {
    e.stopPropagation();

    addToCart({
      _id,
      dishName,
      price,
      restaurantName,
    });

    alert(`Added ${dishName} to your cart! 🛒`);
  };

  return (
    <div className="relative w-full h-full snap-start bg-neutral-900 flex justify-center overflow-hidden shrink-0">

      <video
        ref={videoRef}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
        src={videoUrl}
        loop
        muted
        playsInline
      />

      {/* DISH DETAILS AND ORDER BUTTON */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white pb-24 sm:pb-8 z-10">

        <div className="mb-4 pr-16">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-bold text-orange-400 mb-3 shadow-sm">
            📍 {restaurantName}
          </div>

          <h2 className="text-3xl font-extrabold mb-1 drop-shadow-lg leading-tight">
            {dishName}
          </h2>
        </div>

        <button
          onClick={handleOrderClick}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] shadow-[0_0_15px_rgba(249,115,22,0.4)] text-white font-black text-lg py-4 px-6 rounded-full w-full flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <ShoppingCartIcon />
          Add to Cart • ₹{price}
        </button>
      </div>

      {/* RIGHT-SIDE ACTIONS */}
      <div className="absolute right-4 bottom-32 sm:bottom-28 flex flex-col gap-6 items-center text-white z-20">

        {/* RESTAURANT AVATAR */}
        <div className="w-12 h-12 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center font-bold shadow-lg overflow-hidden text-xl">
          {restaurantName?.charAt(0).toUpperCase() || "R"}
        </div>

        {/* LIKE BUTTON */}
        <div className="flex flex-col items-center group">
          <button
            type="button"
            onClick={handleLike}
            disabled={isLiking}
            aria-label={liked ? "Unlike reel" : "Like reel"}
            className={`bg-white/10 backdrop-blur-md p-3.5 rounded-full border border-white/10 group-hover:bg-white/20 transition-all shadow-lg disabled:opacity-60 ${
              liked ? "text-red-500 scale-110" : "text-white"
            }`}
          >
            {liked ? (
              <FavoriteIcon fontSize="medium" />
            ) : (
              <FavoriteBorderIcon fontSize="medium" />
            )}
          </button>

          <span className="text-xs font-bold mt-1.5 drop-shadow-md">
            {likes}
          </span>
        </div>

        {/* SHARE BUTTON */}
        <div className="flex flex-col items-center group">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              if (navigator.share) {
                navigator.share({
                  title: dishName,
                  text: `Check out ${dishName} on Bitezy!`,
                  url: window.location.href,
                }).catch(() => {});
              } else {
                console.log("Sharing is not supported in this browser.");
              }
            }}
            className="bg-white/10 backdrop-blur-md p-3.5 rounded-full border border-white/10 group-hover:bg-white/20 transition-colors cursor-pointer shadow-lg"
            aria-label="Share reel"
          >
            <ShareIcon fontSize="medium" />
          </button>

          <span className="text-xs font-bold mt-1.5 drop-shadow-md">
            Share
          </span>
        </div>

      </div>
    </div>
  );
};

export default Reel;