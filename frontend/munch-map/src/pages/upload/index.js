import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Read the file as a data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result.split(',')[1]); // Extract the base64 part
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {base64String && (
        <div>
       

          <h2>Image Preview:</h2>
          <img src={`data:image/jpeg;base64,${base64String}`} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
