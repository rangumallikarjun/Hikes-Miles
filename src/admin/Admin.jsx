import { useState } from "react";
import I from "../components/Icon";
import Stars from "../components/Stars";
import ImagePreviewBox from "../components/ImagePreviewBox";
import cleanImageUrl from "../utils/cleanImageUrl";
import LOGO_IMG from "../constants/logo";
import { ACC, DARK, FOREST, SAFFRON, CREAM, CAT_COLORS } from "../constants/colors";
import { ROLE_ACCESS } from "../constants/users";

function Admin({ data, setData, adminTab, setAdminTab, allReviews, toggleApprove, deleteReview, authUser, adminUsers, setAdminUsers, canAccess, handleLogout, setInvoiceBooking, showToast, fbSave, fbDelete, fbSaveSetting, go }) {

    const [lEdit, setLEdit] = useState(null);
    const [lForm, setLForm] = useState({});
    // Package editor state
    // ── Booking modal state (lifted to Admin level to prevent IIFE reset) ──
    const emptyB = { id:null, name:"", email:"", phone:"", package:"", travelers:2, date:"", city:"", status:"Confirmed", total:0, message:"", source:"Manual" };
    const [bModal, setBModal] = useState(null);
    const [bForm, setBForm] = useState(emptyB);
    const [bSearch, setBSearch] = useState("");
    const [bStatusFilter, setBStatusFilter] = useState("All");
    const openAddB = () => { setBForm({...emptyB, id:Date.now()}); setBModal("add"); };
    const openEditB = (b) => { setBForm({...b}); setBModal("edit"); };
    const closeB = () => { setBModal(null); setBForm(emptyB); };
    const calcTotal = (pkgName, travelers) => {
      const pkg = data.packages.find(p=>p.name===pkgName);
      return pkg ? pkg.price * Number(travelers) : 0;
    };
    const saveB = () => {
      if (!bForm.name.trim()) { showToast("Customer name required","err"); return; }
      if (!bForm.package) { showToast("Select a package","err"); return; }
      const finalTotal = bForm.total || calcTotal(bForm.package, bForm.travelers);
      if (bModal==="add") {
        setData(d=>({...d, bookings:[...d.bookings, {...bForm, total:finalTotal, travelers:Number(bForm.travelers)}]}));
        fbSave("bookings", {...bForm, total:finalTotal, travelers:Number(bForm.travelers)});
        showToast("✅ Booking added successfully!");
      } else {
        setData(d=>({...d, bookings:d.bookings.map(x=>x.id===bForm.id?{...bForm, total:Number(bForm.total), travelers:Number(bForm.travelers)}:x)}));
        fbSave("bookings", {...bForm, total:Number(bForm.total), travelers:Number(bForm.travelers)});
        showToast("✅ Booking updated!");
      }
      closeB();
    };

    const [pkgModal, setPkgModal] = useState(null); // null | "add" | "edit"
    const emptyPkg = {
      id: null, name:"", destination:"", state:"", price:0, originalPrice:0,
      duration:"", groupSize:"", category:"Pilgrimage", badge:"",
      image:"", rating:4.8, reviews:0,
      highlights:[""], itinerary:[{day:1,title:"",desc:""}], includes:[""],
    };
    const [pkgForm, setPkgForm] = useState(emptyPkg);

    const tabs = [
      {id:"dashboard",label:"Dashboard",icon:"dashboard",g:"Overview"},
      {id:"destinations",label:"Destinations",icon:"map",g:"Content"},
      {id:"packages",label:"Packages",icon:"package",g:"Content"},
      {id:"blog",label:"Blog Posts",icon:"book",g:"Content"},
      {id:"offers",label:"Offers",icon:"tag",g:"Content"},
      {id:"bookings",label:"Bookings",icon:"calendar",g:"Operations"},
      {id:"reviews",label:"Reviews",icon:"star",g:"Operations"},
      {id:"media",label:"Media",icon:"image",g:"Operations"},
      {id:"seo",label:"SEO",icon:"seo",g:"Settings"},
      {id:"design",label:"Branding",icon:"palette",g:"Settings"},
      {id:"users",label:"Users & Access",icon:"users",g:"Settings"},
    ];
    const groups = [...new Set(tabs.map(t=>t.g))];

    const startEdit = (item, type) => { setLEdit({item,type}); setLForm({...item}); };
    const saveEdit = () => {
      if (!lEdit) return;
      const {type} = lEdit;
      if (type==="destination") { setData(d=>({...d,destinations:d.destinations.map(x=>x.id===lForm.id?lForm:x)})); fbSave("destinations", lForm); }
      if (type==="blog") { setData(d=>({...d,blog:d.blog.map(x=>x.id===lForm.id?lForm:x)})); fbSave("blog", lForm); }
      if (type==="offer") { setData(d=>({...d,offers:d.offers.map(x=>x.id===lForm.id?lForm:x)})); fbSave("offers", lForm); }
      if (type==="booking") { setData(d=>({...d,bookings:d.bookings.map(x=>x.id===lForm.id?lForm:x)})); fbSave("bookings", lForm); }
      setLEdit(null); showToast("Saved successfully!");
    };
    const del = (type, id) => {
      if (type==="destination") { setData(d=>({...d,destinations:d.destinations.filter(x=>x.id!==id)})); fbDelete("destinations", id); }
      if (type==="package") { setData(d=>({...d,packages:d.packages.filter(x=>x.id!==id)})); fbDelete("packages", id); }
      if (type==="blog") { setData(d=>({...d,blog:d.blog.filter(x=>x.id!==id)})); fbDelete("blog", id); }
      if (type==="offer") { setData(d=>({...d,offers:d.offers.filter(x=>x.id!==id)})); fbDelete("offers", id); }
      showToast("Deleted.");
    };

    // ── Destination modal state ──
    const [destModal, setDestModal] = useState(null);
    const emptyDest = { id:null, name:"", state:"", image:"", tag:"Pilgrimage", rating:4.8, reviews:0 };

    // ── Reviews tab state ──
    const [revPkgFilter, setRevPkgFilter] = useState("All");
    const [revStatusFilter, setRevStatusFilter] = useState("All");
    const [revSearch, setRevSearch] = useState("");

    // ── Media tab state ──
    const [mediaItems, setMediaItems] = useState([
      ...data.destinations.map(d=>({id:`dest-${d.id}`, url:d.image, name:d.name, type:"Destination", usedIn:d.name})),
      ...data.packages.map(p=>({id:`pkg-${p.id}`, url:p.image, name:p.name, type:"Package", usedIn:p.name})),
      ...data.blog.map(b=>({id:`blog-${b.id}`, url:b.image, name:b.title?.slice(0,30), type:"Blog", usedIn:b.title?.slice(0,30)})),
    ].filter(m=>m.url));
    const [addUrl, setAddUrl] = useState("");
    const [addName, setAddName] = useState("");
    const [addType, setAddType] = useState("Other");
    const [mediaFilter, setMediaFilter] = useState("All");
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [copiedId, setCopiedId] = useState(null);

    // ── Users tab state ──
    const emptyUser = { id:null, name:"", email:"", password:"", role:"Content Editor", active:true };
    const [userModal, setUserModal] = useState(null);
    const [userForm, setUserForm] = useState({ id:null, name:"", email:"", password:"", role:"Content Editor", active:true });
    const [passwdForm, setPasswdForm] = useState({ newPass:"", confirmPass:"" });
    const [showPw, setShowPw] = useState(false);
    const [myPassForm, setMyPassForm] = useState({ current:"", newPass:"", confirm:"" });
    const [destForm, setDestForm] = useState(emptyDest);
    const tagOptions = ["Pilgrimage","Tiger Safari","High Altitude","Hill Station","Heritage","Beach & Dive","Trekking","Adventure","Leisure","Misty Forest","Wildlife"];
    const openAddDest = () => { setDestForm({...emptyDest, id:Date.now()}); setDestModal("add"); };
    const openEditDest = (d) => { setDestForm({...d}); setDestModal("edit"); };
    const closeDestModal = () => { setDestModal(null); setDestForm(emptyDest); };
    const saveDest = () => {
      if (!destForm.name.trim()) { showToast("Name is required","err"); return; }
      if (!destForm.state.trim()) { showToast("State is required","err"); return; }
      const item = {...destForm, rating:Number(destForm.rating), reviews:Number(destForm.reviews)};
      if (destModal==="add") {
        setData(d=>({...d, destinations:[...d.destinations, item]}));
        fbSave("destinations", item);
        showToast("✅ Destination added!");
      } else {
        setData(d=>({...d, destinations:d.destinations.map(x=>x.id===item.id?item:x)}));
        fbSave("destinations", item);
        showToast("✅ Destination updated!");
      }
      closeDestModal();
    };
    const openAddPkg = () => {
      setPkgForm({ ...emptyPkg, id: Date.now() });
      setPkgModal("add");
    };
    const openEditPkg = (pkg) => {
      setPkgForm({
        ...pkg,
        highlights: pkg.highlights.length ? [...pkg.highlights] : [""],
        itinerary: pkg.itinerary.length ? pkg.itinerary.map(d=>({...d})) : [{day:1,title:"",desc:""}],
        includes: pkg.includes.length ? [...pkg.includes] : [""],
      });
      setPkgModal("edit");
    };
    const closePkgModal = () => { setPkgModal(null); setPkgForm(emptyPkg); };

    // ── Itinerary helpers ──
    const addDay = () => setPkgForm(f => ({
      ...f, itinerary: [...f.itinerary, {day: f.itinerary.length+1, title:"", desc:""}]
    }));
    const removeDay = (idx) => setPkgForm(f => ({
      ...f, itinerary: f.itinerary.filter((_,i)=>i!==idx).map((d,i)=>({...d,day:i+1}))
    }));
    const updateDay = (idx, field, val) => setPkgForm(f => ({
      ...f, itinerary: f.itinerary.map((d,i)=> i===idx ? {...d,[field]:val} : d)
    }));

    // ── Highlights helpers ──
    const addHighlight = () => setPkgForm(f=>({...f, highlights:[...f.highlights,""]}));
    const removeHighlight = (idx) => setPkgForm(f=>({...f, highlights:f.highlights.filter((_,i)=>i!==idx)}));
    const updateHighlight = (idx, val) => setPkgForm(f=>({...f, highlights:f.highlights.map((h,i)=>i===idx?val:h)}));

    // ── Includes helpers ──
    const addInclude = () => setPkgForm(f=>({...f, includes:[...f.includes,""]}));
    const removeInclude = (idx) => setPkgForm(f=>({...f, includes:f.includes.filter((_,i)=>i!==idx)}));
    const updateInclude = (idx, val) => setPkgForm(f=>({...f, includes:f.includes.map((h,i)=>i===idx?val:h)}));

    // ── Save package ──
    const savePkg = () => {
      if (!pkgForm.name.trim()) { showToast("Package name is required","err"); return; }
      if (!pkgForm.destination.trim()) { showToast("Destination is required","err"); return; }
      if (!pkgForm.price) { showToast("Price is required","err"); return; }
      const clean = {
        ...pkgForm,
        highlights: pkgForm.highlights.filter(h=>h.trim()),
        itinerary: pkgForm.itinerary.filter(d=>d.title.trim()),
        includes: pkgForm.includes.filter(i=>i.trim()),
        price: Number(pkgForm.price),
        originalPrice: Number(pkgForm.originalPrice),
        rating: Number(pkgForm.rating),
        reviews: Number(pkgForm.reviews),
      };
      if (pkgModal === "add") {
        setData(d=>({...d, packages:[...d.packages, clean]}));
        fbSave("packages", clean);
        showToast("✅ Package added successfully!");
      } else {
        setData(d=>({...d, packages:d.packages.map(p=>p.id===clean.id?clean:p)}));
        fbSave("packages", clean);
        showToast("✅ Package updated successfully!");
      }
      closePkgModal();
    };

    return (
      <div className="admin-wrap">
        <div className="admin-sb">
          <div className="admin-sb-logo"><img src={LOGO_IMG} alt="Hikes &amp; Miles" style={{ height:44, width:"auto", objectFit:"contain", filter:"none" }} /></div>
          <div className="admin-sb-sub">Admin Dashboard</div>
          {/* Current user in sidebar */}
          <div style={{ margin:"0.75rem 1.4rem 0.5rem",padding:"0.85rem",background:"rgba(255,255,255,0.06)",borderRadius:12,border:"1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:34,height:34,borderRadius:10,background:ACC,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:700,flexShrink:0 }}>{authUser?.avatar}</div>
              <div style={{ minWidth:0 }}>
                <div style={{ fontSize:"0.82rem",fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{authUser?.name}</div>
                <div style={{ fontSize:"0.68rem",color:SAFFRON,fontWeight:600 }}>{authUser?.role}</div>
              </div>
            </div>
          </div>
          {groups.map(g => (
            <div key={g}>
              <div className="admin-grp-label">{g}</div>
              {tabs.filter(t=>t.g===g && canAccess(t.id)).map(t => (
                <div key={t.id} className={`admin-nav-item${adminTab===t.id?" on":""}`} onClick={() => setAdminTab(t.id)}>
                  <I n={t.icon} s={17} c="currentColor" />{t.label}
                </div>
              ))}
            </div>
          ))}
          <div style={{ padding:"1.25rem",borderTop:"1px solid rgba(255,255,255,0.07)",marginTop:"1rem",display:"flex",flexDirection:"column",gap:8 }}>
            <button className="btn" style={{ background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.7)",width:"100%",justifyContent:"center",fontSize:"0.8rem" }} onClick={() => go("home")}>
              <I n="eye" s={15} /> View Website
            </button>
            <button className="logout-btn" style={{ width:"100%",justifyContent:"center" }} onClick={handleLogout}>
              <I n="close" s={14} c="#c62828" /> Sign Out
            </button>
          </div>
        </div>

        <div className="admin-main">
          {/* Top bar */}
          <div className="admin-topbar">
            <div className="admin-topbar-left">
              <strong>{tabs.find(t=>t.id===adminTab)?.label || "Dashboard"}</strong>
              &nbsp;·&nbsp; Hikes &amp; Miles Admin
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:"1rem" }}>
              <div style={{ fontSize:"0.75rem",color:"#bbb",display:"flex",alignItems:"center",gap:5 }}>
                <I n="clock" s={13} c="#ccc" /> Last login: {authUser?.lastLogin}
              </div>
              <div className="admin-user-pill" onClick={handleLogout} title="Click to sign out">
                <div className="admin-user-av">{authUser?.avatar}</div>
                <div>
                  <div className="admin-user-name">{authUser?.name?.split(" ")[0]}</div>
                  <div className="admin-user-role">{authUser?.role}</div>
                </div>
                <span style={{ fontSize:"0.65rem",color:"#e53935",fontWeight:600,marginLeft:4 }}>Sign Out</span>
              </div>
            </div>
          </div>

          {/* Dashboard */}
          {adminTab==="dashboard" && (
            <div>
              <div className="adm-h"><div className="adm-title">Welcome back, {authUser?.name?.split(" ")[0]}! 👋</div><div style={{ fontSize:"0.82rem",color:"#aaa" }}>Role: <strong style={{ color:ACC }}>{authUser?.role}</strong></div></div>
              <div className="stats-row">
                {[{l:"Total Bookings",v:data.bookings.length,ic:"calendar",bg:"#fff3ef",ic_c:ACC},{l:"Live Packages",v:data.packages.length,ic:"package",bg:"#e3f2fd",ic_c:"#1565c0"},{l:"Destinations",v:data.destinations.length,ic:"map",bg:"#e8f5e9",ic_c:"#2e7d32"},{l:"Active Users",v:adminUsers.filter(u=>u.active).length,ic:"users",bg:"#f3e5f5",ic_c:"#7b1fa2"}].map(s => (
                  <div key={s.l} className="stat-c">
                    <div className="stat-ico" style={{ background:s.bg }}><I n={s.ic} s={22} c={s.ic_c} /></div>
                    <div><div className="stat-num">{s.v}</div><div className="stat-lbl">{s.l}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr",gap:"1.5rem" }}>
                <div className="a-card">
                  <div className="a-card-h">Recent Bookings</div>
                  <table style={{ width:"100%",borderCollapse:"collapse" }}>
                    <thead><tr>{["Name","Package","Travellers","Total","Status"].map(h=><th key={h} style={{ textAlign:"left",padding:"8px 12px",fontSize:"0.68rem",fontWeight:700,color:"#aaa",background:"#f8f9fa",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                    <tbody>{data.bookings.slice(0,5).map(b=>(
                      <tr key={b.id}>
                        <td style={{ padding:"10px 12px",fontWeight:600,fontSize:"0.83rem",borderBottom:"1px solid #f5f5f5" }}>{b.name}</td>
                        <td style={{ padding:"10px 12px",fontSize:"0.78rem",color:"#777",borderBottom:"1px solid #f5f5f5",maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{b.package}</td>
                        <td style={{ padding:"10px 12px",fontSize:"0.83rem",borderBottom:"1px solid #f5f5f5" }}>{b.travelers}</td>
                        <td style={{ padding:"10px 12px",fontWeight:700,fontSize:"0.83rem",color:ACC,borderBottom:"1px solid #f5f5f5" }}>₹{b.total.toLocaleString("en-IN")}</td>
                        <td style={{ padding:"10px 12px",borderBottom:"1px solid #f5f5f5" }}><span className={`badge ${b.status==="Confirmed"?"b-g":"b-o"}`}>{b.status}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="a-card">
                  <div className="a-card-h">Quick Actions</div>
                  {[["Manage Packages","packages","package"],["View Bookings","bookings","calendar"],["Add Blog Post","blog","book"],["SEO Settings","seo","seo"]].map(([l,t,ic]) => (
                    <button key={l} onClick={() => setAdminTab(t)} className="btn" style={{ width:"100%",background:"#f8f9fa",color:DARK,justifyContent:"flex-start",gap:10,marginBottom:8,borderRadius:10,padding:"10px 14px",fontSize:"0.83rem" }}>
                      <I n={ic} s={16} c={ACC} />{l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Destinations */}
          {adminTab==="destinations" && (
            <div>
              <div className="adm-h">
                <div className="adm-title">Destinations</div>
                <button className="btn btn-primary btn-sm" onClick={openAddDest}><I n="plus" s={15} c="#fff"/> Add Destination</button>
              </div>

              {/* Destination Cards Grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1.25rem" }}>
                {data.destinations.map(d=>(
                  <div key={d.id} style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0" }}>
                    <div style={{ position:"relative", height:150, overflow:"hidden", background:FOREST }}>
                      {d.image ? (
                        <img src={d.image} alt={d.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}
                          onError={e=>{ e.target.style.display="none"; }} />
                      ) : (
                        <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(135deg,${CAT_COLORS[d.tag]||FOREST},${DARK})` }}>
                          <I n="map" s={40} c="rgba(255,255,255,0.2)" />
                        </div>
                      )}
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent)" }} />
                      <button onClick={()=>openEditDest(d)} title="Change image" style={{ position:"absolute", top:8, right:8, background:"rgba(255,255,255,0.9)", border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <I n="image" s={15} c={DARK} />
                      </button>
                      <div style={{ position:"absolute", bottom:10, left:12 }}>
                        <span style={{ background:CAT_COLORS[d.tag]||ACC, color:"#fff", fontSize:"0.65rem", fontWeight:700, padding:"3px 10px", borderRadius:50 }}>{d.tag}</span>
                      </div>
                    </div>
                    <div style={{ padding:"1rem" }}>
                      <div style={{ fontWeight:700, fontSize:"0.95rem", color:DARK }}>{d.name}</div>
                      <div style={{ fontSize:"0.78rem", color:"#888", marginBottom:"0.6rem" }}>{d.state}</div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div style={{ fontSize:"0.78rem", color:"#777" }}>⭐ {d.rating} · {Number(d.reviews).toLocaleString("en-IN")} reviews</div>
                        <div style={{ display:"flex", gap:6 }}>
                          <button className="ic-btn ic-btn-b" onClick={()=>openEditDest(d)} title="Edit"><I n="edit" s={14}/></button>
                          <button className="ic-btn ic-btn-r" onClick={()=>del("destination",d.id)} title="Delete"><I n="trash" s={14}/></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Destination Modal */}
              {destModal && (
                <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem" }} onClick={closeDestModal}>
                  <div style={{ background:"#fff",borderRadius:20,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
                    <div style={{ background:DARK,borderRadius:"20px 20px 0 0",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:1 }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#fff" }}>{destModal==="add"?"➕ Add Destination":"✏️ Edit Destination"}</div>
                      <button style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:32,height:32,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={closeDestModal}><I n="close" s={16} c="#fff"/></button>
                    </div>
                    <div style={{ padding:"2rem" }}>

                      {/* IMAGE URL + LIVE PREVIEW */}
                      <div className="a-fg">
                        <label className="a-lbl" style={{ marginBottom:6,display:"block",fontSize:"0.82rem",fontWeight:700 }}>Cover Image URL</label>

                        <div style={{ display:"flex",gap:"0.5rem",marginBottom:"0.6rem" }}>
                          <input
                            className="a-inp"
                            placeholder="Paste any Unsplash or image URL..."
                            value={destForm.image}
                            style={{ flex:1 }}
                            onChange={e=>setDestForm(f=>({...f, image:cleanImageUrl(e.target.value)}))}
                            onPaste={e=>{
                              e.preventDefault();
                              const pasted = e.clipboardData.getData("text");
                              setDestForm(f=>({...f, image:cleanImageUrl(pasted)}));
                            }}
                          />
                          {destForm.image && (
                            <button className="btn btn-sm" style={{ background:"#f0f0f0",color:"#555",flexShrink:0 }} onClick={()=>setDestForm(f=>({...f,image:""}))}>Clear</button>
                          )}
                        </div>

                        {/* Format guide */}
                        <div style={{ background:"#fff8e1",border:"1px solid #ffe082",borderRadius:10,padding:"0.85rem 1rem",marginBottom:"0.85rem",fontSize:"0.77rem",color:"#5d4037",lineHeight:1.75 }}>
                          <strong style={{ fontSize:"0.8rem" }}>💡 Paste any of these — auto-converted instantly:</strong>
                          <div style={{ marginTop:"0.4rem",display:"flex",flexDirection:"column",gap:3 }}>
                            <div>✅ <strong>Unsplash photo page URL</strong> — <code style={{ background:"#f5e6c8",padding:"1px 6px",borderRadius:4,fontSize:"0.7rem" }}>unsplash.com/photos/abc-xyz</code></div>
                            <div>✅ <strong>Unsplash image URL</strong> (any length/params) — auto-cleaned</div>
                            <div>✅ <strong>Any direct image link</strong> ending in <code style={{ background:"#f5e6c8",padding:"1px 6px",borderRadius:4,fontSize:"0.7rem" }}>.jpg .png .webp</code></div>
                          </div>
                        </div>

                        {/* Live Preview */}
                        <ImagePreviewBox url={destForm.image} bg={`linear-gradient(135deg,${FOREST},${DARK})`} />
                      </div>

                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                        <div className="a-fg"><label className="a-lbl">Destination Name *</label><input className="a-inp" placeholder="e.g. Leh-Ladakh" value={destForm.name} onChange={e=>setDestForm(f=>({...f,name:e.target.value}))} /></div>
                        <div className="a-fg"><label className="a-lbl">State *</label><input className="a-inp" placeholder="e.g. Jammu & Kashmir" value={destForm.state} onChange={e=>setDestForm(f=>({...f,state:e.target.value}))} /></div>
                        <div className="a-fg">
                          <label className="a-lbl">Category Tag</label>
                          <select className="a-sel" value={destForm.tag} onChange={e=>setDestForm(f=>({...f,tag:e.target.value}))}>
                            {tagOptions.map(t=><option key={t}>{t}</option>)}
                          </select>
                        </div>
                        <div className="a-fg"><label className="a-lbl">Rating (1–5)</label><input className="a-inp" type="number" min="1" max="5" step="0.1" value={destForm.rating} onChange={e=>setDestForm(f=>({...f,rating:e.target.value}))} /></div>
                        <div className="a-fg" style={{ gridColumn:"1/-1" }}><label className="a-lbl">Number of Reviews</label><input className="a-inp" type="number" value={destForm.reviews} onChange={e=>setDestForm(f=>({...f,reviews:e.target.value}))} /></div>
                      </div>

                      <div style={{ display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1.5rem",paddingTop:"1.25rem",borderTop:"1px solid #f5f5f5" }}>
                        <button className="btn" style={{ background:"#f0f0f0",color:"#555" }} onClick={closeDestModal}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveDest}><I n="check" s={15} c="#fff"/> {destModal==="add"?"Add Destination":"Save Changes"}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}


          {/* Packages */}
          {adminTab==="packages" && (
            <div>
              <div className="adm-h">
                <div className="adm-title">Travel Packages</div>
                <button className="btn btn-primary btn-sm" onClick={openAddPkg}><I n="plus" s={15} c="#fff" /> Add New Package</button>
              </div>
              {/* Package cards grid */}
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:"1.25rem" }}>
                {data.packages.map(p=>(
                  <div key={p.id} style={{ background:"#fff",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,0.07)",border:"1px solid #f0f0f0" }}>
                    <div style={{ position:"relative",height:140,overflow:"hidden" }}>
                      <img src={p.image||"https://wsrv.nl/?url=images.unsplash.com/photo-1506905925346-21bda4d32df4&w=800&q=80&fit=cover"} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                      <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.6),transparent)" }} />
                      <div style={{ position:"absolute",top:10,left:10,display:"flex",gap:6 }}>
                        <span style={{ background:CAT_COLORS[p.category]||ACC,color:"#fff",fontSize:"0.65rem",fontWeight:700,padding:"3px 10px",borderRadius:50 }}>{p.category}</span>
                        <span style={{ background:"rgba(0,0,0,0.5)",color:"#fff",fontSize:"0.65rem",fontWeight:700,padding:"3px 10px",borderRadius:50 }}>{p.badge}</span>
                      </div>
                      <div style={{ position:"absolute",bottom:10,right:10,display:"flex",gap:6 }}>
                        <button className="ic-btn" style={{ background:"rgba(255,255,255,0.9)",color:"#1565c0" }} onClick={()=>go("pkg-detail",p)} title="Preview"><I n="eye" s={14} /></button>
                        <button className="ic-btn" style={{ background:ACC,color:"#fff" }} onClick={()=>openEditPkg(p)} title="Edit Package"><I n="edit" s={14} /></button>
                        <button className="ic-btn" style={{ background:"#c62828",color:"#fff" }} onClick={()=>del("package",p.id)} title="Delete"><I n="trash" s={14} /></button>
                      </div>
                    </div>
                    <div style={{ padding:"1rem" }}>
                      <div style={{ fontWeight:700,fontSize:"0.95rem",color:DARK,marginBottom:"4px",lineHeight:1.3 }}>{p.name}</div>
                      <div style={{ fontSize:"0.75rem",color:"#888",marginBottom:"0.75rem" }}>{p.destination} · {p.state}</div>
                      <div style={{ display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"0.75rem" }}>
                        <span style={{ fontSize:"0.75rem",color:"#666",display:"flex",alignItems:"center",gap:4 }}><I n="clock" s={12} c="#aaa"/>{p.duration}</span>
                        <span style={{ fontSize:"0.75rem",color:"#666",display:"flex",alignItems:"center",gap:4 }}><I n="users" s={12} c="#aaa"/>{p.groupSize}</span>
                      </div>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"0.75rem",borderTop:"1px solid #f5f5f5" }}>
                        <div>
                          <div style={{ fontSize:"0.68rem",color:"#bbb",textDecoration:"line-through" }}>₹{Number(p.originalPrice).toLocaleString("en-IN")}</div>
                          <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",fontWeight:700,color:DARK }}>₹{Number(p.price).toLocaleString("en-IN")}<span style={{ fontFamily:"Outfit",fontSize:"0.68rem",color:"#aaa",fontWeight:400 }}>/person</span></div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:"0.75rem",color:"#777" }}>⭐ {p.rating}</div>
                          <div style={{ fontSize:"0.7rem",color:"#bbb" }}>{p.itinerary?.length||0} days · {p.highlights?.length||0} highlights</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── PACKAGE EDITOR MODAL ── */}
              {pkgModal && (
                <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:500,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"1.5rem",overflowY:"auto" }} onClick={closePkgModal}>
                  <div style={{ background:"#fff",borderRadius:20,width:"100%",maxWidth:860,marginTop:"1rem",marginBottom:"2rem" }} onClick={e=>e.stopPropagation()}>
                    {/* Modal Header */}
                    <div style={{ padding:"1.5rem 2rem",borderBottom:"2px solid #f5f5f5",display:"flex",alignItems:"center",justifyContent:"space-between",background:DARK,borderRadius:"20px 20px 0 0" }}>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:700,color:"#fff" }}>{pkgModal==="add"?"➕ Add New Package":"✏️ Edit Package"}</div>
                        <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.5)",marginTop:2 }}>Fill all details including day-wise itinerary</div>
                      </div>
                      <button style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:34,height:34,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={closePkgModal}><I n="close" s={18} c="#fff"/></button>
                    </div>

                    <div style={{ padding:"2rem" }}>
                      {/* ── SECTION 1: Basic Info ── */}
                      <div style={{ marginBottom:"2rem" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem",paddingBottom:"0.75rem",borderBottom:"2px solid #f5f5f5" }}>
                          <div style={{ width:28,height:28,background:ACC,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:700,color:"#fff" }}>1</div>
                          <span style={{ fontWeight:700,fontSize:"1rem",color:DARK }}>Basic Information</span>
                        </div>
                        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
                          <div style={{ gridColumn:"1/-1" }} className="a-fg">
                            <label className="a-lbl">Package Name *</label>
                            <input className="a-inp" placeholder="e.g. Char Dham Yatra – Sacred Circuit" value={pkgForm.name} onChange={e=>setPkgForm(f=>({...f,name:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Destination *</label>
                            <input className="a-inp" placeholder="e.g. Yamunotri · Gangotri · Kedarnath" value={pkgForm.destination} onChange={e=>setPkgForm(f=>({...f,destination:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">State / Region *</label>
                            <input className="a-inp" placeholder="e.g. Uttarakhand" value={pkgForm.state} onChange={e=>setPkgForm(f=>({...f,state:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Category *</label>
                            <select className="a-sel" value={pkgForm.category} onChange={e=>setPkgForm(f=>({...f,category:e.target.value}))}>
                              {["Pilgrimage","Tiger Safari","Adventure","Heritage","Leisure","Trekking","Beach & Dive","Wildlife","Cultural"].map(c=><option key={c}>{c}</option>)}
                            </select>
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Badge Label</label>
                            <input className="a-inp" placeholder="e.g. Best Seller / New / Popular" value={pkgForm.badge} onChange={e=>setPkgForm(f=>({...f,badge:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Duration *</label>
                            <input className="a-inp" placeholder="e.g. 10 Days / 9 Nights" value={pkgForm.duration} onChange={e=>setPkgForm(f=>({...f,duration:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Group Size</label>
                            <input className="a-inp" placeholder="e.g. 2–12 people" value={pkgForm.groupSize} onChange={e=>setPkgForm(f=>({...f,groupSize:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Price (₹) *</label>
                            <input className="a-inp" type="number" placeholder="26999" value={pkgForm.price||""} onChange={e=>setPkgForm(f=>({...f,price:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Original Price (₹)</label>
                            <input className="a-inp" type="number" placeholder="34000" value={pkgForm.originalPrice||""} onChange={e=>setPkgForm(f=>({...f,originalPrice:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">Rating (e.g. 4.9)</label>
                            <input className="a-inp" type="number" step="0.1" min="1" max="5" placeholder="4.8" value={pkgForm.rating||""} onChange={e=>setPkgForm(f=>({...f,rating:e.target.value}))} />
                          </div>
                          <div className="a-fg">
                            <label className="a-lbl">No. of Reviews</label>
                            <input className="a-inp" type="number" placeholder="243" value={pkgForm.reviews||""} onChange={e=>setPkgForm(f=>({...f,reviews:e.target.value}))} />
                          </div>
                          <div style={{ gridColumn:"1/-1" }} className="a-fg">
                            <label className="a-lbl">Cover Image URL</label>
                            <div style={{ display:"flex",gap:"0.5rem",marginBottom:"0.5rem" }}>
                              <input
                                className="a-inp"
                                placeholder="Paste any Unsplash or image URL..."
                                value={pkgForm.image}
                                style={{ flex:1 }}
                                onChange={e=>{ setPkgForm(f=>({...f,image:cleanImageUrl(e.target.value)})); }}
                                onPaste={e=>{ e.preventDefault(); setPkgForm(f=>({...f,image:cleanImageUrl(e.clipboardData.getData("text"))})); }}
                              />
                              {pkgForm.image && <button className="btn btn-sm" style={{ background:"#f0f0f0",color:"#555",flexShrink:0 }} onClick={()=>setPkgForm(f=>({...f,image:""}))}>Clear</button>}
                            </div>
                            <div style={{ background:"#fff8e1",border:"1px solid #ffe082",borderRadius:8,padding:"0.6rem 0.85rem",marginBottom:"0.6rem",fontSize:"0.72rem",color:"#795548",lineHeight:1.6 }}>
                              💡 Use <strong>Unsplash</strong> URLs or any direct image link. Google Drive links auto-convert. <a href="https://unsplash.com/s/photos/india-travel" target="_blank" rel="noreferrer" style={{ color:ACC,fontWeight:600 }}>Browse Unsplash →</a>
                            </div>
                            <ImagePreviewBox url={pkgForm.image} bg={`linear-gradient(135deg,${CAT_COLORS[pkgForm.category]||FOREST},${DARK})`} />
                          </div>
                        </div>
                      </div>

                      {/* ── SECTION 2: Day-wise Itinerary ── */}
                      <div style={{ marginBottom:"2rem" }}>
                        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem",paddingBottom:"0.75rem",borderBottom:"2px solid #f5f5f5" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                            <div style={{ width:28,height:28,background:"#1E5C1E",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:700,color:"#fff" }}>2</div>
                            <span style={{ fontWeight:700,fontSize:"1rem",color:DARK }}>Day-wise Itinerary</span>
                            <span style={{ fontSize:"0.72rem",background:"#e8f5e9",color:"#2e7d32",padding:"2px 10px",borderRadius:50,fontWeight:600 }}>{pkgForm.itinerary.length} days</span>
                          </div>
                          <button className="btn btn-primary btn-sm" onClick={addDay}><I n="plus" s={14} c="#fff"/> Add Day</button>
                        </div>
                        <div style={{ display:"flex",flexDirection:"column",gap:"0.75rem" }}>
                          {pkgForm.itinerary.map((day,idx)=>(
                            <div key={idx} style={{ background:"#fafafa",border:"2px solid #eee",borderRadius:14,padding:"1rem",position:"relative" }}>
                              <div style={{ display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.75rem" }}>
                                <div style={{ width:36,height:36,background:ACC,borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#fff" }}>
                                  <span style={{ fontSize:"0.52rem",fontWeight:400,lineHeight:1 }}>Day</span>
                                  <span style={{ fontSize:"0.9rem",fontWeight:700,lineHeight:1 }}>{day.day}</span>
                                </div>
                                <div style={{ flex:1 }}>
                                  <input
                                    className="a-inp"
                                    placeholder={`Day ${day.day} title — e.g. Arrive Haridwar`}
                                    value={day.title}
                                    onChange={e=>updateDay(idx,"title",e.target.value)}
                                    style={{ marginBottom:0 }}
                                  />
                                </div>
                                {pkgForm.itinerary.length > 1 && (
                                  <button onClick={()=>removeDay(idx)} style={{ background:"#ffebee",border:"none",color:"#c62828",width:30,height:30,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><I n="trash" s={14}/></button>
                                )}
                              </div>
                              <textarea
                                className="a-ta"
                                rows={2}
                                placeholder={`Describe Day ${day.day} activities in detail...`}
                                value={day.desc}
                                onChange={e=>updateDay(idx,"desc",e.target.value)}
                                style={{ width:"100%",minHeight:60 }}
                              />
                            </div>
                          ))}
                          <button onClick={addDay} style={{ border:"2px dashed #ddd",background:"transparent",borderRadius:14,padding:"0.75rem",cursor:"pointer",color:"#aaa",fontSize:"0.85rem",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=ACC;e.currentTarget.style.color=ACC}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#ddd";e.currentTarget.style.color="#aaa"}}>
                            <I n="plus" s={16} c="currentColor"/> Add Day {pkgForm.itinerary.length+1}
                          </button>
                        </div>
                      </div>

                      {/* ── SECTION 3: Highlights ── */}
                      <div style={{ marginBottom:"2rem" }}>
                        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem",paddingBottom:"0.75rem",borderBottom:"2px solid #f5f5f5" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                            <div style={{ width:28,height:28,background:SAFFRON,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:700,color:"#fff" }}>3</div>
                            <span style={{ fontWeight:700,fontSize:"1rem",color:DARK }}>Trip Highlights</span>
                            <span style={{ fontSize:"0.72rem",background:"#fff8e1",color:"#f57f17",padding:"2px 10px",borderRadius:50,fontWeight:600 }}>{pkgForm.highlights.filter(h=>h.trim()).length} highlights</span>
                          </div>
                          <button className="btn btn-sm" style={{ background:SAFFRON,color:"#fff" }} onClick={addHighlight}><I n="plus" s={14} c="#fff"/> Add</button>
                        </div>
                        <div style={{ display:"flex",flexDirection:"column",gap:"0.6rem" }}>
                          {pkgForm.highlights.map((h,idx)=>(
                            <div key={idx} style={{ display:"flex",gap:"0.5rem",alignItems:"center" }}>
                              <span style={{ color:ACC,flexShrink:0 }}><I n="check" s={16} c={ACC}/></span>
                              <input className="a-inp" placeholder="e.g. Darshan at all 4 sacred dhams" value={h} onChange={e=>updateHighlight(idx,e.target.value)} style={{ flex:1 }} />
                              {pkgForm.highlights.length>1 && <button onClick={()=>removeHighlight(idx)} style={{ background:"#ffebee",border:"none",color:"#c62828",width:28,height:28,borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><I n="close" s={12}/></button>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── SECTION 4: Inclusions ── */}
                      <div style={{ marginBottom:"2rem" }}>
                        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem",paddingBottom:"0.75rem",borderBottom:"2px solid #f5f5f5" }}>
                          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                            <div style={{ width:28,height:28,background:"#1565c0",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:700,color:"#fff" }}>4</div>
                            <span style={{ fontWeight:700,fontSize:"1rem",color:DARK }}>What's Included</span>
                            <span style={{ fontSize:"0.72rem",background:"#e3f2fd",color:"#1565c0",padding:"2px 10px",borderRadius:50,fontWeight:600 }}>{pkgForm.includes.filter(i=>i.trim()).length} items</span>
                          </div>
                          <button className="btn btn-sm" style={{ background:"#1565c0",color:"#fff" }} onClick={addInclude}><I n="plus" s={14} c="#fff"/> Add</button>
                        </div>
                        <div style={{ display:"flex",flexDirection:"column",gap:"0.6rem" }}>
                          {pkgForm.includes.map((inc,idx)=>(
                            <div key={idx} style={{ display:"flex",gap:"0.5rem",alignItems:"center" }}>
                              <span style={{ color:"#2e7d32",flexShrink:0 }}><I n="check" s={16} c="#2e7d32"/></span>
                              <input className="a-inp" placeholder="e.g. AC vehicle throughout (Tempo Traveller)" value={inc} onChange={e=>updateInclude(idx,e.target.value)} style={{ flex:1 }} />
                              {pkgForm.includes.length>1 && <button onClick={()=>removeInclude(idx)} style={{ background:"#ffebee",border:"none",color:"#c62828",width:28,height:28,borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><I n="close" s={12}/></button>}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── Action Buttons ── */}
                      <div style={{ display:"flex",gap:"1rem",justifyContent:"flex-end",paddingTop:"1.5rem",borderTop:"2px solid #f5f5f5" }}>
                        <button className="btn" style={{ background:"#f5f5f5",color:"#555",padding:"12px 28px" }} onClick={closePkgModal}>Cancel</button>
                        <button className="btn" style={{ background:"#f5f5f5",color:DARK,padding:"12px 28px" }} onClick={()=>{ savePkg(); setTimeout(()=>go("packages"),300); }}>
                          <I n="eye" s={16} c={DARK}/> Save & Preview
                        </button>
                        <button className="btn btn-primary" style={{ padding:"12px 32px",fontSize:"0.95rem" }} onClick={savePkg}>
                          <I n="check" s={16} c="#fff"/> {pkgModal==="add"?"Publish Package":"Update Package"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Blog */}
          {adminTab==="blog" && (
            <div>
              <div className="adm-h"><div className="adm-title">Blog Posts</div><button className="btn btn-primary btn-sm"><I n="plus" s={15} c="#fff" /> New Post</button></div>
              <div className="a-table"><table>
                <thead><tr>{["Image","Title","Category","Author","Date","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                <tbody>{data.blog.map(p=>(
                  <tr key={p.id}>
                    <td><img src={p.image} alt={p.title} style={{ width:52,height:38,objectFit:"cover",borderRadius:8 }} /></td>
                    <td style={{ fontWeight:600,fontSize:"0.82rem",maxWidth:200 }}>{p.title}</td>
                    <td><span style={{ background:`${ACC}22`,color:ACC,padding:"3px 10px",borderRadius:50,fontSize:"0.7rem",fontWeight:700 }}>{p.category}</span></td>
                    <td style={{ fontSize:"0.8rem" }}>{p.author}</td>
                    <td style={{ fontSize:"0.77rem" }}>{p.date}</td>
                    <td style={{ display:"flex",gap:6 }}>
                      <button className="ic-btn ic-btn-b" onClick={()=>startEdit(p,"blog")}><I n="edit" s={14} /></button>
                      <button className="ic-btn ic-btn-r" onClick={()=>del("blog",p.id)}><I n="trash" s={14} /></button>
                    </td>
                  </tr>
                ))}</tbody>
              </table></div>
            </div>
          )}

          {/* Offers */}
          {adminTab==="offers" && (
            <div>
              <div className="adm-h"><div className="adm-title">Offers & Deals</div><button className="btn btn-primary btn-sm"><I n="plus" s={15} c="#fff" /> New Offer</button></div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1.25rem" }}>
                {data.offers.map(o=>(
                  <div key={o.id} className="a-card">
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                      <div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:700,color:o.color }}>{o.discount}</div>
                        <div style={{ fontWeight:600,marginBottom:"4px" }}>{o.title}</div>
                        <div style={{ fontSize:"0.8rem",color:"#777",marginBottom:"6px" }}>{o.desc}</div>
                        <div style={{ fontSize:"0.73rem",fontWeight:700,color:o.color }}>CODE: {o.code}</div>
                        <div style={{ fontSize:"0.7rem",color:"#aaa",marginTop:"3px" }}>Expires: {o.expiry}</div>
                      </div>
                      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                        <button className="ic-btn ic-btn-b" onClick={()=>startEdit(o,"offer")}><I n="edit" s={14} /></button>
                        <button className="ic-btn ic-btn-r" onClick={()=>del("offer",o.id)}><I n="trash" s={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bookings */}
          {/* Bookings */}
          {adminTab==="bookings" && (() => {
            const filtered = data.bookings.filter(b=>{
              const matchSearch = !bSearch || b.name.toLowerCase().includes(bSearch.toLowerCase()) || b.email.toLowerCase().includes(bSearch.toLowerCase()) || b.package.toLowerCase().includes(bSearch.toLowerCase());
              const matchStatus = bStatusFilter==="All" || b.status===bStatusFilter;
              return matchSearch && matchStatus;
            });
            const totalRevenue = data.bookings.filter(b=>b.status==="Confirmed").reduce((s,b)=>s+Number(b.total),0);
            return (
              <div>
                <div className="adm-h">
                  <div className="adm-title">Booking Requests</div>
                  <button className="btn btn-primary btn-sm" onClick={openAddB}><I n="plus" s={15} c="#fff"/> Add Manual Booking</button>
                </div>

                {/* Stats */}
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.5rem" }}>
                  {[
                    {l:"Total Bookings",v:data.bookings.length,c:ACC,bg:"#fff3ef"},
                    {l:"Confirmed",v:data.bookings.filter(b=>b.status==="Confirmed").length,c:"#2e7d32",bg:"#e8f5e9"},
                    {l:"Pending",v:data.bookings.filter(b=>b.status==="Pending").length,c:"#e65100",bg:"#fff3e0"},
                    {l:"Total Revenue",v:`₹${totalRevenue.toLocaleString("en-IN")}`,c:"#1565c0",bg:"#e3f2fd"},
                  ].map(s=>(
                    <div key={s.l} style={{ background:"#fff",borderRadius:12,padding:"1rem 1.25rem",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",borderLeft:`4px solid ${s.c}` }}>
                      <div style={{ fontSize:"0.7rem",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4 }}>{s.l}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:DARK }}>{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div style={{ display:"flex",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap",alignItems:"center" }}>
                  <div style={{ position:"relative",flex:1,minWidth:200 }}>
                    <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}><I n="search" s={15} c="#bbb"/></span>
                    <input className="a-inp" placeholder="Search by name, email, package..." value={bSearch} onChange={e=>setBSearch(e.target.value)} style={{ paddingLeft:36 }} />
                  </div>
                  {["All","Confirmed","Pending","Cancelled"].map(s=>(
                    <button key={s} className={`cat-btn${bStatusFilter===s?" on":""}`} style={{ padding:"8px 16px",fontSize:"0.78rem" }} onClick={()=>setBStatusFilter(s)}>{s}</button>
                  ))}
                </div>

                {/* Table */}
                <div className="a-table" style={{ overflowX:"auto" }}>
                  <table style={{ minWidth:860 }}>
                    <thead><tr>{["#","Customer","Contact","Package","Pax","Travel Date","Total","Source","Status","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{filtered.length===0 ? (
                      <tr><td colSpan={10} style={{ textAlign:"center",padding:"2.5rem",color:"#bbb" }}>No bookings found</td></tr>
                    ) : filtered.map((b,i)=>(
                      <tr key={b.id}>
                        <td style={{ color:"#ccc",fontSize:"0.75rem" }}>#{i+1}</td>
                        <td>
                          <div style={{ fontWeight:600,fontSize:"0.85rem" }}>{b.name}</div>
                          {b.city && <div style={{ fontSize:"0.72rem",color:"#aaa" }}>{b.city}</div>}
                        </td>
                        <td style={{ fontSize:"0.77rem",color:"#777" }}>
                          <div>{b.email}</div>
                          {b.phone && <div style={{ color:"#999" }}>{b.phone}</div>}
                        </td>
                        <td style={{ fontSize:"0.79rem",maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{b.package}</td>
                        <td style={{ textAlign:"center" }}>{b.travelers}</td>
                        <td style={{ fontSize:"0.77rem" }}>{b.date||"TBD"}</td>
                        <td style={{ fontWeight:700,color:ACC }}>₹{Number(b.total).toLocaleString("en-IN")}</td>
                        <td><span style={{ fontSize:"0.68rem",background:"#f5f5f5",padding:"3px 8px",borderRadius:50,color:"#888" }}>{b.source||"Web"}</span></td>
                        <td>
                          <select value={b.status} onChange={e=>{ const updated={...b,status:e.target.value}; setData(d=>({...d,bookings:d.bookings.map(x=>x.id===b.id?updated:x)})); fbSave("bookings",updated); showToast("Status updated"); }}
                            style={{ border:"none",background:"transparent",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",color:b.status==="Confirmed"?"#2e7d32":b.status==="Pending"?"#e65100":"#1565c0" }}>
                            <option>Confirmed</option><option>Pending</option><option>Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <div style={{ display:"flex",gap:5 }}>
                            <button className="ic-btn" style={{ background:"#fff8e1",color:"#f57f17",width:32,height:32,fontSize:"1rem" }}
                              onClick={()=>setInvoiceBooking(b)} title="Generate Invoice">🧾</button>
                            <button className="ic-btn ic-btn-b" onClick={()=>openEditB(b)} title="Edit"><I n="edit" s={14}/></button>
                            <button className="ic-btn ic-btn-r" onClick={()=>{ setData(d=>({...d,bookings:d.bookings.filter(x=>x.id!==b.id)})); showToast("Booking deleted."); }} title="Delete"><I n="trash" s={14}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>

                {/* Booking Modal */}
                {bModal && (
                  <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"1.5rem",overflowY:"auto" }} onClick={closeB}>
                    <div style={{ background:"#fff",borderRadius:20,width:"100%",maxWidth:680,marginTop:"1rem",marginBottom:"2rem" }} onClick={e=>e.stopPropagation()}>
                      <div style={{ background:DARK,borderRadius:"20px 20px 0 0",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#fff" }}>{bModal==="add"?"➕ Add Manual Booking":"✏️ Edit Booking"}</div>
                        <button style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:32,height:32,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={closeB}><I n="close" s={16} c="#fff"/></button>
                      </div>
                      <div style={{ padding:"2rem" }}>
                        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem" }}>
                          <div className="a-fg"><label className="a-lbl">Customer Name *</label><input className="a-inp" placeholder="Full name" value={bForm.name} onChange={e=>setBForm(f=>({...f,name:e.target.value}))} /></div>
                          <div className="a-fg"><label className="a-lbl">Email Address</label><input className="a-inp" type="email" placeholder="email@example.com" value={bForm.email} onChange={e=>setBForm(f=>({...f,email:e.target.value}))} /></div>
                          <div className="a-fg"><label className="a-lbl">Phone Number</label><input className="a-inp" placeholder="+91 98XXX XXXXX" value={bForm.phone||""} onChange={e=>setBForm(f=>({...f,phone:e.target.value}))} /></div>
                          <div className="a-fg"><label className="a-lbl">City</label><input className="a-inp" placeholder="e.g. Mumbai" value={bForm.city||""} onChange={e=>setBForm(f=>({...f,city:e.target.value}))} /></div>
                          <div className="a-fg" style={{ gridColumn:"1/-1" }}>
                            <label className="a-lbl">Package *</label>
                            <select className="a-sel" value={bForm.package} onChange={e=>{ const t=calcTotal(e.target.value,bForm.travelers); setBForm(f=>({...f,package:e.target.value,total:t})); }}>
                              <option value="">-- Select Package --</option>
                              {data.packages.map(p=><option key={p.id} value={p.name}>{p.name} — ₹{Number(p.price).toLocaleString("en-IN")}/person</option>)}
                            </select>
                          </div>
                          <div className="a-fg"><label className="a-lbl">No. of Travellers</label><input className="a-inp" type="number" min={1} max={100} value={bForm.travelers} onChange={e=>{ const t=calcTotal(bForm.package,e.target.value); setBForm(f=>({...f,travelers:e.target.value,total:t})); }} /></div>
                          <div className="a-fg"><label className="a-lbl">Travel Date</label><input className="a-inp" type="date" value={bForm.date||""} onChange={e=>setBForm(f=>({...f,date:e.target.value}))} /></div>
                          <div className="a-fg"><label className="a-lbl">Status</label><select className="a-sel" value={bForm.status} onChange={e=>setBForm(f=>({...f,status:e.target.value}))}><option>Confirmed</option><option>Pending</option><option>Cancelled</option></select></div>
                          <div className="a-fg"><label className="a-lbl">Booking Source</label><select className="a-sel" value={bForm.source||"Manual"} onChange={e=>setBForm(f=>({...f,source:e.target.value}))}>{["Manual","Web","WhatsApp","Phone Call","Email","Walk-in","Referral"].map(s=><option key={s}>{s}</option>)}</select></div>
                          {bForm.package && (
                            <div className="a-fg" style={{ gridColumn:"1/-1",background:`${ACC}10`,border:`2px solid ${ACC}33`,borderRadius:12,padding:"1rem",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                              <div><div style={{ fontSize:"0.75rem",color:"#aaa" }}>Total Amount</div><div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.75rem",fontWeight:700,color:DARK }}>₹{Number(bForm.total||calcTotal(bForm.package,bForm.travelers)).toLocaleString("en-IN")}</div></div>
                              <div style={{ textAlign:"right",fontSize:"0.8rem",color:"#888" }}>{bForm.travelers} × ₹{(data.packages.find(p=>p.name===bForm.package)?.price||0).toLocaleString("en-IN")}</div>
                            </div>
                          )}
                          <div className="a-fg" style={{ gridColumn:"1/-1" }}>
                            <label className="a-lbl">Special Requests / Notes</label>
                            <textarea className="a-ta" rows={3} placeholder="Any special requirements..." value={bForm.message||""} onChange={e=>setBForm(f=>({...f,message:e.target.value}))} />
                          </div>
                        </div>
                        <div style={{ display:"flex",gap:"0.75rem",justifyContent:"flex-end",paddingTop:"1.5rem",borderTop:"1px solid #f5f5f5" }}>
                          <button className="btn" style={{ background:"#f0f0f0",color:"#555" }} onClick={closeB}>Cancel</button>
                          <button className="btn btn-primary" onClick={saveB}><I n="check" s={15} c="#fff"/> {bModal==="add"?"Create Booking":"Save Changes"}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}


          {/* Reviews Management */}
          {adminTab==="reviews" && (()=>{
            const flatReviews = Object.entries(allReviews).flatMap(([pkgId, reviews]) => {
              const pkg = data.packages.find(p=>p.id===Number(pkgId));
              return reviews.map(r=>({ ...r, pkgId:Number(pkgId), pkgName:pkg?.name||"Unknown Package" }));
            });

            const filtered = flatReviews
              .filter(r => revPkgFilter==="All" || r.pkgId===Number(revPkgFilter))
              .filter(r => revStatusFilter==="All" || (revStatusFilter==="Approved"?r.approved:!r.approved))
              .filter(r => !revSearch || r.name.toLowerCase().includes(revSearch.toLowerCase()) || r.body.toLowerCase().includes(revSearch.toLowerCase()) || r.pkgName.toLowerCase().includes(revSearch.toLowerCase()))
              .sort((a,b)=>!a.approved&&b.approved?-1:a.approved&&!b.approved?1:0); // Pending first

            const totalReviews = flatReviews.length;
            const pendingReviews = flatReviews.filter(r=>!r.approved).length;
            const avgAll = flatReviews.length ? (flatReviews.reduce((s,r)=>s+r.rating,0)/flatReviews.length).toFixed(1) : "—";

            return (
              <div>
                <div className="adm-h">
                  <div className="adm-title">Reviews Management</div>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    {pendingReviews > 0 && <span style={{ background:"#fff3e0",color:"#e65100",fontSize:"0.75rem",fontWeight:700,padding:"4px 12px",borderRadius:50 }}>⏳ {pendingReviews} Pending</span>}
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1rem",marginBottom:"1.5rem" }}>
                  {[
                    {l:"Total Reviews",v:totalReviews,c:ACC,bg:"#fff3ef"},
                    {l:"Approved",v:flatReviews.filter(r=>r.approved).length,c:"#2e7d32",bg:"#e8f5e9"},
                    {l:"Pending Approval",v:pendingReviews,c:"#e65100",bg:"#fff3e0"},
                    {l:"Avg Rating",v:avgAll+"★",c:"#f57f17",bg:"#fff8e1"},
                  ].map(s=>(
                    <div key={s.l} style={{ background:"#fff",borderRadius:12,padding:"1rem 1.25rem",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",borderLeft:`4px solid ${s.c}` }}>
                      <div style={{ fontSize:"0.7rem",color:"#aaa",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4 }}>{s.l}</div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.6rem",fontWeight:700,color:DARK }}>{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div style={{ display:"flex",gap:"0.75rem",marginBottom:"1.25rem",flexWrap:"wrap",alignItems:"center" }}>
                  <div style={{ position:"relative",flex:1,minWidth:200 }}>
                    <span style={{ position:"absolute",left:12,top:"50%",transform:"translateY(-50%)" }}><I n="search" s={15} c="#bbb"/></span>
                    <input className="a-inp" placeholder="Search by name, package, review text..." value={revSearch} onChange={e=>setRevSearch(e.target.value)} style={{ paddingLeft:36 }} />
                  </div>
                  <select className="a-sel" value={revPkgFilter} onChange={e=>setRevPkgFilter(e.target.value)} style={{ minWidth:200 }}>
                    <option value="All">All Packages</option>
                    {data.packages.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  {["All","Approved","Pending"].map(s=>(
                    <button key={s} className={`cat-btn${revStatusFilter===s?" on":""}`} style={{ padding:"8px 16px",fontSize:"0.78rem" }} onClick={()=>setRevStatusFilter(s)}>{s}</button>
                  ))}
                </div>

                {/* Reviews table */}
                <div style={{ display:"flex",flexDirection:"column",gap:"1rem" }}>
                  {filtered.length===0 && (
                    <div style={{ textAlign:"center",padding:"3rem",background:"#fff",borderRadius:16,color:"#bbb" }}>No reviews found.</div>
                  )}
                  {filtered.map(r=>(
                    <div key={r.id} style={{ background:"#fff",borderRadius:16,padding:"1.25rem 1.5rem",boxShadow:"0 2px 12px rgba(0,0,0,0.05)",border:`2px solid ${!r.approved?"#ffe0b2":"#f0f0f0"}` }}>
                      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap",marginBottom:"0.85rem" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                          <div style={{ width:40,height:40,borderRadius:10,background:r.approved?ACC:"#ccc",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.78rem",fontWeight:700,flexShrink:0 }}>{r.avatar}</div>
                          <div>
                            <div style={{ fontWeight:700,fontSize:"0.88rem",color:DARK,display:"flex",alignItems:"center",gap:8 }}>
                              {r.name}
                              {r.verified ? <span className="rev-verified"><I n="check" s={10} c="#2e7d32"/>Verified</span> : <span className="rev-pending">Unverified</span>}
                              {!r.approved && <span style={{ background:"#fff3e0",color:"#e65100",fontSize:"0.65rem",fontWeight:700,padding:"2px 8px",borderRadius:50 }}>⏳ Pending</span>}
                            </div>
                            <div style={{ fontSize:"0.75rem",color:"#999",marginTop:2 }}>{r.location} · {r.date}</div>
                          </div>
                        </div>
                        <div style={{ display:"flex",alignItems:"center",gap:"0.75rem",flexShrink:0 }}>
                          <Stars r={r.rating} s={14} />
                          <span style={{ fontSize:"0.72rem",color:"#bbb",background:"#f8f8f8",padding:"3px 10px",borderRadius:50 }}>{r.pkgName?.slice(0,25)}{r.pkgName?.length>25?"...":""}</span>
                        </div>
                      </div>

                      <div style={{ fontWeight:700,fontSize:"0.9rem",color:DARK,marginBottom:"0.4rem" }}>{r.title}</div>
                      <div style={{ fontSize:"0.84rem",color:"#666",lineHeight:1.65,marginBottom:"1rem" }}>{r.body}</div>

                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem" }}>
                        <div style={{ fontSize:"0.75rem",color:"#aaa" }}>👍 {r.helpful} found helpful</div>
                        <div style={{ display:"flex",gap:6 }}>
                          <button className={`btn btn-sm`} style={{ background:r.approved?"#fff3e0":"#e8f5e9",color:r.approved?"#e65100":"#2e7d32",padding:"6px 14px",fontSize:"0.75rem",fontWeight:700 }}
                            onClick={()=>{ toggleApprove(r.pkgId,r.id); showToast(r.approved?"Review hidden.":"✅ Review approved!"); }}>
                            {r.approved?"🚫 Unapprove":"✅ Approve"}
                          </button>
                          <button className="ic-btn ic-btn-r" title="Delete review" onClick={()=>{ deleteReview(r.pkgId,r.id); showToast("Review deleted."); }}>
                            <I n="trash" s={14}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Media */}
          {adminTab==="media" && (()=>{
            const copyUrl = (item) => {
              navigator.clipboard?.writeText(item.url).catch(()=>{});
              setCopiedId(item.id);
              setTimeout(()=>setCopiedId(null), 2000);
              showToast("URL copied to clipboard!");
            };
            const addMedia = () => {
              if (!addUrl.trim()) { showToast("Enter an image URL","err"); return; }
              setMediaItems(prev=>[...prev, { id:`custom-${Date.now()}`, url:addUrl.trim(), name:addName||"Untitled", type:addType, usedIn:"Custom upload" }]);
              setAddUrl(""); setAddName(""); setAddType("Other");
              showToast("✅ Image added to library!");
            };
            const deleteMedia = (id) => {
              setMediaItems(prev=>prev.filter(m=>m.id!==id));
              if (selectedMedia?.id===id) setSelectedMedia(null);
              showToast("Image removed.");
            };

            const types = ["All","Destination","Package","Blog","Other"];
            const filtered = mediaItems.filter(m=>mediaFilter==="All"||m.type===mediaFilter);
            const typeBg = { Destination:"#e8f5e9", Package:"#e3f2fd", Blog:"#fff3e0", Other:"#f3e5f5" };
            const typeFg = { Destination:"#2e7d32", Package:"#1565c0", Blog:"#e65100", Other:"#7b1fa2" };

            return (
              <div>
                <div className="adm-h">
                  <div className="adm-title">Media Library</div>
                  <div style={{ fontSize:"0.82rem", color:"#aaa" }}>{mediaItems.length} images</div>
                </div>

                {/* Add Image */}
                <div className="a-card" style={{ marginBottom:"1.5rem" }}>
                  <div className="a-card-h" style={{ marginBottom:"1rem" }}>Add Image to Library</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 140px 120px", gap:"0.75rem", alignItems:"flex-end" }}>
                    <div className="a-fg" style={{ marginBottom:0 }}>
                      <label className="a-lbl">Image URL</label>
                      <input className="a-inp" placeholder="https://images.unsplash.com/..." value={addUrl} onChange={e=>setAddUrl(e.target.value)} />
                    </div>
                    <div className="a-fg" style={{ marginBottom:0 }}>
                      <label className="a-lbl">Label / Name</label>
                      <input className="a-inp" placeholder="e.g. Char Dham Hero" value={addName} onChange={e=>setAddName(e.target.value)} />
                    </div>
                    <div className="a-fg" style={{ marginBottom:0 }}>
                      <label className="a-lbl">Type</label>
                      <select className="a-sel" value={addType} onChange={e=>setAddType(e.target.value)}>
                        {["Destination","Package","Blog","Other"].map(t=><option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <button className="btn btn-primary" style={{ height:42, justifyContent:"center" }} onClick={addMedia}>
                      <I n="plus" s={15} c="#fff"/> Add
                    </button>
                  </div>
                  {addUrl && (
                    <div style={{ marginTop:"0.75rem", display:"flex", alignItems:"center", gap:12 }}>
                      <img src={addUrl} alt="preview" style={{ width:80, height:52, objectFit:"cover", borderRadius:8, border:"2px solid #eee" }} onError={e=>{ e.target.style.opacity="0.2"; }} />
                      <span style={{ fontSize:"0.78rem", color:"#888" }}>Preview</span>
                    </div>
                  )}
                </div>

                {/* Type filter */}
                <div style={{ display:"flex", gap:"0.5rem", marginBottom:"1.25rem", flexWrap:"wrap" }}>
                  {types.map(t=>(
                    <button key={t} className={`cat-btn${mediaFilter===t?" on":""}`} style={{ padding:"6px 16px", fontSize:"0.78rem" }} onClick={()=>setMediaFilter(t)}>
                      {t} {t!=="All" && <span style={{ opacity:0.7 }}>({mediaItems.filter(m=>m.type===t).length})</span>}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:"1rem" }}>
                  {filtered.map(item=>(
                    <div key={item.id} style={{ borderRadius:12, overflow:"hidden", position:"relative", boxShadow:"0 2px 10px rgba(0,0,0,0.08)", background:"#f5f5f5", cursor:"pointer", border:`2px solid ${selectedMedia?.id===item.id?ACC:"transparent"}`, transition:"all .2s" }}
                      onClick={()=>setSelectedMedia(selectedMedia?.id===item.id?null:item)}>
                      <div style={{ aspectRatio:"4/3", overflow:"hidden", background:FOREST }}>
                        <img src={item.url} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform .3s" }}
                          onMouseEnter={e=>e.target.style.transform="scale(1.05)"}
                          onMouseLeave={e=>e.target.style.transform="scale(1)"}
                          onError={e=>{ e.target.src=""; e.target.style.display="none"; }} />
                      </div>
                      <div style={{ padding:"0.6rem 0.75rem" }}>
                        <div style={{ fontSize:"0.75rem", fontWeight:600, color:DARK, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{item.name}</div>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:4 }}>
                          <span style={{ fontSize:"0.65rem", fontWeight:700, padding:"2px 8px", borderRadius:50, background:typeBg[item.type]||"#f5f5f5", color:typeFg[item.type]||"#888" }}>{item.type}</span>
                          <div style={{ display:"flex", gap:4 }}>
                            <button className="ic-btn" style={{ width:26, height:26, background:copiedId===item.id?"#e8f5e9":"#f0f0f0", color:copiedId===item.id?"#2e7d32":DARK }}
                              onClick={e=>{ e.stopPropagation(); copyUrl(item); }} title="Copy URL">
                              <I n="send" s={12} c={copiedId===item.id?"#2e7d32":DARK}/>
                            </button>
                            <button className="ic-btn ic-btn-r" style={{ width:26, height:26 }} onClick={e=>{ e.stopPropagation(); deleteMedia(item.id); }} title="Remove">
                              <I n="trash" s={12}/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filtered.length===0 && (
                    <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"3rem", color:"#bbb" }}>
                      <I n="image" s={40} c="#eee"/><br/>No images in this category
                    </div>
                  )}
                </div>

                {/* Selected image detail panel */}
                {selectedMedia && (
                  <div style={{ position:"fixed", bottom:"2rem", right:"2rem", background:"#fff", borderRadius:16, boxShadow:"0 8px 40px rgba(0,0,0,0.18)", padding:"1.25rem", width:300, zIndex:100, border:"2px solid #f0f0f0" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.75rem" }}>
                      <div style={{ fontSize:"0.85rem", fontWeight:700, color:DARK }}>Image Details</div>
                      <button className="ic-btn ic-btn-r" style={{ width:26,height:26 }} onClick={()=>setSelectedMedia(null)}><I n="close" s={12}/></button>
                    </div>
                    <img src={selectedMedia.url} alt={selectedMedia.name} style={{ width:"100%", height:140, objectFit:"cover", borderRadius:10, marginBottom:"0.75rem" }} />
                    <div style={{ fontSize:"0.8rem", fontWeight:600, color:DARK, marginBottom:2 }}>{selectedMedia.name}</div>
                    <div style={{ fontSize:"0.72rem", color:"#888", marginBottom:"0.75rem" }}>Type: {selectedMedia.type} · Used in: {selectedMedia.usedIn}</div>
                    <div style={{ fontSize:"0.68rem", color:"#aaa", wordBreak:"break-all", background:"#f8f8f8", padding:"6px 10px", borderRadius:8, marginBottom:"0.75rem" }}>{selectedMedia.url?.slice(0,60)}...</div>
                    <button className="btn btn-primary btn-sm" style={{ width:"100%", justifyContent:"center" }} onClick={()=>copyUrl(selectedMedia)}>
                      <I n="send" s={14} c="#fff"/> {copiedId===selectedMedia.id ? "Copied! ✓" : "Copy Image URL"}
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

          {/* SEO */}
          {adminTab==="seo" && (
            <div>
              <div className="adm-h"><div className="adm-title">SEO Settings</div></div>
              <div className="a-card">
                <div className="a-card-h">Search Engine Optimization</div>
                {[["Site Title","siteTitle"],["Meta Description","metaDescription"],["Focus Keywords","keywords"]].map(([l,k])=>(
                  <div key={k} className="a-fg">
                    <label className="a-lbl">{l}</label>
                    {k==="metaDescription"?<textarea className="a-ta" value={data.seo[k]} onChange={e=>setData(d=>({...d,seo:{...d.seo,[k]:e.target.value}}))} />:<input className="a-inp" value={data.seo[k]} onChange={e=>setData(d=>({...d,seo:{...d.seo,[k]:e.target.value}}))} />}
                    {k==="metaDescription"&&<div style={{ fontSize:"0.68rem",color:data.seo[k].length>160?"#e53935":"#aaa",textAlign:"right",marginTop:3 }}>{data.seo[k].length}/160</div>}
                  </div>
                ))}
                <div className="a-fg">
                  <label className="a-lbl" style={{ marginBottom:"0.6rem",display:"block" }}>Google Search Preview</label>
                  <div className="seo-preview">
                    <div className="seo-url">hikesandmiles.in › india-tours</div>
                    <div className="seo-t">{data.seo.siteTitle}</div>
                    <div className="seo-d">{data.seo.metaDescription}</div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={()=>{ fbSaveSetting("seo", data.seo); showToast("SEO settings saved!"); }}>Save SEO</button>
              </div>
            </div>
          )}

          {/* Branding */}
          {adminTab==="design" && (
            <div>
              <div className="adm-h"><div className="adm-title">Branding & Design</div></div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem" }}>
                <div className="a-card">
                  <div className="a-card-h">Company Info</div>
                  {[["Company Name","name"],["Tagline","tagline"],["Email","email"],["Phone","phone"],["WhatsApp","whatsapp"],["Address","address"]].map(([l,k])=>(
                    <div key={k} className="a-fg"><label className="a-lbl">{l}</label><input className="a-inp" value={data.brand[k]} onChange={e=>setData(d=>({...d,brand:{...d.brand,[k]:e.target.value}}))} /></div>
                  ))}
                  <button className="btn btn-primary btn-sm" onClick={()=>{ fbSaveSetting("brand", data.brand); showToast("Brand info saved!"); }}>Save</button>
                </div>
                <div className="a-card">
                  <div className="a-card-h">Hero Content</div>
                  {[["Hero Title","heroTitle"],["Hero Subtitle","heroSubtitle"]].map(([l,k])=>(
                    <div key={k} className="a-fg"><label className="a-lbl">{l}</label><textarea className="a-ta" value={data.brand[k]} onChange={e=>setData(d=>({...d,brand:{...d.brand,[k]:e.target.value}}))} /></div>
                  ))}
                  <div className="a-fg">
                    <label className="a-lbl" style={{ marginBottom:"0.6rem",display:"block" }}>Accent Colour</label>
                    <div style={{ display:"flex",gap:"0.65rem",flexWrap:"wrap",alignItems:"center" }}>
                      {["#D4500A","#E8651A","#B8860B","#1E5C1E","#8B1A1A","#1A3A6E","#6B21A8"].map(c=>(
                        <div key={c} onClick={()=>setData(d=>({...d,brand:{...d.brand,accentColor:c}}))} style={{ width:34,height:34,borderRadius:8,background:c,cursor:"pointer",border:`3px solid ${data.brand.accentColor===c?DARK:"transparent"}`,transition:"border .15s" }} />
                      ))}
                      <input type="color" value={data.brand.accentColor} onChange={e=>setData(d=>({...d,brand:{...d.brand,accentColor:e.target.value}}))} style={{ width:34,height:34,border:"none",borderRadius:8,cursor:"pointer" }} />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={()=>showToast("Design settings saved!")}>Save</button>
                </div>
              </div>
            </div>
          )}

          {/* Users & Access */}
          {adminTab==="users" && (()=>{
            const openAddUser = () => { setUserForm({...emptyUser, id:Date.now()}); setUserModal("add"); };
            const openEditUser = (u) => { setUserForm({...u}); setUserModal("edit"); };
            const openPasswd = (u) => { setUserForm({...u}); setPasswdForm({newPass:"",confirmPass:""}); setUserModal("passwd"); };
            const closeUModal = () => { setUserModal(null); setUserForm(emptyUser); };

            const saveUser = () => {
              if (!userForm.name.trim()) { showToast("Name is required","err"); return; }
              if (!userForm.email.trim()) { showToast("Email is required","err"); return; }
              if (userModal==="add" && !userForm.password.trim()) { showToast("Password is required","err"); return; }
              if (!ROLE_ACCESS[userForm.role]) { showToast("Invalid role","err"); return; }
              const initials = userForm.name.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
              if (userModal==="add") {
                if (adminUsers.find(u=>u.email.toLowerCase()===userForm.email.toLowerCase())) { showToast("Email already registered","err"); return; }
                const newUser = {...userForm, avatar:initials, lastLogin:"Never"};
                setAdminUsers(prev=>[...prev, newUser]);
                fbSave("users", newUser);
                showToast(`✅ User "${userForm.name}" added!`);
              } else {
                const updated = {...userForm, avatar:initials};
                setAdminUsers(prev=>prev.map(u=>u.id===userForm.id?updated:u));
                fbSave("users", updated);
                showToast("✅ User updated!");
              }
              closeUModal();
            };
            const savePasswd = () => {
              if (!passwdForm.newPass) { showToast("Enter new password","err"); return; }
              if (passwdForm.newPass !== passwdForm.confirmPass) { showToast("Passwords don't match","err"); return; }
              if (passwdForm.newPass.length < 6) { showToast("Min 6 characters","err"); return; }
              const updated = adminUsers.find(u=>u.id===userForm.id);
              if (updated) {
                const newUser = {...updated, password:passwdForm.newPass};
                setAdminUsers(prev=>prev.map(u=>u.id===userForm.id?newUser:u));
                fbSave("users", newUser);
              }
              showToast("✅ Password updated!"); closeUModal();
            };
            const saveMyPasswd = () => {
              if (!myPassForm.current) { showToast("Enter current password","err"); return; }
              if (myPassForm.current !== authUser?.password) { showToast("Current password is incorrect","err"); return; }
              if (!myPassForm.newPass) { showToast("Enter new password","err"); return; }
              if (myPassForm.newPass !== myPassForm.confirm) { showToast("Passwords don't match","err"); return; }
              if (myPassForm.newPass.length < 6) { showToast("Min 6 characters required","err"); return; }
              const updated = {...authUser, password:myPassForm.newPass};
              setAdminUsers(prev=>prev.map(u=>u.id===authUser.id?updated:u));
              fbSave("users", updated);
              setMyPassForm({current:"",newPass:"",confirm:""});
              showToast("✅ Your password has been updated!");
            };

            const roleColors = { "Super Admin":"role-super","Package Manager":"role-pkg","Content Editor":"role-content","Booking Manager":"role-booking" };

            return (
              <div>
                <div className="adm-h">
                  <div className="adm-title">Users &amp; Access</div>
                  {authUser?.role==="Super Admin" && (
                    <button className="btn btn-primary btn-sm" onClick={openAddUser}><I n="plus" s={15} c="#fff"/> Add User</button>
                  )}
                </div>

                {/* Role Access Cards */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:"0.75rem", marginBottom:"1.75rem" }}>
                  {Object.entries(ROLE_ACCESS).map(([role, tabs])=>(
                    <div key={role} style={{ background:"#fff", border:"1.5px solid #f0f0f0", borderRadius:12, padding:"0.9rem 1rem" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"0.5rem" }}>
                        <span className={`user-role-badge ${roleColors[role]||""}`}>{role}</span>
                      </div>
                      <div style={{ fontSize:"0.68rem", color:"#999", lineHeight:1.7 }}>
                        {tabs.map(t=> <span key={t} style={{ display:"inline-block", background:"#f5f5f5", color:"#666", padding:"1px 7px", borderRadius:4, marginRight:4, marginBottom:3, fontSize:"0.65rem" }}>{t}</span>)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Users Table */}
                <div className="a-table" style={{ marginBottom:"1.5rem" }}>
                  <table>
                    <thead><tr>{["User","Email","Role","Status","Last Login","Actions"].map(h=><th key={h}>{h}</th>)}</tr></thead>
                    <tbody>{adminUsers.map(u=>(
                      <tr key={u.id} style={{ opacity:u.active?1:0.5 }}>
                        <td>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:36, height:36, borderRadius:10, background:u.active?ACC:"#ccc", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", fontWeight:700, flexShrink:0 }}>{u.avatar}</div>
                            <div>
                              <div style={{ fontWeight:600, fontSize:"0.85rem" }}>{u.name}</div>
                              {u.id===authUser?.id && <div style={{ fontSize:"0.65rem", color:ACC, fontWeight:700 }}>● You</div>}
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize:"0.8rem", color:"#777" }}>{u.email}</td>
                        <td><span className={`user-role-badge ${roleColors[u.role]||""}`}>{u.role}</span></td>
                        <td>
                          {authUser?.role==="Super Admin" && u.id!==authUser?.id ? (
                            <button onClick={()=>{
                              const updated = {...u, active:!u.active};
                              setAdminUsers(prev=>prev.map(x=>x.id===u.id?updated:x));
                              fbSave("users", updated);
                              showToast(`User ${u.active?"deactivated":"activated"}.`);
                            }}
                              style={{ background:u.active?"#e8f5e9":"#fff3e0", color:u.active?"#2e7d32":"#e65100", border:"none", borderRadius:50, padding:"3px 12px", fontSize:"0.72rem", fontWeight:700, cursor:"pointer" }}>
                              {u.active?"● Active":"○ Inactive"}
                            </button>
                          ) : (
                            <span className={`badge ${u.active?"b-g":"b-o"}`}>{u.active?"Active":"Inactive"}</span>
                          )}
                        </td>
                        <td style={{ fontSize:"0.77rem", color:"#aaa" }}>{u.lastLogin}</td>
                        <td>
                          {u.id===authUser?.id ? (
                            <span style={{ fontSize:"0.72rem", color:ACC, fontWeight:600 }}>Current Session</span>
                          ) : authUser?.role==="Super Admin" ? (
                            <div style={{ display:"flex", gap:5 }}>
                              <button className="ic-btn ic-btn-b" title="Edit User" onClick={()=>openEditUser(u)}><I n="edit" s={14}/></button>
                              <button className="ic-btn" style={{ background:"#fff3e0", color:"#e65100" }} title="Reset Password" onClick={()=>openPasswd(u)}><I n="settings" s={14} c="#e65100"/></button>
                              <button className="ic-btn ic-btn-r" title="Delete" onClick={()=>{ setAdminUsers(prev=>prev.filter(x=>x.id!==u.id)); fbDelete("users", u.id); showToast("User deleted."); }}><I n="trash" s={14}/></button>
                            </div>
                          ) : <span style={{ fontSize:"0.72rem", color:"#ccc" }}>—</span>}
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>

                {/* My Account */}
                <div className="a-card">
                  <div className="a-card-h">My Account</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }}>
                    <div className="a-fg"><label className="a-lbl">Full Name</label><input className="a-inp" value={authUser?.name||""} readOnly style={{ background:"#f9f9f9",color:"#999" }} /></div>
                    <div className="a-fg"><label className="a-lbl">Email</label><input className="a-inp" value={authUser?.email||""} readOnly style={{ background:"#f9f9f9",color:"#999" }} /></div>
                    <div className="a-fg"><label className="a-lbl">Role</label><input className="a-inp" value={authUser?.role||""} readOnly style={{ background:"#f9f9f9",color:"#999" }} /></div>
                    <div className="a-fg"><label className="a-lbl">Last Login</label><input className="a-inp" value={authUser?.lastLogin||""} readOnly style={{ background:"#f9f9f9",color:"#999" }} /></div>
                  </div>
                  <div style={{ borderTop:"2px solid #f5f5f5", paddingTop:"1.25rem" }}>
                    <div style={{ fontWeight:700, fontSize:"0.88rem", color:DARK, marginBottom:"1rem" }}>🔒 Change My Password</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem" }}>
                      <div className="a-fg"><label className="a-lbl">Current Password</label><input className="a-inp" type="password" placeholder="Current password" value={myPassForm.current} onChange={e=>setMyPassForm(f=>({...f,current:e.target.value}))} /></div>
                      <div className="a-fg"><label className="a-lbl">New Password</label><input className="a-inp" type="password" placeholder="Min 6 characters" value={myPassForm.newPass} onChange={e=>setMyPassForm(f=>({...f,newPass:e.target.value}))} /></div>
                      <div className="a-fg"><label className="a-lbl">Confirm Password</label><input className="a-inp" type="password" placeholder="Repeat new password" value={myPassForm.confirm} onChange={e=>setMyPassForm(f=>({...f,confirm:e.target.value}))} /></div>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={saveMyPasswd}>Update My Password</button>
                  </div>
                </div>

                {/* Add / Edit User Modal */}
                {(userModal==="add"||userModal==="edit") && (
                  <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem" }} onClick={closeUModal}>
                    <div style={{ background:"#fff",borderRadius:20,width:"100%",maxWidth:500 }} onClick={e=>e.stopPropagation()}>
                      <div style={{ background:DARK,borderRadius:"20px 20px 0 0",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.4rem",fontWeight:700,color:"#fff" }}>{userModal==="add"?"➕ Add New User":"✏️ Edit User"}</div>
                        <button style={{ background:"rgba(255,255,255,0.1)",border:"none",color:"#fff",width:32,height:32,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={closeUModal}><I n="close" s={16} c="#fff"/></button>
                      </div>
                      <div style={{ padding:"2rem" }}>
                        <div className="a-fg"><label className="a-lbl">Full Name *</label><input className="a-inp" placeholder="e.g. Priya Sharma" value={userForm.name} onChange={e=>setUserForm(f=>({...f,name:e.target.value}))} /></div>
                        <div className="a-fg"><label className="a-lbl">Email Address *</label><input className="a-inp" type="email" placeholder="priya@hikesandmiles.in" value={userForm.email} onChange={e=>setUserForm(f=>({...f,email:e.target.value}))} /></div>
                        {userModal==="add" && (
                          <div className="a-fg">
                            <label className="a-lbl">Password *</label>
                            <div style={{ position:"relative" }}>
                              <input className="a-inp" type={showPw?"text":"password"} placeholder="Min 6 characters" value={userForm.password} onChange={e=>setUserForm(f=>({...f,password:e.target.value}))} style={{ paddingRight:80 }} />
                              <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"0.72rem",color:"#aaa",fontWeight:600 }}>{showPw?"Hide":"Show"}</button>
                            </div>
                          </div>
                        )}
                        <div className="a-fg">
                          <label className="a-lbl">Role *</label>
                          <select className="a-sel" value={userForm.role} onChange={e=>setUserForm(f=>({...f,role:e.target.value}))}>
                            {Object.keys(ROLE_ACCESS).map(r=><option key={r}>{r}</option>)}
                          </select>
                          <div style={{ fontSize:"0.72rem",color:"#aaa",marginTop:5 }}>Access: {(ROLE_ACCESS[userForm.role]||[]).join(", ")}</div>
                        </div>
                        <div className="a-fg">
                          <label className="a-lbl">Status</label>
                          <div style={{ display:"flex",gap:"0.75rem",marginTop:6 }}>
                            {["Active","Inactive"].map(s=>(
                              <label key={s} style={{ display:"flex",alignItems:"center",gap:6,fontSize:"0.85rem",cursor:"pointer" }}>
                                <input type="radio" name="ustatus" checked={(s==="Active")===userForm.active} onChange={()=>setUserForm(f=>({...f,active:s==="Active"}))} style={{ accentColor:ACC }} />
                                {s}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div style={{ display:"flex",gap:"0.75rem",justifyContent:"flex-end",paddingTop:"1.25rem",borderTop:"1px solid #f5f5f5" }}>
                          <button className="btn" style={{ background:"#f0f0f0",color:"#555" }} onClick={closeUModal}>Cancel</button>
                          <button className="btn btn-primary" onClick={saveUser}><I n="check" s={15} c="#fff"/> {userModal==="add"?"Add User":"Save Changes"}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reset Password Modal */}
                {userModal==="passwd" && (
                  <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.55)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem" }} onClick={closeUModal}>
                    <div style={{ background:"#fff",borderRadius:20,width:"100%",maxWidth:420 }} onClick={e=>e.stopPropagation()}>
                      <div style={{ background:"#c62828",borderRadius:"20px 20px 0 0",padding:"1.5rem 2rem",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",fontWeight:700,color:"#fff" }}>🔒 Reset Password for {userForm.name}</div>
                        <button style={{ background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",width:30,height:30,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={closeUModal}><I n="close" s={14} c="#fff"/></button>
                      </div>
                      <div style={{ padding:"2rem" }}>
                        <div className="a-fg"><label className="a-lbl">New Password</label><input className="a-inp" type={showPw?"text":"password"} placeholder="Min 6 characters" value={passwdForm.newPass} onChange={e=>setPasswdForm(f=>({...f,newPass:e.target.value}))} /></div>
                        <div className="a-fg">
                          <label className="a-lbl">Confirm Password</label>
                          <div style={{ position:"relative" }}>
                            <input className="a-inp" type={showPw?"text":"password"} placeholder="Repeat password" value={passwdForm.confirmPass} onChange={e=>setPasswdForm(f=>({...f,confirmPass:e.target.value}))} style={{ paddingRight:80 }} />
                            <button onClick={()=>setShowPw(p=>!p)} style={{ position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:"0.72rem",color:"#aaa",fontWeight:600 }}>{showPw?"Hide":"Show"}</button>
                          </div>
                        </div>
                        <div style={{ display:"flex",gap:"0.75rem",justifyContent:"flex-end",paddingTop:"1.25rem",borderTop:"1px solid #f5f5f5" }}>
                          <button className="btn" style={{ background:"#f0f0f0",color:"#555" }} onClick={closeUModal}>Cancel</button>
                          <button className="btn" style={{ background:"#c62828",color:"#fff" }} onClick={savePasswd}><I n="check" s={15} c="#fff"/> Reset Password</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Generic Edit Modal (non-package items) */}
          {lEdit && (
            <div className="modal-bg" onClick={()=>setLEdit(null)}>
              <div className="modal" onClick={e=>e.stopPropagation()}>
                <div className="modal-h">
                  <span>Edit {lEdit.type.charAt(0).toUpperCase()+lEdit.type.slice(1)}</span>
                  <button className="ic-btn ic-btn-r" onClick={()=>setLEdit(null)}><I n="close" s={15} /></button>
                </div>
                {Object.entries(lForm).filter(([k])=>!["id","image","highlights","itinerary","includes"].includes(k)).map(([key,val])=>(
                  <div key={key} className="a-fg">
                    <label className="a-lbl">{key.replace(/([A-Z])/g," $1").replace(/^./,s=>s.toUpperCase())}</label>
                    {typeof val==="number"?(
                      <input type="number" className="a-inp" value={val} onChange={e=>setLForm(f=>({...f,[key]:parseFloat(e.target.value)}))} />
                    ):key==="status"?(
                      <select className="a-sel" value={val} onChange={e=>setLForm(f=>({...f,[key]:e.target.value}))}>{["Pending","Confirmed","Cancelled"].map(s=><option key={s}>{s}</option>)}</select>
                    ):(
                      <input className="a-inp" value={val} onChange={e=>setLForm(f=>({...f,[key]:e.target.value}))} />
                    )}
                  </div>
                ))}
                <div style={{ display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1.25rem" }}>
                  <button className="btn" style={{ background:"#f0f0f0",color:"#555" }} onClick={()=>setLEdit(null)}>Cancel</button>
                  <button className="btn btn-primary" onClick={saveEdit}>Save Changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default Admin;
