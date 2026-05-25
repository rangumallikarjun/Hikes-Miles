import I from "../components/Icon";
import LOGO_IMG from "../constants/logo";
import { INITIAL_USERS } from "../constants/users";
import { ACC, DARK, SAFFRON } from "../constants/colors";

function AdminLogin({ loginForm, setLoginForm, loginError, setLoginError, loginLoading, showPassword, setShowPassword, resetStep, setResetStep, handleLogin }) {
  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div className="auth-left-bg" style={{ backgroundImage:"url('https://wsrv.nl/?url=images.unsplash.com/photo-1506905925346-21bda4d32df4&w=800&q=80&fit=cover')" }} />
        <div className="auth-left-pattern" />
        <div className="auth-left-content">
          <div className="auth-brand">
            
            <img src={LOGO_IMG} alt="Hikes &amp; Miles Tourism" style={{ height:110, width:"auto", objectFit:"contain", filter:"none" }} />
          </div>
          <h2 className="auth-tagline">Manage Your <em>India Travel</em> Business</h2>
          <p className="auth-sub">The complete admin dashboard for Hikes & Miles Tourism. Manage packages, bookings, content and your team — all in one place.</p>
          <div className="auth-features">
            {[
              ["package","Manage packages, itineraries & pricing"],
              ["calendar","Track & update booking requests"],
              ["book","Publish blog posts & travel guides"],
              ["users","Role-based team access control"],
              ["seo","SEO & branding customization"],
            ].map(([ic,lbl]) => (
              <div key={lbl} className="auth-feat">
                <div className="auth-feat-dot"><I n={ic} s={15} c={SAFFRON} /></div>
                <span>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-box">
          {resetStep === null ? (
            <>
              <div style={{ marginBottom:"2rem",textAlign:"center" }}>
                <div style={{ width:56,height:56,background:`${ACC}15`,border:`2px solid ${ACC}33`,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem" }}>
                  <I n="dashboard" s={26} c={ACC} />
                </div>
                <div className="auth-title">Admin Sign In</div>
                <div className="auth-desc">Sign in to access the Hikes & Miles admin panel.</div>
              </div>

              {loginError && (
                <div className="auth-error">
                  <I n="close" s={16} c="#c62828" />
                  <span>{loginError}</span>
                </div>
              )}

              <div className="auth-fg">
                <label className="auth-lbl"><span>Email Address</span></label>
                <div className="auth-inp-wrap">
                  <span className="auth-inp-icon"><I n="send" s={16} c="#bbb" /></span>
                  <input className="auth-inp has-icon" type="email" placeholder="you@hikesandmiles.in" value={loginForm.email} onChange={e => { setLoginForm(f=>({...f,email:e.target.value})); setLoginError(""); }} onKeyDown={e=>e.key==="Enter"&&handleLogin()} />
                </div>
              </div>

              <div className="auth-fg">
                <label className="auth-lbl">
                  <span>Password</span>
                  <span className="auth-link" onClick={() => setResetStep("email")}>Forgot password?</span>
                </label>
                <div className="auth-inp-wrap">
                  <span className="auth-inp-icon"><I n="settings" s={16} c="#bbb" /></span>
                  <input className="auth-inp has-icon" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={loginForm.password} onChange={e => { setLoginForm(f=>({...f,password:e.target.value})); setLoginError(""); }} onKeyDown={e=>e.key==="Enter"&&handleLogin()} style={{ paddingRight:44 }} />
                  <button className="auth-inp-toggle" onClick={() => setShowPassword(p=>!p)}>
                    <I n="eye" s={17} c="#aaa" />
                    <span style={{ fontSize:"0.65rem",marginLeft:2 }}>{showPassword?"Hide":"Show"}</span>
                  </button>
                </div>
              </div>

              <label className="auth-remember">
                <input type="checkbox" checked={loginForm.remember} onChange={e=>setLoginForm(f=>({...f,remember:e.target.checked}))} />
                Keep me signed in for 7 days
              </label>

              <button className="auth-btn" onClick={handleLogin} disabled={loginLoading}>
                {loginLoading ? <><div className="auth-spinner"/><span>Signing in...</span></> : <><I n="arrow" s={18} c="#fff"/>Sign In to Dashboard</>}
              </button>

              

              <div style={{ display:"flex",flexDirection:"column",gap:"0.5rem" }}>
                {INITIAL_USERS.filter(u=>u.active).slice(0,3).map(u=>(
                  <div key={u.id} className="auth-user-chip" style={{ cursor:"pointer" }} onClick={()=>{ setLoginForm({email:u.email,password:u.password,remember:false}); setLoginError(""); }}>
                    <div style={{ width:32,height:32,borderRadius:8,background:ACC,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.72rem",fontWeight:700,flexShrink:0 }}>{u.avatar}</div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ fontSize:"0.82rem",fontWeight:600,color:DARK }}>{u.name}</div>
                      <div style={{ fontSize:"0.72rem",color:"#aaa",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{u.role} · {u.email}</div>
                    </div>
                    <I n="chevronR" s={14} c="#ccc" />
                  </div>
                ))}
              </div>

              <p style={{ textAlign:"center",marginTop:"1.5rem",fontSize:"0.75rem",color:"#bbb" }}>
                🔒 Secured by Hikes & Miles Auth System
              </p>
            </>
          ) : resetStep === "email" ? (
            <>
              <div style={{ marginBottom:"2rem" }}>
                <button style={{ background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:"#888",fontSize:"0.82rem",marginBottom:"1.5rem" }} onClick={()=>setResetStep(null)}>
                  <I n="chevronL" s={16} c="#888" /> Back to login
                </button>
                <div className="auth-title" style={{ fontSize:"1.6rem" }}>Reset Password</div>
                <div className="auth-desc">Enter your registered email and we'll send a reset link.</div>
              </div>
              <div className="auth-fg">
                <label className="auth-lbl"><span>Registered Email</span></label>
                <div className="auth-inp-wrap">
                  <span className="auth-inp-icon"><I n="send" s={16} c="#bbb" /></span>
                  <input className="auth-inp has-icon" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <button className="auth-btn" onClick={()=>setResetStep("sent")}>
                <I n="send" s={17} c="#fff" /> Send Reset Link
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign:"center",padding:"2rem 0" }}>
                <div style={{ width:70,height:70,background:"#e8f5e9",borderRadius:50,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem" }}>
                  <I n="check" s={32} c="#2e7d32" />
                </div>
                <div className="auth-title" style={{ fontSize:"1.5rem" }}>Email Sent!</div>
                <p style={{ color:"#888",fontSize:"0.88rem",lineHeight:1.7,margin:"0.75rem 0 2rem" }}>A password reset link has been sent to your email. Check your inbox and follow the instructions.</p>
                <button className="auth-btn" onClick={()=>setResetStep(null)}>Back to Sign In</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
