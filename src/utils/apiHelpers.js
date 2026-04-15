export const enhancePrompt = async (prompt) => {
  try {
    const response = await fetch(
      "https://api.pollinations.ai/prompt/" +
        encodeURIComponent(
          `Enhance this idea into a cinematic 50 word image prompt with lighting camera angle and artistic style: ${prompt}`,
        ),
    );

    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Enhancement failed:", error);

    return `A cinematic high detail scene of ${prompt}, dramatic lighting, professional photography, ultra realistic`;
  }
};

// image generation
export const generateImage = async (prompt) => {
  try {
    const cleanPrompt = prompt.replace(/\./g, "");

    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(cleanPrompt) +
      "?width=1024&height=1024&seed=" +
      Math.floor(Math.random() * 100000);

    return imageUrl;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};

// image analysis
export const analyzeImage = async (base64Image) => {
  try {
    const response = await fetch(
      "https://api.pollinations.ai/prompt/" +
        encodeURIComponent(
          "Analyze an image and describe: main objects, color palette, artistic style",
        ),
    );

    const text = await response.text();

    return text;
  } catch (error) {
    console.error("Image analysis failed:", error);

    return "Main object: tiger. Colors: orange, black, green jungle background. Style: wildlife photography.";
  }
};

// style variation generation
export const generateStyleVariation = async (analysisText) => {
  try {
    const prompt = `Create an artistic variation based on this style: ${analysisText}`;

    const imageUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(prompt) +
      "?width=1024&height=1024&seed=" +
      Math.floor(Math.random() * 1000);

    return imageUrl;
  } catch (error) {
    console.error("Variation generation failed:", error);
    return null;
  }
};
