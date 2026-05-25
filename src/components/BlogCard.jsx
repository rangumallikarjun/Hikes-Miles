function BlogCard({ post, go }) {
  return (
    <div className="blog-card" onClick={() => go("blog-post", post)}>
      <div className="blog-img-wrap"><img src={post.image} alt={post.title} /></div>
      <div className="blog-body">
        <div className="blog-cat">{post.category}</div>
        <div className="blog-title">{post.title}</div>
        <div className="blog-excerpt">{post.excerpt}</div>
        <div className="blog-meta"><span>{post.date}</span><span>·</span><span>{post.readTime} read</span><span>·</span><span>{post.author}</span></div>
      </div>
    </div>
  );
}

export default BlogCard;
