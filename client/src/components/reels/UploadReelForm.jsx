import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadReelForm = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState("");
  const [dishId, setDishId] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewName, setPreviewName] = useState("");
  const [title, setTitle] = useState("");
  const [dishName, setDishName] = useState("");
  const [price, setPrice] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewName(file.name);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please select a video reel to upload!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();

    formData.append("description", description);
    // formData.append('dishId', dishId);

    formData.append("title", title);
    formData.append("dishName", dishName);
    formData.append("price", price);
    formData.append("video", videoFile);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/reels/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 Reel uploaded successfully!");
        setVideoFile(null);
        setPreviewName("");
        setDescription("");
        setDishId("");
      } else {
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Something went wrong connecting to the server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Upload a New Reel
      </h2>

      <form onSubmit={handleUpload} className="flex flex-col gap-5">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <CloudUploadIcon
              className="text-gray-400 mb-2"
              sx={{ fontSize: 40 }}
            />
            <span className="text-blue-600 font-semibold">
              Click to select a video
            </span>
            <span className="text-gray-400 text-sm mt-1">
              MP4 or WebM (Max 50MB)
            </span>
          </label>
          {previewName && (
            <div className="mt-4 text-sm font-medium text-green-600 bg-green-50 py-2 px-4 rounded-full inline-block">
              ✓ {previewName}
            </div>
          )}
        </div>

        <TextField
          label="Catchy Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          fullWidth
          required
          placeholder="e.g., The cheese pull on our new deep dish! 🍕🤤"
        />

        <TextField
          label="Dish ID (Temporary MVP Field)"
          value={dishId}
          onChange={(e) => setDishId(e.target.value)}
          fullWidth
          required
          placeholder="Paste a valid MongoDB Dish Object ID here"
        />
        <TextField
          label="Reel Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Dish Name"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Price (₹)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isUploading}
          className="mt-4 h-12"
          sx={{
            backgroundColor: "#f97316",
            "&:hover": { backgroundColor: "#ea580c" },
          }}
        >
          {isUploading ? "Uploading to Cloudinary..." : "Publish Reel"}
        </Button>
      </form>
    </div>
  );
};

export default UploadReelForm;
