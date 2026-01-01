export const uploadImage = async (imageUri) => {
  try {
    // Create FormData with the image
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", "Mafqoodaty");

    // Upload to Cloudinary
    const response = await fetch(process.env.CLOUD_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url && data.public_id) {
      return {
        url: data.secure_url,
        publicId: data.public_id,
      };
    }

    throw new Error("Upload failed");
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
