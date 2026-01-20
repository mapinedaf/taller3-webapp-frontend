// src/clients/resnet60-client.js


export async function classifyResnet60(base64Image, format = "png") {
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
}


export async function classifyResnet60Data(base64Image, format = "png") {
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
}
