/**
 * Email Templates for Application Status Notifications
 * 
 * These templates are used by the backend to send professional emails
 * to applicants when their status is updated (accepted/rejected).
 * 
 * Backend Usage:
 * import { acceptedTemplate, rejectedTemplate } from "./emailTemplates";
 * 
 * const html = acceptedTemplate({
 *   name: application.applicant.fullName,
 *   jobTitle: application.job.title,
 *   company: "Talex Recruitment"
 * });
 * 
 * await sendEmail({
 *   to: application.applicant.email,
 *   subject: "🎉 Application Accepted - Talex",
 *   html
 * });
 */

export const acceptedTemplate = ({ 
  name, 
  jobTitle, 
  company = "Talex Recruitment" 
}: {
  name: string;
  jobTitle: string;
  company?: string;
}): string => `
  <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:20px;">
    <div style="max-width:620px; margin:auto; background:#ffffff; padding:35px; border-radius:12px;">

      <h2 style="color:#16a34a; margin-bottom:10px;">
        🎉 Congratulations ${name}
      </h2>

      <p style="font-size:15px; color:#333;">
        We are pleased to formally inform you that your application has been <b>successful</b>.
      </p>

      <div style="background:#ecfdf5; padding:15px; border-left:5px solid #16a34a; margin:20px 0;">
        <p style="margin:0;"><b>Position:</b> ${jobTitle}</p>
        <p style="margin:5px 0 0;"><b>Organization:</b> ${company}</p>
      </div>

      <p style="font-size:14px; color:#444;">
        After careful review of your application, experience, and qualifications, our hiring team was impressed with your profile.
        You have been selected to proceed to the next stage of our recruitment process.
      </p>

      <h3 style="margin-top:20px; color:#111;">📌 Next Steps</h3>
      <ul style="font-size:14px; color:#444;">
        <li>Our HR team will contact you within the next few days.</li>
        <li>You may be invited for an interview or onboarding session.</li>
        <li>Please keep your phone and email active for communication.</li>
      </ul>

      <p style="font-size:14px; color:#444;">
        We are excited about the possibility of having you join our team and contribute to our growth and success.
      </p>

      <a href="https://your-frontend-url.com"
        style="display:inline-block; margin-top:15px; padding:12px 20px; background:#16a34a; color:#fff; text-decoration:none; border-radius:6px;">
        View Dashboard
      </a>

      <p style="margin-top:30px; font-size:12px; color:#888;">
        This is an automated message from ${company}. Please do not reply to this email.
      </p>
    </div>
  </div>
`;

export const rejectedTemplate = ({ 
  name, 
  jobTitle, 
  company = "Talex Recruitment" 
}: {
  name: string;
  jobTitle: string;
  company?: string;
}): string => `
  <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:20px;">
    <div style="max-width:620px; margin:auto; background:#ffffff; padding:35px; border-radius:12px;">

      <h2 style="color:#dc2626;">
        Dear ${name},
      </h2>

      <p style="font-size:15px; color:#333;">
        Thank you for taking the time to apply for the position below:
      </p>

      <div style="background:#fef2f2; padding:15px; border-left:5px solid #dc2626; margin:20px 0;">
        <p style="margin:0;"><b>Position:</b> ${jobTitle}</p>
        <p style="margin:5px 0 0;"><b>Organization:</b> ${company}</p>
      </div>

      <p style="font-size:14px; color:#444;">
        After a careful review of your application, we regret to inform you that we will not be proceeding with your candidacy at this stage.
      </p>

      <h3 style="margin-top:20px; color:#111;">📌 Feedback</h3>
      <p style="font-size:14px; color:#444;">
        Competition for this role was highly competitive, and we had to make difficult decisions based on current requirements and candidate alignment.
        This decision does not reflect negatively on your skills or potential.
      </p>

      <h3 style="margin-top:20px; color:#111;">🚀 Keep Applying</h3>
      <ul style="font-size:14px; color:#444;">
        <li>We encourage you to explore other opportunities on our platform.</li>
        <li>Your profile will remain active for future openings.</li>
        <li>You may reapply for suitable roles at any time.</li>
      </ul>

      <a href="https://your-frontend-url.com/jobs"
        style="display:inline-block; margin-top:15px; padding:12px 20px; background:#dc2626; color:#fff; text-decoration:none; border-radius:6px;">
        Browse Jobs
      </a>

      <p style="margin-top:30px; font-size:12px; color:#888;">
        This is an automated message from ${company}. We appreciate your interest in joining our team.
      </p>
    </div>
  </div>
`;

/**
 * Usage in Backend Controller:
 * 
 * import { sendEmail } from "../utils/sendEmail.js";
 * import { acceptedTemplate, rejectedTemplate } from "../utils/emailTemplates.js";
 * 
 * export const updateApplicationStatus = async (req, res) => {
 *   try {
 *     const { status } = req.body;
 *     const { id } = req.params;
 * 
 *     const application = await Application.findById(id)
 *       .populate("applicant", "fullName email")
 *       .populate("job", "title company");
 * 
 *     application.status = status;
 *     await application.save();
 * 
 *     const { email, fullName } = application.applicant;
 *     const jobTitle = application.job.title;
 * 
 *     if (status === "accepted") {
 *       await sendEmail({
 *         to: email,
 *         subject: "🎉 Application Accepted - Talex",
 *         html: acceptedTemplate({
 *           name: fullName,
 *           jobTitle,
 *         }),
 *       });
 *     }
 * 
 *     if (status === "rejected") {
 *       await sendEmail({
 *         to: email,
 *         subject: "Application Update - Talex",
 *         html: rejectedTemplate({
 *           name: fullName,
 *           jobTitle,
 *         }),
 *       });
 *     }
 * 
 *     res.json({ message: "Status updated + email sent" });
 *   } catch (error) {
 *     res.status(500).json({ error: error.message });
 *   }
 * };
 */
