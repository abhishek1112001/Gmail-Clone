import { Email } from "../models/emailMode.js";

export const createEmail = async (req, resp) => {
  try {
    const userId = req.id;
    const { to, subject, message } = req.body;
    if (!to || !subject || !message) {
      return resp
        .status(400)
        .json({ message: "All fileds are required", success: false });
    }
    const email = await Email.create({
      to,
      subject,
      message,
      userId,
    });
    return resp.status(200).json(email);
  } catch (err) {
    console.log(err);
  }
};
export const deleteEmail = async (req, resp) => {
  try {
    const emailId = req.params.id;
    if (!emailId) {
      return resp
        .status(400)
        .json({ message: "Email id is required", success: false });
    }
    const email = await Email.findByIdAndDelete(emailId);
    if (!email) {
      return resp
        .status(404)
        .json({ message: "Email is not found", success: false });
    }
    return resp.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
export const getAllEmailById = async (req, resp) => {
  try {
    const userId = req.id;
    if (!userId) {
      return resp.status(404).json({ message: "User id not existe" });
    }
    const emails = await Email.find({ userId });

    return resp.status(200).json({ emails });
  } catch (err) {
    console.log(err);
  }
};
