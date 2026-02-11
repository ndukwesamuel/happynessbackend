import express, { type Request, type Response } from "express";
import methodNotAllowed from "./middleware/methodNotAllowed";
import authRoutes from "./modules/auth/auth.routes";
import GroupRoutes from "./modules/group/group.routes";
import churchRoutes from "./modules/churchprofile/churchprofile.routes";
import contactsRoutes from "./modules/contacts/contacts.routes";
import FilesRoutes from "./modules/fileManger/fileManger.routes";
import AdminRoutes from "./modules/Admin/admin.routes";
import TemplateRoutes from "./modules/template/template.route";
import { isAuth } from "./middleware/auth";
import CategoryRoutes from "./modules/category/category.route";
import MessageRoutes from "./modules/message/message.route";
import mainMessageRoutes from "./modules/messgaing/message.routes";
import DashboardRoutes from "./modules/dashboard/dashboard.route";
import BirthdayRoutes from "./modules/birthday/birthday.routes";
import PropertyRoute from "./modules/property/property.routes";
import ConsultationRoute from "./modules/Consultation/Consultation.routes";

import sendEmail, { sendBulkEmail_Brevo } from "./utils/email";
import groupModel from "./modules/group/group.model";
import { Types } from "mongoose";
import contactsModel from "./modules/contacts/contacts.model";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to the API",
    });
  })
  .all(methodNotAllowed);

router.use("/Property", PropertyRoute);
router.use("/consultation", ConsultationRoute);

export default router;
