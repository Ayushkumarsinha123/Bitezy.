import React, { useState, useEffect } from 'react';
import { fetchMyReels } from '../../services/reelService'; // Adjust path if needed

const MyReels = () => {
  const [myVideos, setMyVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // this runs automatically when the component appears on screen
    const loadMyVideos = async () => {
      try {
        const token = localStorage.getItem("token"); // get the token for auth
        const data = await fetchMyReels(token);
        
        setMyVideos(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load your videos", err);
        setError("Could not load your reels.");
        setLoading(false);
      }
    };

    loadMyVideos();
  }, []); 
  if (loading) return <div>Loading your menu items...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="my-reels-container">
      <h3>My Uploaded Menu</h3>
      
      {myVideos.length === 0 ? (
        <p>You haven't uploaded any dishes yet!</p>
      ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {myVideos.map((reel) => (
            <div key={reel._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <video src={reel.videoUrl} controls width="250" style={{ borderRadius: '8px' }} />
              <h4 style={{ margin: '10px 0 5px 0' }}>{reel.dishName}</h4>
              <p style={{ margin: '0', fontWeight: 'bold' }}>₹{reel.price}</p>
              <p style={{ margin: '5px 0 0 0', color: '#555' }}>{reel.title}</p>
              
              {/* We can add a Delete button here later! */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReels;