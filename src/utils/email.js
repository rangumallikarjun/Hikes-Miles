export const sendEmailConfirmation = async (booking, pkg, type = "customer") => {
  const invoiceNo = `HM-${String(booking.id).slice(-6).toUpperCase()}`;

  const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = type === "customer"
    ? "YOUR_CUSTOMER_TEMPLATE_ID"
    : "YOUR_ADMIN_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";

  const templateParams = {
    to_email:       type === "customer" ? booking.email : "namaste@hikesandmiles.in",
    to_name:        type === "customer" ? booking.name : "Hikes & Miles Admin",
    invoice_no:     invoiceNo,
    customer_name:  booking.name,
    customer_email: booking.email,
    customer_phone: booking.phone || "—",
    package_name:   booking.package,
    destination:    pkg?.destination || "—",
    duration:       pkg?.duration || "—",
    travelers:      booking.travelers,
    travel_date:    booking.date || "To be confirmed",
    total_amount:   `₹${Number(booking.total).toLocaleString("en-IN")}`,
    status:         booking.status,
    special_notes:  booking.message || "None",
  };

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:  EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id:     EMAILJS_PUBLIC_KEY,
        template_params: templateParams,
      }),
    });
    return res.status === 200;
  } catch (e) {
    console.error("Email error:", e);
    return false;
  }
};
