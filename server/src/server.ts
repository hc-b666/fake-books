import { createServer } from "http";
import createApp from "./app";

const app = createApp();
const httpServer = createServer(app);

const PORT = 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
