export async function fileUpload(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  console.log(window.ENV);

  const response = await fetch(window.ENV.PUBLIC_API_URL + "/api/v1/images/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const data = await response.json() as {
    success: boolean;
    message: string;
    file: {
      url: string;
      key: string;
      filename: string;
      originalFilename: string;
    }
  };
  return data;
}

export async function fileUploadBulk(files: File[]) {
  const formData = new FormData();
  for (const file of files) {
    formData.append("images", file);
  }



  const response = await fetch(window.ENV.PUBLIC_API_URL + "/api/v1/images/bulk-upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("File upload failed");
  }

  const data = await response.json() as {
    success: boolean;
    message: string;
    files: {
      url: string;
      key: string;
      filename: string;
      originalFilename: string;
    }[]
  };
  return data;
}