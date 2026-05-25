import BlogCard from "../components/BlogCard";
import { DARK, FOREST, SAFFRON, CREAM } from "../constants/colors";

function BlogPage({ data, go }) {
  return (
    <div style={{ paddingTop:68 }}>
      <div style={{ background:`linear-gradient(135deg,${DARK},${FOREST})`,padding:"4rem 2rem",textAlign:"center" }}>
        <div className="sec-eyebrow" style={{ color:SAFFRON }}>📖 Stories & Guides</div>
        <h1 className="sec-title" style={{ color:"#fff" }}>India Travel Blog</h1>
      </div>
      <section className="sec" style={{ background:CREAM }}>
        <div className="sec-inner">
          <div className="blog-grid">
            {data.blog.map(p => <BlogCard key={p.id} post={p} go={go} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
