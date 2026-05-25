import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch } from "firebase/firestore";

import CSS from "./styles";
import initialData from "./constants/initialData";
import { INITIAL_USERS, ROLE_ACCESS } from "./constants/users";

import InvoiceModal from "./components/InvoiceModal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import PackagesPage from "./pages/PackagesPage";
import PkgDetailPage from "./pages/PkgDetailPage";
import DestinationsPage from "./pages/DestinationsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import CustomPackagePage from "./pages/CustomPackagePage";
import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";
import GuidesPage from "./pages/GuidesPage";
import SafetyPage from "./pages/SafetyPage";
import GroupBookingsPage from "./pages/GroupBookingsPage";
import CareersPage from "./pages/CareersPage";

import AdminLogin from "./admin/AdminLogin";
import Admin from "./admin/Admin";

function HikesAndMiles() {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState("home");
  const [selPkg, setSelPkg] = useState(null);
  const [selBlog, setSelBlog] = useState(null);
  const [adminTab, setAdminTab] = useState("dashboard");
  const [catFilter, setCatFilter] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookForm, setBookForm] = useState({ name: "", email: "", phone: "", package: "", travelers: 2, date: "", city: "", message: "" });
  const [bookDone, setBookDone] = useState(false);
  const [toast, setToast] = useState(null);
  const [testiPage, setTestiPage] = useState(0);
  const [invoiceBooking, setInvoiceBooking] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [adminUsers, setAdminUsers] = useState(INITIAL_USERS);
  const [loginForm, setLoginForm] = useState({ email: "", password: "", remember: false });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [resetStep, setResetStep] = useState(null);

  const [allReviews, setAllReviews] = useState({
    1: [
      { id: 101, name:"Suresh Patil", location:"Pune, Maharashtra", avatar:"SP", rating:5, title:"A divine experience beyond words", body:"Every dham was more breathtaking than the last. The pandit's assistance at Kedarnath moved me to tears. Hikes & Miles handled everything — transport, food, accommodation — flawlessly. Already planning to do this again.", date:"Feb 10, 2026", helpful:12, verified:true, approved:true },
      { id: 102, name:"Kavitha Iyer", location:"Chennai, Tamil Nadu", avatar:"KI", rating:5, title:"Kedarnath helicopter was unforgettable", body:"We opted for the helicopter to Kedarnath because of my mother's knee issue, and it was absolutely worth it. The arrangement was seamless. Would recommend Hikes & Miles to every pilgrim.", date:"Jan 28, 2026", helpful:8, verified:true, approved:true },
      { id: 103, name:"Rajan Mehta", location:"Ahmedabad, Gujarat", avatar:"RM", rating:4, title:"Great trip, minor delays at Gangotri", body:"Overall an incredible pilgrimage. The accommodation was comfortable and food was wholesome. Only minor issue was a 2-hour delay at Gangotri due to traffic. Team handled it gracefully.", date:"Dec 5, 2025", helpful:5, verified:false, approved:true },
    ],
    2: [
      { id: 201, name:"Aditya Joshi", location:"Nagpur, Maharashtra", avatar:"AJ", rating:5, title:"Saw a tiger in the first 30 minutes!", body:"I couldn't believe it — barely 30 minutes into our first core zone safari we spotted a male tiger hunting near a waterhole. The naturalist knew exactly where to position us. The jungle lodge was gorgeous too.", date:"Mar 1, 2026", helpful:19, verified:true, approved:true },
      { id: 202, name:"Prerna Singh", location:"Delhi, NCR", avatar:"PS", rating:4, title:"Mowgli trail walk was the highlight", body:"The walk along Kipling's described trails with a storytelling naturalist was something out of a film. Great bird sightings too — 35+ species in 4 days. Lost one star only because one morning safari was cancelled due to rain.", date:"Feb 14, 2026", helpful:6, verified:true, approved:true },
    ],
    3: [
      { id: 301, name:"Sneha Kulkarni", location:"Mumbai, Maharashtra", avatar:"SK", rating:5, title:"Tigress with 2 cubs — absolutely priceless", body:"Day 1 evening at Kolara gate — a tigress emerged from the tall grass with two tiny cubs. I literally gasped and started crying. Hikes & Miles team deserves a standing ovation.", date:"Feb 20, 2026", helpful:24, verified:true, approved:true },
      { id: 302, name:"Nilesh Patil", location:"Aurangabad, Maharashtra", avatar:"NP", rating:5, title:"Best wildlife experience in India", body:"We've done Ranthambore and Jim Corbett before. Tadoba beats them both for tiger sightings. 5 tigers in 4 safaris. The eco-lodge was beautiful and the food was excellent.", date:"Jan 15, 2026", helpful:11, verified:true, approved:true },
    ],
    4: [
      { id: 401, name:"Vikram Shinde", location:"Yavatmal, Maharashtra", avatar:"VS", rating:5, title:"Hidden gem — zero crowds, pure wild", body:"We were the only vehicle at the sighting spot. A large male tiger walked 10 meters from our gypsy. Tipeshwar is what tiger tourism should feel like — no rush, no noise, just nature.", date:"Feb 2, 2026", helpful:16, verified:true, approved:true },
    ],
    5: [
      { id: 501, name:"Arjun Mehra", location:"Delhi, NCR", avatar:"AM", rating:5, title:"Khardung La took my breath away (literally)", body:"At 5359m I was gasping but grinning. The Royal Enfield performed like a champ all the way. The support vehicle saved us once near Nubra when my bike had a puncture. Team is incredibly professional.", date:"Aug 18, 2025", helpful:22, verified:true, approved:true },
      { id: 502, name:"Rohit Khanna", location:"Chandigarh, Punjab", avatar:"RK", rating:4, title:"Dream trip — slight altitude sickness on day 1", body:"Expected the altitude effects but still hit me hard. The team was very supportive with medication and rest time. By day 2 I was fine and the rest of the trip was flawless. Pangong sunrise is something I'll never forget.", date:"Jul 30, 2025", helpful:9, verified:false, approved:true },
    ],
    6: [
      { id: 601, name:"Priya Nair", location:"Bengaluru, Karnataka", avatar:"PN", rating:5, title:"Backwaters at dusk changed my life", body:"Floating silently on the houseboat as the sun set over the coconut palms, sipping toddy and eating fresh fish curry — I genuinely teared up at the beauty. Kerala is magic and Hikes & Miles made every moment count.", date:"Jan 20, 2026", helpful:14, verified:true, approved:true },
    ],
    7: [
      { id: 701, name:"Amit Sharma", location:"Jaipur, Rajasthan", avatar:"AS", rating:4, title:"Rajasthan royal, heritage stays were top-notch", body:"Staying in a 400-year-old haveli in Jodhpur was surreal. The Thar desert camp under the stars was everything I hoped for. Guide Ramesh ji was incredibly knowledgeable. Minus one star for a bus delay between cities.", date:"Nov 10, 2025", helpful:7, verified:true, approved:true },
    ],
    8: [
      { id: 801, name:"Sandeep Rao", location:"Hyderabad, Telangana", avatar:"SR", rating:5, title:"Spiti is another world entirely", body:"I've travelled to 22 countries and Spiti Valley is the most otherworldly place I've ever seen. Key Monastery at dawn, Chandratal lake at midnight — I was speechless. The homestay family in Kaza was the warmest we've ever met.", date:"Sep 5, 2025", helpful:18, verified:true, approved:true },
    ],
  });

  const addReview = (pkgId, review) => {
    setAllReviews(prev => ({
      ...prev,
      [pkgId]: [...(prev[pkgId]||[]), { ...review, id: Date.now(), date: new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}), helpful:0, approved:false }]
    }));
    const newReviews = [...(allReviews[pkgId]||[]), review];
    const avgRating = +(newReviews.reduce((s,r)=>s+r.rating,0)/newReviews.length).toFixed(1);
    setData(d=>({ ...d, packages: d.packages.map(p=>p.id===pkgId ? {...p, rating:avgRating, reviews:newReviews.length} : p) }));
  };
  const markHelpful = (pkgId, reviewId) => {
    setAllReviews(prev => ({ ...prev, [pkgId]: (prev[pkgId]||[]).map(r=>r.id===reviewId ? {...r, helpful:r.helpful+1} : r) }));
  };
  const toggleApprove = (pkgId, reviewId) => {
    setAllReviews(prev => ({ ...prev, [pkgId]: (prev[pkgId]||[]).map(r=>r.id===reviewId ? {...r, approved:!r.approved} : r) }));
  };
  const deleteReview = (pkgId, reviewId) => {
    setAllReviews(prev => ({ ...prev, [pkgId]: (prev[pkgId]||[]).filter(r=>r.id!==reviewId) }));
  };

  const showToast = (m, t = "ok") => { setToast({ m, t }); setTimeout(() => setToast(null), 3000); };

  const seedFirebase = async () => {
    try {
      const batch = writeBatch(db);
      const collections = { destinations: initialData.destinations, packages: initialData.packages, blog: initialData.blog, offers: initialData.offers, bookings: initialData.bookings };
      for (const [col, items] of Object.entries(collections)) {
        for (const item of items) { batch.set(doc(db, col, String(item.id)), item); }
      }
      for (const user of INITIAL_USERS) { batch.set(doc(db, "users", String(user.id)), user); }
      batch.set(doc(db, "settings", "brand"), initialData.brand);
      batch.set(doc(db, "settings", "seo"), initialData.seo);
      await batch.commit();
    } catch (e) { console.error("Seed error:", e); }
  };

  useEffect(() => {
    const unsubs = [];
    const listenCol = (colName, setter) => {
      const unsub = onSnapshot(collection(db, colName), (snap) => {
        if (snap.empty) { seedFirebase(); return; }
        const items = snap.docs.map(d => ({ ...d.data(), id: d.data().id || d.id }));
        setter(items);
      });
      unsubs.push(unsub);
    };
    listenCol("destinations", (items) => setData(d => ({ ...d, destinations: items })));
    listenCol("packages", (items) => setData(d => ({ ...d, packages: items })));
    listenCol("blog", (items) => setData(d => ({ ...d, blog: items })));
    listenCol("offers", (items) => setData(d => ({ ...d, offers: items })));
    listenCol("bookings", (items) => setData(d => ({ ...d, bookings: items })));
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      if (!snap.empty) { setAdminUsers(snap.docs.map(d => ({ ...d.data(), id: d.data().id || Number(d.id) }))); }
    });
    unsubs.push(unsubUsers);
    const unsubSettings = onSnapshot(collection(db, "settings"), (snap) => {
      snap.docs.forEach(d => {
        if (d.id === "brand") setData(prev => ({ ...prev, brand: { ...initialData.brand, ...d.data() } }));
        if (d.id === "seo") setData(prev => ({ ...prev, seo: d.data() }));
      });
    });
    unsubs.push(unsubSettings);
    return () => unsubs.forEach(u => u());
  }, []);

  const fbSave = async (colName, item) => {
    try { await setDoc(doc(db, colName, String(item.id)), item); } catch (e) { console.error("Save error:", e); }
  };
  const fbDelete = async (colName, id) => {
    try { await deleteDoc(doc(db, colName, String(id))); } catch (e) { console.error("Delete error:", e); }
  };
  const fbSaveSetting = async (key, value) => {
    try { await setDoc(doc(db, "settings", key), value); } catch (e) { console.error("Settings save error:", e); }
  };

  const handleLogin = () => {
    setLoginError("");
    if (!loginForm.email || !loginForm.password) { setLoginError("Please enter your email and password."); return; }
    setLoginLoading(true);
    setTimeout(() => {
      const user = adminUsers.find(u => u.email.toLowerCase() === loginForm.email.toLowerCase() && u.password === loginForm.password);
      if (!user) { setLoginError("Invalid email or password. Please try again."); setLoginLoading(false); return; }
      if (!user.active) { setLoginError("Your account has been deactivated. Contact Super Admin."); setLoginLoading(false); return; }
      const now = new Date().toLocaleString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true});
      const updatedUser = {...user, lastLogin:`Today, ${now}`};
      setAdminUsers(prev => prev.map(u => u.id===user.id ? updatedUser : u));
      fbSave("users", updatedUser);
      setAuthUser(updatedUser);
      setLoginForm({ email:"", password:"", remember:false });
      setLoginLoading(false);
      setAdminTab("dashboard");
      showToast(`Welcome back, ${user.name.split(" ")[0]}!`);
    }, 800);
  };

  const handleLogout = () => { setAuthUser(null); setPage("home"); showToast("Logged out successfully."); };
  const canAccess = (tabId) => authUser ? (ROLE_ACCESS[authUser.role] || []).includes(tabId) : false;

  const go = (p, d = null) => {
    if (p === "pkg-detail") setSelPkg(d);
    if (p === "blog-post") setSelBlog(d);
    if (p === "booking" && d) setBookForm(f => ({ ...f, package: d.name || d }));
    setPage(p); setMobileMenu(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 30);
  };

  return (
    <div className="hm">
      <style>{CSS}</style>
      {toast && <div className={`toast${toast.t==="err"?" err":""}`}>{toast.m}</div>}

      {page !== "admin" && (
        <div className="wa-float" title="Chat on WhatsApp"
          onClick={()=>window.open("https://wa.me/919666962337?text="+encodeURIComponent("Namaste! I'd like to enquire about a tour package from Hikes & Miles."),"_blank")}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </div>
      )}

      {invoiceBooking && (
        <InvoiceModal booking={invoiceBooking} pkg={data.packages.find(p=>p.name===invoiceBooking.package)} onClose={()=>setInvoiceBooking(null)} />
      )}

      {page !== "admin" && <Navbar go={go} page={page} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />}

      {page === "home"           && <HomePage data={data} go={go} setCatFilter={setCatFilter} testiPage={testiPage} setTestiPage={setTestiPage} />}
      {page === "destinations"   && <DestinationsPage data={data} go={go} />}
      {page === "packages"       && <PackagesPage data={data} catFilter={catFilter} setCatFilter={setCatFilter} go={go} />}
      {page === "pkg-detail"     && <PkgDetailPage selPkg={selPkg} allReviews={allReviews} addReview={addReview} markHelpful={markHelpful} go={go} showToast={showToast} data={data} />}
      {page === "custom-package" && <CustomPackagePage go={go} showToast={showToast} />}
      {page === "blog"           && <BlogPage data={data} go={go} />}
      {page === "blog-post"      && <BlogPostPage selBlog={selBlog} go={go} />}
      {page === "booking"        && <BookingPage data={data} setData={setData} bookForm={bookForm} setBookForm={setBookForm} bookDone={bookDone} setBookDone={setBookDone} setInvoiceBooking={setInvoiceBooking} fbSave={fbSave} showToast={showToast} go={go} />}
      {page === "about"          && <AboutPage data={data} go={go} />}
      {page === "guides"         && <GuidesPage go={go} />}
      {page === "safety"         && <SafetyPage go={go} />}
      {page === "group-bookings" && <GroupBookingsPage go={go} showToast={showToast} />}
      {page === "careers"        && <CareersPage showToast={showToast} />}
      {page === "admin"          && (
        authUser
          ? <Admin data={data} setData={setData} adminTab={adminTab} setAdminTab={setAdminTab} allReviews={allReviews} toggleApprove={toggleApprove} deleteReview={deleteReview} authUser={authUser} adminUsers={adminUsers} setAdminUsers={setAdminUsers} canAccess={canAccess} handleLogout={handleLogout} setInvoiceBooking={setInvoiceBooking} showToast={showToast} fbSave={fbSave} fbDelete={fbDelete} fbSaveSetting={fbSaveSetting} go={go} />
          : <AdminLogin loginForm={loginForm} setLoginForm={setLoginForm} loginError={loginError} setLoginError={setLoginError} loginLoading={loginLoading} showPassword={showPassword} setShowPassword={setShowPassword} resetStep={resetStep} setResetStep={setResetStep} handleLogin={handleLogin} />
      )}
      {page !== "admin" && <Footer go={go} data={data} />}
    </div>
  );
}

export default HikesAndMiles;