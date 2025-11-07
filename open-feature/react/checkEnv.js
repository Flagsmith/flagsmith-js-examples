const fs = require("fs");
const path = require("path");

try {
  /**
   * Checks if the .env file exists.
   */
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    console.error("\x1b[31m%s\x1b[0m", "Error: .env file not found!");
    console.error(
      "\x1b[33m%s\x1b[0m",
      "Please copy .env.example to .env and configure your environment variables."
    );
    console.error("\x1b[36m%s\x1b[0m", "You can do this by running:");
    console.error("\x1b[37m%s\x1b[0m", "cp .env.example .env");
    process.exit(1);
  }

  /**
   * Checks if the Flagsmith environment key has been configured.
   */
  const envContent = fs.readFileSync(envPath, "utf8");
  if (envContent.includes("YOUR_FLAGSMITH_CLIENT_SIDE_ENVIRONMENT_KEY")) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "Error: Flagsmith environment key not configured!"
    );
    console.error(
      "\x1b[33m%s\x1b[0m",
      "Please replace YOUR_FLAGSMITH_CLIENT_SIDE_ENVIRONMENT_KEY in your .env file with your actual Flagsmith environment key."
    );
    process.exit(1);
  }
} catch (err) {
  console.error("Error checking for .env file:", err);
  process.exit(1);
}
