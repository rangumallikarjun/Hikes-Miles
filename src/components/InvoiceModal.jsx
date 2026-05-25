import LOGO_IMG from "../constants/logo";

function InvoiceModal({ booking, pkg, onClose }) {
  const invoiceNo = `HM-${String(booking.id).slice(-6).toUpperCase()}`;
  const invoiceDate = new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"long", year:"numeric" });
  const taxRate = 0.05;
  const baseAmount = Number(booking.total) / (1 + taxRate);
  const taxAmount = Number(booking.total) - baseAmount;

  const printInvoice = () => {
    const win = window.open("", "_blank", "width=900,height=700");
    win.document.write(`
      <html><head>
        <title>Invoice ${invoiceNo} - Hikes & Miles</title>
        <style>
          *{margin:0;padding:0;box-sizing:border-box}
          body{font-family:Arial,sans-serif;color:#222;background:#fff;padding:40px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          .inv-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:24px;border-bottom:3px solid #D4500A}
          .brand-name{font-size:28px;font-weight:700;color:#0F1F0E}
          .brand-name span{color:#D4500A}
          .brand-tag{font-size:12px;color:#555;margin-top:4px}
          .brand-contact{font-size:11px;color:#666;margin-top:6px;line-height:1.7}
          .inv-title{text-align:right}
          .inv-title h2{font-size:32px;font-weight:700;color:#D4500A;letter-spacing:2px}
          .inv-title p{font-size:13px;color:#444;margin-top:4px}
          .status-badge{display:inline-block;padding:5px 18px;border-radius:50px;font-size:11px;font-weight:700;margin-top:8px;border:2px solid}
          .status-confirmed{background:#e8f5e9;color:#1b5e20;border-color:#2e7d32}
          .status-pending{background:#fff3e0;color:#bf360c;border-color:#e65100}
          .status-cancelled{background:#ffebee;color:#b71c1c;border-color:#c62828}
          .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:28px}
          .info-box{background:#f5f5f5;border-radius:10px;padding:16px;border:1px solid #e0e0e0}
          .info-box h4{font-size:10px;font-weight:700;color:#666;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;border-bottom:1px solid #ddd;padding-bottom:6px}
          .info-row{display:flex;justify-content:space-between;margin-bottom:7px;font-size:12.5px}
          .info-row .lbl{color:#666;font-weight:400}
          .info-row .val{font-weight:600;color:#111;text-align:right}
          .pkg-table{width:100%;border-collapse:collapse;margin-bottom:20px;border:1px solid #ddd}
          .pkg-table th{background:#0F1F0E;color:#ffffff;padding:11px 14px;text-align:left;font-size:11px;letter-spacing:0.5px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          .pkg-table td{padding:13px 14px;border-bottom:1px solid #eee;font-size:12.5px;color:#222}
          .pkg-table .pkg-name{font-weight:700;color:#111}
          .pkg-table .pkg-sub{font-size:11px;color:#666;margin-top:3px}
          .subtotal-row td{background:#fafafa;font-size:12.5px;color:#444}
          .tax-row td{background:#fafafa;font-size:12.5px;color:#444}
          .total-row td{background:#0F1F0E;color:#ffffff;font-weight:700;font-size:14px;-webkit-print-color-adjust:exact;print-color-adjust:exact}
          .total-amt{color:#F7941D !important;font-size:17px !important;font-weight:700 !important}
          .note-box{background:#fff8f0;border:1px solid #ffcc80;border-radius:8px;padding:12px 14px;font-size:11.5px;color:#555;line-height:1.65;margin-bottom:16px}
          .terms-box{background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:12px 14px;font-size:11px;color:#666;line-height:1.65;margin-bottom:20px}
          .footer-bottom{text-align:center;font-size:11px;color:#888;padding-top:14px;border-top:2px solid #D4500A}
          .footer-bottom strong{color:#D4500A}
          @media print{
            body{padding:20px}
            .pkg-table th{background:#0F1F0E !important;color:#fff !important}
            .total-row td{background:#0F1F0E !important;color:#fff !important}
            .total-amt{color:#F7941D !important}
          }
        </style>
      </head><body>
        <div class="inv-header">
          <div>
            <div class="brand-name">Hikes &amp; <span>Miles</span></div>
            <div class="brand-tag">Explore India, One Trail at a Time</div>
            <div class="brand-contact">2-3-638/2, Azad Nagar, Amberpet, Hyderabad, Telangana 500013, India<br/>GST: 29ABCDE1234F1Z5<br/>namaste@hikesandmiles.in | +91 9666962337</div>
          </div>
          <div class="inv-title">
            <h2>INVOICE</h2>
            <p>Invoice No: <strong>${invoiceNo}</strong></p>
            <p>Date: ${invoiceDate}</p>
            <span class="status-badge ${booking.status==="Confirmed"?"status-confirmed":booking.status==="Cancelled"?"status-cancelled":"status-pending"}">${booking.status}</span>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-box">
            <h4>Bill To</h4>
            <div class="info-row"><span class="lbl">Name</span><span class="val">${booking.name}</span></div>
            <div class="info-row"><span class="lbl">Email</span><span class="val">${booking.email}</span></div>
            ${booking.phone ? `<div class="info-row"><span class="lbl">Phone</span><span class="val">${booking.phone}</span></div>` : ""}
            ${booking.city ? `<div class="info-row"><span class="lbl">City</span><span class="val">${booking.city}</span></div>` : ""}
          </div>
          <div class="info-box">
            <h4>Booking Details</h4>
            <div class="info-row"><span class="lbl">Booking Ref</span><span class="val">${invoiceNo}</span></div>
            <div class="info-row"><span class="lbl">Travel Date</span><span class="val">${booking.date || "To Be Confirmed"}</span></div>
            <div class="info-row"><span class="lbl">Travellers</span><span class="val">${booking.travelers} Person(s)</span></div>
            <div class="info-row"><span class="lbl">Source</span><span class="val">${booking.source || "Web"}</span></div>
          </div>
        </div>
        <table class="pkg-table">
          <thead>
            <tr>
              <th style="width:30px">#</th>
              <th>Package / Service</th>
              <th>Duration</th>
              <th>Pax</th>
              <th>Rate/Person</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <div class="pkg-name">${booking.package}</div>
                <div class="pkg-sub">${pkg?.destination || ""} · ${pkg?.state || ""}</div>
              </td>
              <td>${pkg?.duration || "—"}</td>
              <td>${booking.travelers}</td>
              <td>₹${pkg ? Math.round(Number(booking.total) / (1 + taxRate) / booking.travelers).toLocaleString("en-IN") : "—"}</td>
              <td><strong>₹${baseAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</strong></td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="subtotal-row">
              <td colspan="5" style="text-align:right;padding:10px 14px;color:#555">Subtotal (before GST)</td>
              <td style="padding:10px 14px;color:#222;font-weight:600">₹${baseAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
            </tr>
            <tr class="tax-row">
              <td colspan="5" style="text-align:right;padding:10px 14px;color:#555">GST @ 5%</td>
              <td style="padding:10px 14px;color:#222;font-weight:600">₹${taxAmount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</td>
            </tr>
            <tr class="total-row">
              <td colspan="5" style="text-align:right;padding:13px 14px">TOTAL PAYABLE</td>
              <td class="total-amt" style="padding:13px 14px">₹${Number(booking.total).toLocaleString("en-IN")}</td>
            </tr>
          </tfoot>
        </table>
        ${booking.message ? `<div class="note-box"><strong>Special Requests:</strong> ${booking.message}</div>` : ""}
        <div class="terms-box">
          <strong>Terms &amp; Conditions:</strong> 50% advance payment required at booking confirmation. Balance due 15 days before travel date.
          Cancellation policy: 30+ days — full refund; 15–29 days — 50% refund; less than 15 days — no refund.
          All disputes subject to Bengaluru jurisdiction.
        </div>
        <div style="text-align:center;margin-bottom:16px">
          <div style="display:inline-block;background:#f5f5f5;border:1px solid #ddd;border-radius:8px;padding:10px 24px;font-size:11px;color:#555">
            <strong style="color:#D4500A">Payment:</strong> NEFT / UPI / Bank Transfer &nbsp;|&nbsp;
            <strong style="color:#D4500A">UPI ID:</strong> hikesandmiles@upi &nbsp;|&nbsp;
            <strong style="color:#D4500A">Bank:</strong> HDFC Bank, A/C: 12345678901, IFSC: HDFC0001234
          </div>
        </div>
        <div class="footer-bottom">
          Thank you for choosing <strong>Hikes &amp; Miles</strong>! We look forward to serving you. &nbsp;|&nbsp;
          +91 98200 47310 &nbsp;|&nbsp; namaste@hikesandmiles.in
        </div>
      </body></html>
    `);
    win.document.close();
    setTimeout(() => { win.print(); }, 500);
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:600,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"1.5rem",overflowY:"auto" }} onClick={onClose}>
      <div style={{ background:"#fff",borderRadius:20,width:"100%",maxWidth:780,marginTop:"1rem",marginBottom:"2rem" }} onClick={e=>e.stopPropagation()}>
        <div style={{ background:"#0F1F0E",borderRadius:"20px 20px 0 0",padding:"1.25rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#fff" }}>🧾 Invoice Preview</div>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={printInvoice} style={{ background:"#D4500A",color:"#fff",border:"none",borderRadius:8,padding:"9px 20px",fontSize:"0.82rem",fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:7 }}>
              🖨️ Print / Save PDF
            </button>
            <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:34,height:34,borderRadius:8,cursor:"pointer",fontSize:"1.1rem" }}>✕</button>
          </div>
        </div>

        <div id="hm-invoice" style={{ padding:"2rem",fontFamily:"Arial,sans-serif" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28,paddingBottom:20,borderBottom:"2px solid #f0f0f0" }}>
            <div>
              <div><img src={LOGO_IMG} alt="Hikes Miles Tourism" style={{ height:54,width:"auto",objectFit:"contain" }} /></div>
              <div style={{ fontSize:"0.75rem",color:"#888",marginTop:4 }}>Explore India, One Trail at a Time</div>
              <div style={{ fontSize:"0.72rem",color:"#aaa",marginTop:6,lineHeight:1.7 }}>2-3-638/2, Azad Nagar, Amberpet, Hyderabad, Telangana 500013, India<br/>GST: 29ABCDE1234F1Z5 | namaste@hikesandmiles.in</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:"2rem",fontWeight:700,color:"#D4500A",letterSpacing:3 }}>INVOICE</div>
              <div style={{ fontSize:"0.78rem",color:"#666",marginTop:4 }}>Invoice No: <strong>{invoiceNo}</strong></div>
              <div style={{ fontSize:"0.78rem",color:"#666" }}>Date: {invoiceDate}</div>
              <div style={{ display:"inline-block",marginTop:8,padding:"3px 14px",borderRadius:50,fontSize:"0.68rem",fontWeight:700,background:booking.status==="Confirmed"?"#e8f5e9":"#fff3e0",color:booking.status==="Confirmed"?"#2e7d32":"#e65100" }}>{booking.status}</div>
            </div>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24 }}>
            {[
              { title:"Bill To", rows:[["Name",booking.name],["Email",booking.email],booking.phone&&["Phone",booking.phone],booking.city&&["City",booking.city]].filter(Boolean) },
              { title:"Booking Details", rows:[["Booking Ref",invoiceNo],["Travel Date",booking.date||"To Be Confirmed"],["Travellers",`${booking.travelers} Person(s)`],["Source",booking.source||"Web"]] }
            ].map(({title,rows})=>(
              <div key={title} style={{ background:"#f8f9fa",borderRadius:12,padding:"1rem 1.25rem" }}>
                <div style={{ fontSize:"0.65rem",fontWeight:700,color:"#aaa",letterSpacing:1,textTransform:"uppercase",marginBottom:10 }}>{title}</div>
                {rows.map(([l,v])=>(
                  <div key={l} style={{ display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:"0.82rem" }}>
                    <span style={{ color:"#888" }}>{l}</span>
                    <span style={{ fontWeight:600,color:"#222",textAlign:"right",maxWidth:"60%" }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <table style={{ width:"100%",borderCollapse:"collapse",marginBottom:20 }}>
            <thead>
              <tr style={{ background:"#0F1F0E" }}>
                {["#","Package / Service","Duration","Pax","Rate/Person","Amount"].map(h=>(
                  <th key={h} style={{ padding:"11px 14px",textAlign:"left",fontSize:"0.72rem",color:"#fff",letterSpacing:0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom:"1px solid #f0f0f0" }}>
                <td style={{ padding:"14px",fontSize:"0.82rem" }}>1</td>
                <td style={{ padding:"14px" }}>
                  <div style={{ fontWeight:700,fontSize:"0.88rem",color:"#0F1F0E" }}>{booking.package}</div>
                  <div style={{ fontSize:"0.72rem",color:"#999",marginTop:2 }}>{pkg?.destination} · {pkg?.state}</div>
                </td>
                <td style={{ padding:"14px",fontSize:"0.82rem" }}>{pkg?.duration||"—"}</td>
                <td style={{ padding:"14px",fontSize:"0.82rem" }}>{booking.travelers}</td>
                <td style={{ padding:"14px",fontSize:"0.82rem" }}>₹{pkg?Math.round(Number(booking.total)/booking.travelers).toLocaleString("en-IN"):"—"}</td>
                <td style={{ padding:"14px",fontWeight:700,fontSize:"0.9rem" }}>₹{baseAmount.toLocaleString("en-IN",{maximumFractionDigits:0})}</td>
              </tr>
            </tbody>
            <tfoot>
              {[["Subtotal",`₹${baseAmount.toLocaleString("en-IN",{maximumFractionDigits:0})}`],["GST (5%)",`₹${taxAmount.toLocaleString("en-IN",{maximumFractionDigits:0})}`]].map(([l,v])=>(
                <tr key={l} style={{ background:"#fafafa" }}>
                  <td colSpan={5} style={{ padding:"10px 14px",textAlign:"right",fontSize:"0.82rem",color:"#666" }}>{l}</td>
                  <td style={{ padding:"10px 14px",fontWeight:700,fontSize:"0.88rem" }}>{v}</td>
                </tr>
              ))}
              <tr style={{ background:"#0F1F0E" }}>
                <td colSpan={5} style={{ padding:"12px 14px",textAlign:"right",color:"#fff",fontWeight:700,fontSize:"0.9rem" }}>TOTAL AMOUNT</td>
                <td style={{ padding:"12px 14px",color:"#F7941D",fontWeight:700,fontSize:"1.1rem" }}>₹{Number(booking.total).toLocaleString("en-IN")}</td>
              </tr>
            </tfoot>
          </table>

          {booking.message && (
            <div style={{ background:"#fff8f0",border:"1px solid #ffe0c0",borderRadius:10,padding:"12px 16px",fontSize:"0.8rem",color:"#666",marginBottom:16 }}>
              <strong>Special Requests:</strong> {booking.message}
            </div>
          )}
          <div style={{ background:"#f5f5f5",borderRadius:10,padding:"12px 16px",fontSize:"0.75rem",color:"#888",lineHeight:1.7,marginBottom:16 }}>
            <strong>Terms & Conditions:</strong> 50% advance payment required at booking. Balance due 15 days before travel. Cancellation charges apply as per policy. All disputes subject to Bengaluru jurisdiction.
          </div>
          <div style={{ textAlign:"center",fontSize:"0.72rem",color:"#bbb",paddingTop:12,borderTop:"1px solid #f0f0f0" }}>
            Thank you for choosing Hikes &amp; Miles! | +91 9666962337 | namaste@hikesandmiles.in
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
