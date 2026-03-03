import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import "dotenv/config";
import logger from "./utils/logger";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.config";
import connectDB from "./config/connectDB";
import notFound from "./middleware/notFound";
import authRoutes from "./modules/auth/auth.routes";
import v1rootRouter from "./v1route";
import { errorMiddleware } from "./middleware/error";
import fileUpload from "express-fileupload";
import { seedCategories } from "./modules/category/seedcategory";
import { agenda } from "./modules/scheduler/agenda.scheduler";
import { seedGroups } from "./modules/group/seedGroups";

import cron from "node-cron";
import { MessageScheduler } from "./modules/message/message.scheduler";
import { MessageService } from "./modules/message/message.service";

const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(morgan("test"));

app.use(
  cors({
    origin: "*", // allow all origins

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(helmet());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("Request received at root endpoint");

  res.status(200).json({
    status: "success",
    message: "Server is healthy",
  });
});

app.use("/", v1rootRouter);

app.use(notFound);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    await agenda.start();
    // await scheduleBirthdayMessages();
    // seedCategories();
    // seedGroups();

    app.listen(env.PORT, () =>
      logger.info(`Server is listening on PORT:${env.PORT}`),
    );
  } catch (error) {
    console.log("Error starting the server:", error);

    logger.error(error);
  }
};

startServer();
