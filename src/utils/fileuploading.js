const { S3 } = require("aws-sdk");

// Set your AWS credentials
const s3 = new S3({
  accessKeyId: "AKIAVLZAONZM75KO2JV4",
  secretAccessKey: "utBOZUuINWN//YHnhzYKvYowWdNnvBLoDTv0dklJ",
  region: "us-west-2", // e.g., 'us-east-1'
});

const upload_doc = async (file) => {
  const key = `ssatale@bigiota.ai/${Date.now()}_${file.name}`;

  try {
    const params = {
      Bucket: "documentia",
      Key: key,
      Body: file,
      ContentType: file.type,
    };

    const result = await s3.upload(params).promise();
    console.log("Image uploaded successfully:", result.Location);
    alert("Image uploaded successfully!", file.name);
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Error uploading image. Please try again.");
  }
};

export { upload_doc };
