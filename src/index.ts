import connectDB from "./db/index.js";
import app from "./app.js";

connectDB().then(() => {
  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `⚙️  Server is running on port http://localhost:${PORT} ...`,
    );
  });
});
