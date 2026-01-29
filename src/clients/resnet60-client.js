// src/clients/resnet60-client.js

function createFallbackImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  // Fill background with light gray
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text
  ctx.fillStyle = '#999999';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('backend-not-available', canvas.width / 2, canvas.height / 2);
  
  return canvas.toDataURL('image/png');
}

function createFallbackData() {
  return {
    error: 'backend-not-available',
    message: 'Backend service is not responding after multiple retries'
  };
}

export async function classifyResnet60(base64Image, format = "png", maxRetries = 5) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(base64Image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, `capture.${format}`);
      formData.append("format", format);

      const apiResponse = await fetch(
        "https://10.244.101.196:6767/api/classify/resnet60",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(
          `HTTP ${apiResponse.status}: ${errorText || "Unknown server error"}`
        );
      }

      const resultBlob = await apiResponse.blob();
      return URL.createObjectURL(resultBlob);
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt < maxRetries) {
        // Wait a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  // All retries exhausted, return fallback image
  console.error(`Failed to classify image after ${maxRetries} attempts:`, lastError);
  return createFallbackImage();
}


export async function classifyResnet60Data(base64Image, format = "png", maxRetries = 5) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(base64Image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("image", blob, `capture.${format}`);
      formData.append("format", format);

      const apiResponse = await fetch(
        "https://10.244.101.196:6767/api/classify/resnet60/data",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        throw new Error(
          `HTTP ${apiResponse.status}: ${errorText || "Unknown server error"}`
        );
      }

      return await apiResponse.json();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt}/${maxRetries} failed:`, error.message);
      
      if (attempt < maxRetries) {
        // Wait a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }
  
  // All retries exhausted, return fallback data
  console.error(`Failed to classify image data after ${maxRetries} attempts:`, lastError);
  return createFallbackData();
}
