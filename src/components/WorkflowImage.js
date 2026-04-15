import { useState } from "react";
import { analyzeImage, generateImage } from "../utils/apiHelpers";

function WorkflowImage() {
  const [imageFile, setImageFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setLoading(true);

    const base64 = await convertToBase64(imageFile);

    const result = await analyzeImage(base64);

    setAnalysis(result);

    setLoading(false);
  };

  const handleGenerateVariation = async () => {
    if (!analysis) return;

    setLoading(true);

    const prompt = `high quality artistic illustration of ${analysis}, cinematic lighting, detailed digital art`;

    const image = await generateImage(prompt);

    console.log("Generated URL:", image);

    setGeneratedImage(image);

    setLoading(false);
  };
  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h2>Style Lab</h2>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <br />
      <br />

      <button onClick={handleAnalyze}>Analyze Image</button>

      {loading && <p>Processing...</p>}

      {analysis && (
        <div style={{ marginTop: "20px" }}>
          <h3>Image Analysis</h3>

          <p>{analysis}</p>

          <button onClick={handleGenerateVariation}>
            Generate Style Variation
          </button>
        </div>
      )}

      {generatedImage && (
        <div style={{ marginTop: "30px" }}>
          <h3>Generated Variation</h3>

          <img
            src={generatedImage}
            alt="Generated"
            width="500"
            key={generatedImage}
          />
        </div>
      )}
    </div>
  );
}

export default WorkflowImage;
