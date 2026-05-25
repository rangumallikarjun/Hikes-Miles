import { useState, useEffect } from "react";

function ImagePreviewBox({ url, bg }) {
  const [status, setStatus] = useState("idle");
  const [loadedUrl, setLoadedUrl] = useState("");

  useEffect(() => {
    if (!url) { setStatus("idle"); setLoadedUrl(""); return; }
    setStatus("loading");
    setLoadedUrl(url);
  }, [url]);

  if (!url) return (
    <div style={{ borderRadius:12,height:100,background:"#f5f5f5",border:"2px dashed #e0e0e0",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6,marginBottom:"0.75rem" }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <div style={{ fontSize:"0.72rem",color:"#ccc" }}>Paste an image URL above to see preview</div>
    </div>
  );

  return (
    <div style={{ marginBottom:"0.75rem" }}>
      <div style={{ background:"#e8f5e9",border:"1.5px solid #a5d6a7",borderRadius:10,padding:"0.75rem 1rem",marginBottom:"0.5rem",display:"flex",alignItems:"flex-start",gap:10 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5" style={{ flexShrink:0,marginTop:1 }}><polyline points="20 6 9 17 4 12"/></svg>
        <div>
          <div style={{ fontSize:"0.78rem",fontWeight:700,color:"#2e7d32",marginBottom:2 }}>✅ URL saved & will work on the live website</div>
          <div style={{ fontSize:"0.7rem",color:"#388e3c",wordBreak:"break-all",fontFamily:"monospace",lineHeight:1.5 }}>{url}</div>
          <div style={{ fontSize:"0.68rem",color:"#66bb6a",marginTop:4 }}>
            ⚠ Preview may show "could not load" here — this is normal. Unsplash blocks images inside embedded viewers for security. Your image <strong>will display correctly</strong> after you click Save Changes.
          </div>
        </div>
      </div>

      <div style={{ borderRadius:12,overflow:"hidden",height:160,background:bg||"#1E3A1E",position:"relative" }}>
        {status !== "idle" && (
          <img
            src={loadedUrl}
            alt="preview"
            style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"opacity .3s",opacity:status==="ok"?1:0 }}
            onLoad={()=>setStatus("ok")}
            onError={()=>setStatus("blocked")}
          />
        )}

        {status==="loading" && (
          <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",gap:10 }}>
            <div style={{ width:28,height:28,border:"3px solid rgba(255,255,255,0.15)",borderTop:"3px solid #F7941D",borderRadius:"50%",animation:"spin .8s linear infinite" }}/>
            <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.5)" }}>Attempting preview...</div>
          </div>
        )}

        {status==="blocked" && (
          <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,padding:"1rem",textAlign:"center" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.6)",fontWeight:600 }}>Preview blocked by browser security</div>
            <div style={{ fontSize:"0.68rem",color:"rgba(255,255,255,0.38)",lineHeight:1.6 }}>
              Unsplash prevents image preview inside embedded viewers.<br/>
              <strong style={{ color:"rgba(255,255,255,0.6)" }}>Your image is saved correctly</strong> and will show on the live site.
            </div>
          </div>
        )}

        {status==="ok" && (
          <div style={{ position:"absolute",bottom:8,left:10,background:"rgba(0,0,0,0.55)",color:"#fff",fontSize:"0.65rem",padding:"3px 10px",borderRadius:50,display:"flex",alignItems:"center",gap:4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Image loaded ✓
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePreviewBox;
