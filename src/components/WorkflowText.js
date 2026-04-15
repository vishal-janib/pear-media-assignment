import { useState } from "react";
import { enhancePrompt, generateImage } from "../utils/apiHelpers";

function WorkflowText() {
  const [userPrompt, setUserPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!userPrompt) return;

    setLoading(true);

    const enhanced = await enhancePrompt(userPrompt);

    setEnhancedPrompt(enhanced);

    setLoading(false);
  };

  const handleGenerateImage = async () => {
    if (!enhancedPrompt) return;

    setLoading(true);

    const image = await generateImage(enhancedPrompt);
    console.log("IMAGE URL:", image);
    setImageUrl(image);

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto" }}>
      <h2>Creative Studio</h2>

      <input
        type="text"
        placeholder="Enter your idea..."
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button onClick={handleEnhance} style={{ marginTop: "10px" }}>
        Enhance Prompt
      </button>

      {loading && <p>Processing...</p>}

      {enhancedPrompt && (
        <div style={{ marginTop: "20px" }}>
          <h3>Enhanced Prompt</h3>

          <textarea
            value={enhancedPrompt}
            onChange={(e) => setEnhancedPrompt(e.target.value)}
            rows="4"
            style={{ width: "100%", padding: "10px" }}
          />

          <button onClick={handleGenerateImage} style={{ marginTop: "10px" }}>
            Generate Image
          </button>
        </div>
      )}

      {imageUrl && (
        <div style={{ marginTop: "30px" }}>
          <h3>Generated Image</h3>

          <img
            src={imageUrl}
            alt="Generated"
            style={{ width: "500px", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default WorkflowText;
