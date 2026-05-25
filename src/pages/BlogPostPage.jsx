import I from "../components/Icon";
import { ACC, DARK, CREAM } from "../constants/colors";

function BlogPostPage({ selBlog, go }) {
  const post = selBlog;
  if (!post) return null;
  return (
    <div style={{ paddingTop:68,background:CREAM,minHeight:"100vh" }}>
      <div style={{ maxWidth:760,margin:"0 auto",padding:"3rem 2rem" }}>
        <div className="back-btn" onClick={() => go("blog")}><I n="chevronL" s={16} c={ACC} /> Back to Blog</div>
        <div style={{ background:"#fff",borderRadius:22,overflow:"hidden",boxShadow:"0 8px 50px rgba(0,0,0,0.09)" }}>
          <img src={post.image} alt={post.title} style={{ width:"100%",height:320,objectFit:"cover" }} />
          <div style={{ padding:"2.5rem" }}>
            <div className="blog-cat">{post.category}</div>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.8rem,3vw,2.3rem)",fontWeight:700,color:DARK,lineHeight:1.25,margin:"0.75rem 0 0.75rem" }}>{post.title}</h1>
            <div className="blog-meta" style={{ marginBottom:"2rem",paddingBottom:"1.5rem",borderBottom:"1px solid #f0f0f0" }}>
              <span>By {post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
            </div>
            <p style={{ fontSize:"1.05rem",color:"#555",lineHeight:1.85,marginBottom:"1.5rem" }}>{post.excerpt}</p>
            <p style={{ fontSize:"0.97rem",color:"#666",lineHeight:1.85,marginBottom:"1.5rem" }}>Whether you're a seasoned traveller or planning your first pilgrimage, the best way to experience India is with someone who knows its every layer. At Hikes & Miles, we don't just plan trips — we craft memories woven from the fabric of this extraordinary land.</p>
            <p style={{ fontSize:"0.97rem",color:"#666",lineHeight:1.85 }}>Every trail has a story. Every temple has a whisper. Pack your bags, say a prayer, and let India do the rest.</p>
            <div style={{ marginTop:"2rem",paddingTop:"1.5rem",borderTop:"1px solid #f0f0f0",textAlign:"center" }}>
              <button className="btn btn-primary" onClick={() => go("packages")}>Explore Packages <I n="arrow" s={15} c="#fff" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostPage;
