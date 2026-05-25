import I from "../components/Icon";
import { DARK, FOREST, SAFFRON } from "../constants/colors";

function BookingPage({ data, setData, bookForm, setBookForm, bookDone, setBookDone, setInvoiceBooking, fbSave, showToast, go }) {
  const handleSubmit = () => {
    if (!bookForm.name || !bookForm.email || !bookForm.package) { showToast("Please fill required fields","err"); return; }
    const pkg = data.packages.find(p => p.name === bookForm.package);
    const nb = { id: Date.now(), name:bookForm.name, email:bookForm.email, package:bookForm.package, travelers:bookForm.travelers, date:bookForm.date, status:"Pending", total: pkg ? pkg.price*bookForm.travelers : 0, message:bookForm.message, source:"Web" };
    setData(d => ({ ...d, bookings:[...d.bookings,nb] }));
    fbSave("bookings", nb);
    setBookDone(true);
  };

  return (
    <div style={{ paddingTop:68,background:`linear-gradient(160deg,${DARK},${FOREST})`,minHeight:"100vh",overflowX:"hidden" }}>
      <div className="booking-page">
        <div style={{ textAlign:"center",marginBottom:"2.5rem" }}>
          <div className="sec-eyebrow" style={{ color:SAFFRON }}>🛕 Let's Plan Your Journey</div>
          <h1 className="sec-title" style={{ color:"#fff" }}>Book Your India Package</h1>
          <p className="sec-sub" style={{ color:"rgba(255,255,255,0.6)" }}>Fill in your details and our travel expert will call you within 24 hours — free consultation, no pressure.</p>
        </div>
        {bookDone ? (
          <div className="success-box">
            <div className="suc-icon"><I n="check" s={34} c="#fff" /></div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.9rem",color:DARK,marginBottom:"0.75rem" }}>Booking Request Received!</h2>
            <p style={{ color:"#666",marginBottom:"0.5rem" }}>Thank you, <strong>{bookForm.name}</strong>! Our team will call you at <strong>{bookForm.phone}</strong> within 24 hours.</p>
            <p style={{ color:"#aaa",fontSize:"0.85rem",marginBottom:"1.5rem" }}>Confirmation reference sent to {bookForm.email}</p>
            {(() => {
              const lastBooking = data.bookings[data.bookings.length - 1];
              return lastBooking ? (
                <div style={{ display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"1.5rem" }}>
                  <button className="btn" style={{ background:"#0F1F0E",color:"#fff",fontSize:"0.88rem" }}
                    onClick={() => setInvoiceBooking(lastBooking)}>
                    🧾 View & Print Invoice
                  </button>
                  <button className="btn" style={{ background:"#25D366",color:"#fff",fontSize:"0.88rem" }}
                    onClick={() => {
                      const msg = `🙏 Namaste ${bookForm.name}! Your booking for *${bookForm.package}* has been received. Booking Ref: HM-${String(lastBooking.id).slice(-6).toUpperCase()}. Total: ₹${Number(lastBooking.total).toLocaleString("en-IN")}. Our team will contact you within 24 hours. - Hikes & Miles 🏔️`;
                      window.open(`https://wa.me/${bookForm.phone?.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`, "_blank");
                    }}>
                    📱 Send WhatsApp Confirmation
                  </button>
                </div>
              ) : null;
            })()}
            <button className="btn btn-primary" onClick={() => { setBookDone(false); setBookForm({name:"",email:"",phone:"",package:"",travelers:2,date:"",city:"",message:""}); go("home"); }}>Back to Home</button>
          </div>
        ) : (
          <div className="booking-form">
            <div style={{ marginBottom:"1.75rem",paddingBottom:"1.25rem",borderBottom:"2px solid #f5f5f5" }}>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:DARK }}>Traveller Information</h3>
            </div>
            <div className="form-grid">
              {[["Full Name *","name","text"],["Email Address *","email","email"],["Mobile Number *","phone","tel"],["Your City","city","text"]].map(([l,k,t]) => (
                <div key={k} className="form-grp">
                  <label className="form-lbl">{l}</label>
                  <input type={t} className="form-inp" placeholder={l.replace(" *","")} value={bookForm[k]} onChange={e => setBookForm(f=>({...f,[k]:e.target.value}))} />
                </div>
              ))}
              <div className="form-grp">
                <label className="form-lbl">Select Package *</label>
                <select className="form-sel" value={bookForm.package} onChange={e => setBookForm(f=>({...f,package:e.target.value}))}>
                  <option value="">-- Choose a Package --</option>
                  {data.packages.map(p => <option key={p.id} value={p.name}>{p.name} — ₹{p.price.toLocaleString("en-IN")}/person</option>)}
                </select>
              </div>
              <div className="form-grp">
                <label className="form-lbl">Number of Travellers</label>
                <input type="number" className="form-inp" min={1} max={50} value={bookForm.travelers} onChange={e => setBookForm(f=>({...f,travelers:parseInt(e.target.value)}))} />
              </div>
              <div className="form-grp form-full">
                <label className="form-lbl">Preferred Travel Date</label>
                <input type="date" className="form-inp" value={bookForm.date} onChange={e => setBookForm(f=>({...f,date:e.target.value}))} />
              </div>
              <div className="form-grp form-full">
                <label className="form-lbl">Special Requirements / Questions</label>
                <textarea className="form-ta" placeholder="E.g. wheelchair assistance, dietary needs, helicopter for Kedarnath, solo traveller..." value={bookForm.message} onChange={e => setBookForm(f=>({...f,message:e.target.value}))} />
              </div>
              {bookForm.package && (() => { const pkg=data.packages.find(p=>p.name===bookForm.package); return pkg ? (
                <div className="form-full est-box">
                  <div><div style={{ fontSize:"0.75rem",color:"#aaa" }}>Estimated Total</div><div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.9rem",fontWeight:700,color:DARK }}>₹{(pkg.price*bookForm.travelers).toLocaleString("en-IN")}</div></div>
                  <div style={{ fontSize:"0.82rem",color:"#888" }}>{bookForm.travelers} × ₹{pkg.price.toLocaleString("en-IN")}/person</div>
                </div>
              ) : null; })()}
              <div className="form-full" style={{ display:"flex",justifyContent:"flex-end",gap:"1rem" }}>
                <button className="btn btn-outline-dark btn-sm" onClick={() => go("packages")}>Browse Packages</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit Booking Request <I n="send" s={15} c="#fff" /></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
