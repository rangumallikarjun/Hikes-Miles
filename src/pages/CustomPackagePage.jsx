import { useState } from "react";
import I from "../components/Icon";
import { DARK, FOREST, SAFFRON } from "../constants/colors";

function CustomPackagePage({ go, showToast }) {
  const destinations = ["Kerala","Rajasthan","Ladakh","Char Dham","Spiti Valley","Andaman","Coorg","Goa","Himachal Pradesh","Kashmir","Uttarakhand","Northeast India"];
  const hotelGrades = [
    { key:"Budget", icon:"🏠", label:"Budget", sub:"Guesthouses & hostels", rate:1800 },
    { key:"Standard", icon:"🏨", label:"Standard", sub:"3-star hotels", rate:2800 },
    { key:"Luxury", icon:"🏰", label:"Luxury", sub:"5-star & heritage", rate:4500 },
  ];
  const activities = [
    { key:"Houseboat", icon:"⛵", label:"Houseboat Stay", cost:2500 },
    { key:"Wildlife Safari", icon:"🐯", label:"Wildlife Safari", cost:2000 },
    { key:"Trekking", icon:"🥾", label:"Trekking", cost:1500 },
    { key:"Ayurveda", icon:"🧘", label:"Ayurvedic Spa", cost:1800 },
    { key:"Beach", icon:"🏖️", label:"Beach Leisure", cost:800 },
    { key:"Heritage", icon:"🏛️", label:"Heritage Tours", cost:1200 },
    { key:"Adventure Sports", icon:"🪂", label:"Adventure Sports", cost:2200 },
    { key:"Pilgrimage", icon:"🛕", label:"Temple Circuit", cost:1000 },
    { key:"Photography", icon:"📸", label:"Photo Walks", cost:900 },
    { key:"Camping", icon:"⛺", label:"Camping", cost:1600 },
  ];

  const [selDest, setSelDest] = useState("");
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [hotel, setHotel] = useState("Standard");
  const [selActivities, setSelActivities] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");

  const toggleActivity = (key) => setSelActivities(prev => prev.includes(key) ? prev.filter(a=>a!==key) : [...prev, key]);

  const baseRate = hotelGrades.find(h=>h.key===hotel)?.rate || 2800;
  const actCost = selActivities.reduce((sum,a) => sum + (activities.find(x=>x.key===a)?.cost||0), 0);
  const pricePerPerson = (baseRate * days) + actCost;
  const totalPrice = pricePerPerson * travelers;

  const sendToWhatsApp = () => {
    if(!selDest){showToast("Please select a destination","err");return;}
    if(!custName||!custPhone){showToast("Please enter your name and phone","err");return;}
    const actList = selActivities.length ? selActivities.join(", ") : "None selected";
    const msg = `🙏 Namaste! I'd like to enquire about a *Custom Package*:\n\n*Name:* ${custName}\n*Phone:* ${custPhone}\n*Email:* ${custEmail||"Not provided"}\n\n*Destination:* ${selDest}\n*Duration:* ${days} Days\n*Travellers:* ${travelers} persons\n*Hotel Grade:* ${hotel}\n*Activities:* ${actList}\n\n*Estimated Budget:* ₹${totalPrice.toLocaleString("en-IN")} total (₹${pricePerPerson.toLocaleString("en-IN")}/person)\n\nPlease confirm availability and share the final itinerary. Thank you! 🙏`;
    window.open(`https://wa.me/919666962337?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  const bookCustom = () => {
    if(!selDest){showToast("Please select a destination","err");return;}
    const pkgName = `Custom ${selDest} Trip — ${days} Days (${hotel} · ${travelers} pax)`;
    go("booking", { name: pkgName });
  };

  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,${DARK},${FOREST})`,padding:"4rem 1.5rem",textAlign:"center" }}>
        <div className="sec-eyebrow" style={{ color:SAFFRON }}>✨ Tailor-Made for You</div>
        <h1 className="sec-title" style={{ color:"#fff" }}>Build Your Custom India Package</h1>
        <p className="sec-sub" style={{ color:"rgba(255,255,255,0.65)" }}>Choose your destination, duration, hotel grade and activities. Get an instant price estimate and send it directly to our team on WhatsApp!</p>
      </div>

      <div className="cpb-wrap">
        <div className="cpb-inner">
          {submitted ? (
            <div style={{ background:"rgba(255,255,255,0.08)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:20,padding:"3rem",textAlign:"center" }}>
              <div style={{ fontSize:"4rem",marginBottom:"1rem" }}>🎉</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:700,color:"#fff",marginBottom:"0.75rem" }}>Request Sent!</div>
              <div style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.65)",marginBottom:"2rem",lineHeight:1.75 }}>Your custom package request has been sent to our WhatsApp. Our travel expert will call you within <strong style={{ color:SAFFRON }}>2 hours</strong> to discuss and finalize your perfect itinerary.</div>
              <div style={{ display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap" }}>
                <button className="btn btn-primary" onClick={()=>setSubmitted(false)}>Build Another Package</button>
                <button className="btn" style={{ background:"rgba(255,255,255,0.1)",color:"#fff" }} onClick={()=>go("packages")}>Browse Fixed Packages</button>
              </div>
            </div>
          ) : (
            <>
              <div className="cpb-card">
                <div className="cpb-step-label"><div className="cpb-step-num">1</div><span className="cpb-step-title">Where do you want to go?</span></div>
                <div className="cpb-dest-grid">
                  {destinations.map(d => (
                    <button key={d} className={`cpb-dest-btn${selDest===d?" sel":""}`} onClick={()=>setSelDest(d)}>{d}</button>
                  ))}
                </div>
              </div>

              <div className="cpb-card">
                <div className="cpb-step-label"><div className="cpb-step-num">2</div><span className="cpb-step-title">How many days?</span><span style={{ marginLeft:"auto",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:SAFFRON }}>{days} Days</span></div>
                <div className="cpb-slider-wrap">
                  <input type="range" className="cpb-slider" min={3} max={21} value={days} onChange={e=>setDays(Number(e.target.value))} />
                  <div className="cpb-slider-labels"><span>3 Days (Min)</span><span>7 Days</span><span>14 Days</span><span>21 Days (Max)</span></div>
                </div>
              </div>

              <div className="cpb-card">
                <div className="cpb-step-label"><div className="cpb-step-num">3</div><span className="cpb-step-title">Number of Travellers</span></div>
                <div className="cpb-counter">
                  <button className="cpb-counter-btn" onClick={()=>setTravelers(t=>Math.max(1,t-1))}>−</button>
                  <div className="cpb-counter-val">{travelers}</div>
                  <button className="cpb-counter-btn" onClick={()=>setTravelers(t=>Math.min(30,t+1))}>+</button>
                  <span style={{ fontSize:"0.85rem",color:"rgba(255,255,255,0.5)",marginLeft:"0.75rem" }}>person{travelers>1?"s":""}</span>
                </div>
                <div style={{ marginTop:"0.75rem",fontSize:"0.75rem",color:"rgba(255,255,255,0.35)" }}>Group of 10+? Ask for special group discount!</div>
              </div>

              <div className="cpb-card">
                <div className="cpb-step-label"><div className="cpb-step-num">4</div><span className="cpb-step-title">Hotel Preference</span></div>
                <div className="cpb-hotel-grid">
                  {hotelGrades.map(h => (
                    <button key={h.key} className={`cpb-hotel-btn${hotel===h.key?" sel":""}`} onClick={()=>setHotel(h.key)}>
                      <div className="cpb-hotel-icon">{h.icon}</div>
                      <span className="cpb-hotel-name">{h.label}</span>
                      <span className="cpb-hotel-price">{h.sub}</span>
                      <span className="cpb-hotel-price">~₹{h.rate.toLocaleString("en-IN")}/day</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cpb-card">
                <div className="cpb-step-label"><div className="cpb-step-num">5</div><span className="cpb-step-title">Add Activities <span style={{ fontSize:"0.75rem",fontWeight:400,color:"rgba(255,255,255,0.4)" }}>(optional)</span></span></div>
                <div className="cpb-activity-grid">
                  {activities.map(a => (
                    <button key={a.key} className={`cpb-activity-btn${selActivities.includes(a.key)?" sel":""}`} onClick={()=>toggleActivity(a.key)}>
                      <div style={{ fontSize:"1.4rem",marginBottom:4 }}>{a.icon}</div>
                      <div style={{ fontWeight:600 }}>{a.label}</div>
                      <div style={{ fontSize:"0.68rem",opacity:0.6,marginTop:2 }}>+₹{a.cost.toLocaleString("en-IN")}/person</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="cpb-card">
                <div className="cpb-step-label"><div className="cpb-step-num">6</div><span className="cpb-step-title">Your Contact Details</span></div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
                  <div>
                    <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Full Name *</div>
                    <input className="rev-inp" placeholder="Your name" value={custName} onChange={e=>setCustName(e.target.value)} />
                  </div>
                  <div>
                    <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Phone / WhatsApp *</div>
                    <input className="rev-inp" placeholder="+91 98XXX XXXXX" value={custPhone} onChange={e=>setCustPhone(e.target.value)} />
                  </div>
                  <div style={{ gridColumn:"1/-1" }}>
                    <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",marginBottom:5,fontWeight:600 }}>Email Address</div>
                    <input className="rev-inp" type="email" placeholder="your@email.com" value={custEmail} onChange={e=>setCustEmail(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="cpb-price-box">
                <div>
                  <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.75)",marginBottom:4 }}>Estimated Price</div>
                  <div className="cpb-price-main">₹{totalPrice.toLocaleString("en-IN")}</div>
                  <div className="cpb-price-note">₹{pricePerPerson.toLocaleString("en-IN")}/person × {travelers} pax · {days} days · {hotel}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.65)",marginBottom:"0.5rem" }}>This is an estimate. Final price confirmed by our team.</div>
                  {selActivities.length>0 && <div style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.5)" }}>Activities: {selActivities.join(", ")}</div>}
                </div>
              </div>

              <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap" }}>
                <button className="cpb-wa-btn" style={{ flex:1,justifyContent:"center" }} onClick={sendToWhatsApp}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Send to WhatsApp & Get Quote
                </button>
                <button className="btn btn-primary" style={{ flex:1,justifyContent:"center",padding:"14px 24px",fontSize:"0.95rem" }} onClick={bookCustom}>
                  <I n="send" s={18} c="#fff"/> Book This Package
                </button>
              </div>
              <div style={{ textAlign:"center",marginTop:"1rem",fontSize:"0.75rem",color:"rgba(255,255,255,0.3)" }}>
                🔒 Your details are private and only shared with our travel team.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomPackagePage;
