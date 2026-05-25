import { ACC, DARK, FOREST, SAFFRON, CREAM } from "./constants/colors";
  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'Outfit',sans-serif;color:#1C1C1C;background:#FDF6EC}
    .hm{min-height:100vh}

    /* NAV */
    .nav{position:fixed;top:0;left:0;right:0;z-index:200;height:68px;display:flex;align-items:center;justify-content:space-between;padding:0 2.5rem;background:rgba(10,20,10,0.97);backdrop-filter:blur(20px);border-bottom:2px solid rgba(212,80,10,0.3);box-shadow:0 4px 28px rgba(0,0,0,0.35)}
    .nav-logo{display:flex;align-items:center;gap:10px;cursor:pointer}
    .nav-logo-icon{width:38px;height:38px;background:${ACC};border-radius:10px;display:flex;align-items:center;justify-content:center}
    .nav-logo-text{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:#fff;letter-spacing:0.3px}
    .nav-logo-text span{color:${ACC}}
    .nav-links{display:flex;align-items:center;gap:2.2rem}
    .nav-link{font-size:0.88rem;font-weight:500;color:rgba(255,255,255,0.72);cursor:pointer;transition:color .2s;letter-spacing:0.2px;position:relative}
    .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:${ACC};transform:scaleX(0);transition:transform .2s}
    .nav-link:hover,.nav-link.act{color:#fff}
    .nav-link.act::after,.nav-link:hover::after{transform:scaleX(1)}
    .nav-cta{background:${ACC};color:#fff;padding:9px 22px;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer;border:none;transition:all .2s;letter-spacing:0.2px}
    .nav-cta:hover{background:#bf4a08;transform:translateY(-1px)}
    .nav-admin{background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.75);padding:8px 16px;border-radius:8px;font-size:0.8rem;cursor:pointer;border:1.5px solid rgba(255,255,255,0.2);margin-left:6px;transition:all .2s}
    .nav-admin:hover{background:rgba(255,255,255,0.18);color:#fff;border-color:rgba(255,255,255,0.4)}
    .mob-toggle{display:none;background:transparent;border:none;cursor:pointer;padding:4px}

    /* HERO */
    .hero{min-height:100vh;position:relative;display:flex;flex-direction:column;overflow:hidden}
    .hero-bg{position:absolute;inset:0;background-size:52% auto;background-position:right 3% center;background-repeat:no-repeat;background-color:#fff}
    .hero-grad{position:absolute;inset:0;background:linear-gradient(to right,rgba(15,31,14,0.93) 0%,rgba(15,31,14,0.88) 38%,rgba(15,31,14,0.35) 68%,rgba(255,255,255,0.05) 100%)}
    .hero-pattern{position:absolute;inset:0;background-image:radial-gradient(circle at 20% 80%, rgba(247,148,29,0.08) 0%, transparent 50%),radial-gradient(circle at 80% 20%, rgba(212,80,10,0.06) 0%, transparent 50%);pointer-events:none}
    .hero-body{position:relative;z-index:2;flex:1;display:flex;align-items:center;padding:120px 5rem 3rem}
    .hero-pill{display:inline-flex;align-items:center;gap:8px;background:rgba(247,148,29,0.15);border:1px solid rgba(247,148,29,0.3);color:${SAFFRON};padding:6px 16px;border-radius:50px;font-size:0.75rem;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:1.5rem;animation:fadeUp .7s ease both}
    .hero-h1{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,5.5vw,4.8rem);font-weight:700;color:#fff;line-height:1.08;margin-bottom:1.5rem;animation:fadeUp .7s .1s ease both}
    .hero-h1 em{font-style:italic;color:${SAFFRON}}
    .hero-sub{font-size:1.05rem;color:rgba(255,255,255,0.72);line-height:1.75;max-width:540px;margin-bottom:2.5rem;font-weight:300;animation:fadeUp .7s .2s ease both}
    .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;animation:fadeUp .7s .3s ease both}
    .btn{display:inline-flex;align-items:center;gap:8px;padding:13px 28px;border-radius:8px;font-family:'Outfit',sans-serif;font-weight:600;font-size:0.88rem;cursor:pointer;transition:all .25s;border:none;letter-spacing:0.3px}
    .btn-primary{background:${ACC};color:#fff}
    .btn-primary:hover{background:#bf4a08;transform:translateY(-2px);box-shadow:0 8px 28px rgba(212,80,10,0.4)}
    .btn-ghost{background:rgba(255,255,255,0.1);color:#fff;border:1.5px solid rgba(255,255,255,0.3);backdrop-filter:blur(4px)}
    .btn-ghost:hover{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.6)}
    .btn-dark{background:${DARK};color:#fff}
    .btn-dark:hover{background:#2a3a2a;transform:translateY(-2px)}
    .btn-sm{padding:9px 20px;font-size:0.8rem}
    .btn-outline-dark{background:transparent;color:${DARK};border:2px solid ${DARK}}
    .btn-outline-dark:hover{background:${DARK};color:#fff}

    /* HERO STATS STRIP */
    .hero-strip{position:relative;z-index:2;background:rgba(15,31,14,0.92);backdrop-filter:blur(12px);border-top:1px solid rgba(247,148,29,0.15);padding:1.6rem 5rem;display:flex;gap:0;align-items:center}
    .hero-stat{flex:1;text-align:center;padding:0 1.5rem;border-right:1px solid rgba(247,148,29,0.15)}
    .hero-stat:last-child{border-right:none}
    .stat-n{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:#fff;line-height:1}
    .stat-n span{color:${SAFFRON}}
    .stat-l{font-size:0.72rem;color:rgba(255,255,255,0.5);letter-spacing:1px;text-transform:uppercase;margin-top:4px}

    /* SECTIONS */
    .sec{padding:5rem 2rem}
    .sec-inner{max-width:1220px;margin:0 auto}
    .sec-head{text-align:center;margin-bottom:3.5rem}
    .sec-eyebrow{display:inline-block;font-size:0.72rem;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${ACC};margin-bottom:0.75rem}
    .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,3.5vw,2.9rem);font-weight:700;color:${DARK};line-height:1.15;margin-bottom:0.85rem}
    .sec-sub{font-size:0.95rem;color:#666;line-height:1.75;max-width:540px;margin:0 auto}

    /* CATEGORIES STRIP */
    .cat-strip{display:flex;gap:0.75rem;overflow-x:auto;padding-bottom:4px;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem}
    .cat-btn{padding:8px 20px;border-radius:50px;font-size:0.82rem;font-weight:600;cursor:pointer;border:2px solid #ddd;background:#fff;color:#555;transition:all .2s;white-space:nowrap}
    .cat-btn:hover{border-color:${ACC};color:${ACC}}
    .cat-btn.on{background:${ACC};border-color:${ACC};color:#fff}

    /* DESTINATION CARDS */
    .dest-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.4rem}
    .dest-card{border-radius:18px;overflow:hidden;cursor:pointer;position:relative;aspect-ratio:3/2;box-shadow:0 4px 20px rgba(0,0,0,0.12);transition:transform .3s,box-shadow .3s}
    .dest-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.18)}
    .dest-card img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
    .dest-card:hover img{transform:scale(1.07)}
    .dest-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.78) 0%,transparent 55%)}
    .dest-info{position:absolute;bottom:0;left:0;right:0;padding:1.25rem}
    .dest-tag{display:inline-block;padding:3px 10px;border-radius:50px;font-size:0.67rem;font-weight:700;letter-spacing:0.5px;color:#fff;margin-bottom:5px}
    .dest-name{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;color:#fff;line-height:1.2}
    .dest-state{font-size:0.76rem;color:rgba(255,255,255,0.7);margin-top:3px}
    .dest-rating{display:flex;align-items:center;gap:5px;margin-top:6px;font-size:0.73rem;color:rgba(255,255,255,0.8)}

    /* PACKAGE CARDS */
    .pkg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.75rem}
    .pkg-card{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 3px 20px rgba(0,0,0,0.07);cursor:pointer;transition:all .3s;display:flex;flex-direction:column}
    .pkg-card:hover{transform:translateY(-6px);box-shadow:0 18px 50px rgba(0,0,0,0.13)}
    .pkg-img-wrap{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;background:${FOREST};flex-shrink:0}
    .pkg-img-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .4s;display:block}
    .pkg-card:hover .pkg-img-wrap img{transform:scale(1.06)}
    .pkg-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.25) 0%,transparent 50%);pointer-events:none;z-index:1}
    .pkg-badge{position:absolute;top:12px;left:12px;padding:4px 12px;border-radius:50px;font-size:0.68rem;font-weight:700;color:#fff;letter-spacing:0.4px;z-index:2;box-shadow:0 2px 8px rgba(0,0,0,0.25)}
    .pkg-cat-dot{position:absolute;top:12px;right:12px;padding:4px 12px;border-radius:50px;font-size:0.68rem;font-weight:700;color:#fff;backdrop-filter:blur(8px);background:rgba(0,0,0,0.45);z-index:2}
    .pkg-body{padding:1.25rem;flex:1;display:flex;flex-direction:column}
    .pkg-name{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;color:${DARK};margin-bottom:0.3rem;line-height:1.3}
    .pkg-dest{font-size:0.75rem;color:#888;margin-bottom:0.8rem;display:flex;align-items:center;gap:4px;flex-wrap:wrap}
    .pkg-metas{display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem}
    .pkg-meta{display:flex;align-items:center;gap:5px;font-size:0.76rem;color:#666}
    .pkg-foot{display:flex;align-items:flex-end;justify-content:space-between;padding-top:0.85rem;border-top:1px solid #f2f2f2;margin-top:auto}
    .pkg-price{font-family:'Cormorant Garamond',serif;font-size:1.5rem;font-weight:700;color:${DARK};line-height:1}
    .pkg-price small{font-family:'Outfit',sans-serif;font-size:0.65rem;color:#aaa;font-weight:400;display:block;margin-top:2px}
    .pkg-strike{font-size:0.78rem;color:#bbb;text-decoration:line-through;margin-bottom:2px}
    .pkg-rating{display:flex;align-items:center;gap:5px;font-size:0.76rem;color:#777;flex-direction:column;align-items:flex-end}

    /* TESTIMONIALS */
    .testi-wrap{background:linear-gradient(160deg,${DARK} 0%,${FOREST} 100%);padding:5rem 2rem;overflow:hidden}
    .testi-slider{display:flex;gap:1.5rem;transition:transform .4s ease;cursor:grab}
    .testi-card{background:rgba(255,255,255,0.06);border:1px solid rgba(247,148,29,0.15);border-radius:20px;padding:2rem;min-width:320px;max-width:320px;flex-shrink:0;transition:transform .3s}
    .testi-card:hover{transform:translateY(-4px)}
    .testi-quote{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-style:italic;color:rgba(255,255,255,0.85);line-height:1.8;margin-bottom:1.5rem}
    .testi-author{display:flex;align-items:center;gap:12px}
    .testi-av{width:42px;height:42px;border-radius:12px;background:${ACC};display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:0.82rem;flex-shrink:0}
    .testi-nm{font-weight:600;color:#fff;font-size:0.88rem}
    .testi-loc{font-size:0.73rem;color:rgba(255,255,255,0.5)}
    .testi-pkg{font-size:0.7rem;color:${SAFFRON};font-weight:600;margin-top:2px}
    .testi-nav{display:flex;gap:0.75rem;justify-content:center;margin-top:2rem}
    .testi-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,0.25);cursor:pointer;transition:all .2s}
    .testi-dot.on{background:${SAFFRON};width:24px;border-radius:4px}

    /* OFFERS */
    .offers-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:1.25rem}
    .offer-card{border-radius:18px;padding:1.75rem;position:relative;overflow:hidden;cursor:pointer;transition:transform .3s}
    .offer-card::before{content:'';position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,0.07)}
    .offer-card:hover{transform:translateY(-4px)}
    .offer-disc{font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:700;color:#fff;line-height:1;margin-bottom:4px}
    .offer-title{font-size:0.95rem;font-weight:600;color:#fff;margin-bottom:6px}
    .offer-desc{font-size:0.8rem;color:rgba(255,255,255,0.78);line-height:1.6;margin-bottom:1rem}
    .offer-code-wrap{display:flex;align-items:center;gap:8px}
    .offer-code{background:rgba(255,255,255,0.18);border:1px dashed rgba(255,255,255,0.4);color:#fff;padding:4px 14px;border-radius:6px;font-size:0.75rem;font-weight:700;letter-spacing:1px}
    .offer-exp{font-size:0.68rem;color:rgba(255,255,255,0.55);margin-top:8px}

    /* BLOG */
    .blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:1.75rem}
    .blog-card{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 3px 18px rgba(0,0,0,0.06);cursor:pointer;transition:all .3s}
    .blog-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,0.11)}
    .blog-img-wrap{overflow:hidden;height:195px}
    .blog-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
    .blog-card:hover .blog-img-wrap img{transform:scale(1.06)}
    .blog-body{padding:1.4rem}
    .blog-cat{font-size:0.7rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${ACC};margin-bottom:0.5rem}
    .blog-title{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:700;color:${DARK};line-height:1.4;margin-bottom:0.6rem}
    .blog-excerpt{font-size:0.82rem;color:#777;line-height:1.65;margin-bottom:0.85rem}
    .blog-meta{font-size:0.73rem;color:#aaa;display:flex;gap:0.75rem}

    /* CTA */
    .cta-sec{background:linear-gradient(135deg,${ACC} 0%,#a33908 100%);padding:5rem 2rem;text-align:center;position:relative;overflow:hidden}
    .cta-sec::before{content:'';position:absolute;top:-80px;left:-80px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,0.05)}
    .cta-sec::after{content:'';position:absolute;bottom:-60px;right:-60px;width:220px;height:220px;border-radius:50%;background:rgba(0,0,0,0.07)}
    .cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#fff;margin-bottom:1rem;position:relative;z-index:1}
    .cta-sub{font-size:1rem;color:rgba(255,255,255,0.85);margin-bottom:2rem;position:relative;z-index:1;max-width:500px;margin-left:auto;margin-right:auto}
    .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}

    /* FOOTER */
    .footer{background:${DARK};padding:4rem 2rem 2rem;color:rgba(255,255,255,0.65)}
    .footer-inner{max-width:1220px;margin:0 auto}
    .footer-top{display:grid;grid-template-columns:2.2fr 1fr 1fr 1.4fr;gap:3rem;margin-bottom:3rem}
    .footer-logo{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;color:#fff;margin-bottom:0.75rem}
    .footer-logo span{color:${SAFFRON}}
    .footer-desc{font-size:0.83rem;line-height:1.75;margin-bottom:1.5rem;color:rgba(255,255,255,0.6)}
    .footer-socials{display:flex;gap:10px}
    .soc-btn{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s}
    .soc-btn:hover{background:${ACC}}
    .footer-col-h{font-size:0.78rem;font-weight:700;color:#fff;letter-spacing:1px;text-transform:uppercase;margin-bottom:1.1rem}
    .footer-link{display:block;font-size:0.82rem;color:rgba(255,255,255,0.55);margin-bottom:0.55rem;cursor:pointer;transition:color .2s;background:none;border:none;padding:0;font-family:'Outfit',sans-serif;text-align:left;width:100%;line-height:1.5}
    .footer-link:hover{color:${SAFFRON}}
    .footer-contact-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:0.85rem;font-size:0.82rem;line-height:1.5}
    .footer-bottom{border-top:1px solid rgba(255,255,255,0.08);padding-top:1.5rem;display:flex;align-items:center;justify-content:space-between;font-size:0.75rem;flex-wrap:wrap;gap:0.75rem}
    .footer-bottom .footer-link{white-space:nowrap}

    /* BOOKING */
    .booking-page{max-width:820px;margin:0 auto;padding:7rem 1.5rem 5rem;width:100%}
    .booking-form{background:#fff;border-radius:22px;box-shadow:0 8px 50px rgba(0,0,0,0.1);padding:2.5rem;width:100%;overflow:hidden}
    .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}
    .form-full{grid-column:1/-1}
    .form-grp{display:flex;flex-direction:column;gap:5px}
    .form-lbl{font-size:0.78rem;font-weight:600;color:#666;letter-spacing:0.3px}
    .form-inp{width:100%;padding:11px 15px;border:2px solid #eaeaea;border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.88rem;outline:none;transition:border .2s;background:#fafafa;color:#222;box-sizing:border-box}
    .form-inp:focus{border-color:${ACC};background:#fff}
    .form-sel{width:100%;padding:11px 15px;border:2px solid #eaeaea;border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.88rem;outline:none;background:#fafafa;color:#222;box-sizing:border-box}
    .form-ta{width:100%;padding:11px 15px;border:2px solid #eaeaea;border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.88rem;outline:none;resize:vertical;min-height:90px;background:#fafafa;color:#222;box-sizing:border-box}
    .form-ta:focus{border-color:${ACC}}
    .est-box{background:${CREAM};border:2px solid rgba(212,80,10,0.15);border-radius:12px;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem}

    /* PKG DETAIL */
    .detail-page{max-width:1060px;margin:0 auto;padding:7rem 2rem 5rem}
    .detail-hero{border-radius:22px;overflow:hidden;height:430px;position:relative;margin-bottom:2.5rem}
    .detail-hero img{width:100%;height:100%;object-fit:cover}
    .detail-hero-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 55%)}
    .detail-hero-info{position:absolute;bottom:2rem;left:2.5rem;right:2.5rem}
    .detail-grid{display:grid;grid-template-columns:1fr 340px;gap:2rem;align-items:start}
    .detail-sec{background:#fff;border-radius:18px;padding:2rem;box-shadow:0 3px 18px rgba(0,0,0,0.06);margin-bottom:1.5rem}
    .detail-sec h3{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;color:${DARK};margin-bottom:1.2rem}
    .iti-item{display:flex;gap:1rem;padding-bottom:1.2rem;margin-bottom:1.2rem;border-bottom:1px solid #f4f4f4}
    .iti-day{width:44px;height:44px;border-radius:12px;background:${ACC};color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;font-size:0.85rem}
    .iti-day small{font-size:0.55rem;font-weight:400}
    .hi-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:0.75rem;font-size:0.88rem;color:#444;line-height:1.55}
    .inc-item{display:flex;align-items:center;gap:10px;padding:9px 12px;background:#f9f9f9;border-radius:10px;margin-bottom:0.65rem;font-size:0.86rem;color:#444}
    .sidebar-box{background:${DARK};border-radius:18px;padding:2rem;position:sticky;top:84px}
    .sb-from{font-size:0.75rem;color:rgba(255,255,255,0.5);margin-bottom:4px}
    .sb-price{font-family:'Cormorant Garamond',serif;font-size:2.6rem;font-weight:700;color:#fff;line-height:1}
    .sb-price small{font-family:'Outfit',sans-serif;font-size:0.72rem;color:rgba(255,255,255,0.5);font-weight:400}
    .sb-orig{font-size:0.85rem;color:rgba(255,255,255,0.35);text-decoration:line-through;margin:4px 0 1.25rem}
    .sb-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:0.82rem}
    .sb-row span:first-child{color:rgba(255,255,255,0.45)}
    .sb-row span:last-child{color:#fff;font-weight:500}

    /* ADMIN */
    .admin-wrap{display:flex;min-height:100vh}
    .admin-sb{width:252px;background:${DARK};position:fixed;top:0;bottom:0;overflow-y:auto;flex-shrink:0}
    .admin-sb-logo{padding:1.4rem 1.4rem 0;font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:#fff}
    .admin-sb-logo span{color:${SAFFRON}}
    .admin-sb-sub{padding:2px 1.4rem 1.2rem;font-size:0.64rem;color:rgba(255,255,255,0.35);letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,0.07)}
    .admin-grp-label{padding:1.1rem 1.4rem 0.4rem;font-size:0.6rem;font-weight:700;color:rgba(255,255,255,0.28);letter-spacing:1.5px;text-transform:uppercase}
    .admin-nav-item{display:flex;align-items:center;gap:11px;padding:11px 1.4rem;font-size:0.82rem;font-weight:500;color:rgba(255,255,255,0.55);cursor:pointer;transition:all .2s}
    .admin-nav-item:hover{background:rgba(255,255,255,0.04);color:#fff}
    .admin-nav-item.on{background:${ACC};color:#fff;font-weight:600}
    .admin-main{margin-left:252px;padding:2rem;flex:1}
    .adm-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem}
    .adm-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:${DARK}}
    .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem}
    .stat-c{background:#fff;border-radius:14px;padding:1.4rem;box-shadow:0 2px 14px rgba(0,0,0,0.05);display:flex;align-items:center;gap:1rem}
    .stat-ico{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .stat-num{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:700;color:${DARK};line-height:1}
    .stat-lbl{font-size:0.73rem;color:#999;margin-top:2px}
    .a-table{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 2px 14px rgba(0,0,0,0.05)}
    .a-table table{width:100%;border-collapse:collapse}
    .a-table th{background:#f7f8f9;padding:11px 14px;text-align:left;font-size:0.7rem;font-weight:700;color:#999;letter-spacing:0.5px;text-transform:uppercase}
    .a-table td{padding:11px 14px;font-size:0.83rem;color:#555;border-bottom:1px solid #f2f2f2}
    .a-table tr:last-child td{border-bottom:none}
    .a-table tr:hover td{background:#fdfaf7}
    .badge{display:inline-block;padding:3px 10px;border-radius:50px;font-size:0.68rem;font-weight:700}
    .b-g{background:#e8f5e9;color:#2e7d32}
    .b-o{background:#fff3e0;color:#e65100}
    .b-b{background:#e3f2fd;color:#1565c0}
    .a-card{background:#fff;border-radius:14px;padding:1.4rem;box-shadow:0 2px 14px rgba(0,0,0,0.05);margin-bottom:1.5rem}
    .a-card-h{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:700;color:${DARK};margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between}
    .a-inp{padding:9px 13px;border:2px solid #e8e8e8;border-radius:9px;font-family:'Outfit',sans-serif;font-size:0.83rem;outline:none;transition:border .2s;background:#fafafa;color:#222;width:100%}
    .a-inp:focus{border-color:${ACC}}
    .a-ta{padding:9px 13px;border:2px solid #e8e8e8;border-radius:9px;font-size:0.83rem;resize:vertical;min-height:75px;font-family:'Outfit',sans-serif;background:#fafafa;outline:none;width:100%}
    .a-sel{padding:9px 13px;border:2px solid #e8e8e8;border-radius:9px;font-size:0.83rem;background:#fafafa;outline:none;width:100%}
    .a-lbl{font-size:0.75rem;font-weight:600;color:#666;margin-bottom:4px;display:block}
    .a-fg{margin-bottom:1rem}
    .ic-btn{width:32px;height:32px;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .2s}
    .ic-btn-b{background:#e3f2fd;color:#1565c0}
    .ic-btn-b:hover{background:#1565c0;color:#fff}
    .ic-btn-r{background:#ffebee;color:#c62828}
    .ic-btn-r:hover{background:#c62828;color:#fff}
    .ic-btn-g{background:#e8f5e9;color:#2e7d32}
    .ic-btn-g:hover{background:#2e7d32;color:#fff}
    .modal-bg{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:500;display:flex;align-items:center;justify-content:center;padding:1.5rem}
    .modal{background:#fff;border-radius:20px;padding:2rem;width:100%;max-width:580px;max-height:82vh;overflow-y:auto}
    .modal-h{font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:700;color:${DARK};display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}
    .toast{position:fixed;bottom:2rem;right:2rem;z-index:600;background:${DARK};color:#fff;padding:13px 22px;border-radius:10px;font-size:0.83rem;font-weight:500;box-shadow:0 8px 28px rgba(0,0,0,0.22);border-left:4px solid ${SAFFRON};animation:slideIn .3s ease}
    .toast.err{border-left-color:#e53935}
    .back-btn{display:inline-flex;align-items:center;gap:7px;font-size:0.82rem;font-weight:600;color:${ACC};cursor:pointer;margin-bottom:1.75rem;transition:gap .2s}
    .back-btn:hover{gap:11px}
    .success-box{text-align:center;padding:3.5rem 2rem;background:#fff;border-radius:22px;box-shadow:0 8px 50px rgba(0,0,0,0.1)}
    .suc-icon{width:76px;height:76px;background:${ACC};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem}
    .seo-preview{background:#f5f5f5;border-radius:10px;padding:1.2rem;font-family:Arial,sans-serif}
    .seo-url{font-size:0.73rem;color:#006621;margin-bottom:3px}
    .seo-t{font-size:1.05rem;color:#1a0dab;font-weight:400;margin-bottom:3px}
    .seo-d{font-size:0.8rem;color:#545454;line-height:1.5}
    .india-flag-strip{background:linear-gradient(90deg,#FF9933 0%,#FF9933 33%,#fff 33%,#fff 66%,#138808 66%,#138808 100%);height:4px}

    /* ── PACKAGE TIERS ── */
    .tier-tabs{display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:2rem}
    .tier-tab{padding:10px 20px;border-radius:12px;border:2px solid #e0e0e0;background:#fff;cursor:pointer;transition:all .2s;text-align:center;min-width:120px}
    .tier-tab:hover{border-color:${ACC};transform:translateY(-2px)}
    .tier-tab.active{background:${DARK};border-color:${DARK};color:#fff}
    .tier-tab .tier-days{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700}
    .tier-tab .tier-label{font-size:0.68rem;opacity:0.75;display:block;margin-top:2px}
    .tier-tab .tier-price{font-size:0.8rem;font-weight:700;color:${ACC};margin-top:3px;display:block}
    .tier-tab.active .tier-price{color:${SAFFRON}}
    .tier-badge{display:inline-flex;align-items:center;gap:6px;background:${ACC};color:#fff;padding:4px 14px;border-radius:50px;font-size:0.72rem;font-weight:700;margin-bottom:1rem}

    /* ── CUSTOM PACKAGE BUILDER ── */
    .cpb-wrap{background:linear-gradient(160deg,${DARK},${FOREST});padding:5rem 1.5rem}
    .cpb-inner{max-width:860px;margin:0 auto}
    .cpb-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:2rem;margin-bottom:1.5rem}
    .cpb-step-label{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem}
    .cpb-step-num{width:30px;height:30px;border-radius:8px;background:${ACC};color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.82rem;font-weight:700;flex-shrink:0}
    .cpb-step-title{font-size:1rem;font-weight:700;color:#fff}
    .cpb-dest-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.75rem}
    .cpb-dest-btn{padding:10px 8px;border:2px solid rgba(255,255,255,0.15);border-radius:12px;background:transparent;color:rgba(255,255,255,0.7);cursor:pointer;transition:all .2s;text-align:center;font-size:0.82rem;font-weight:500}
    .cpb-dest-btn:hover{border-color:${SAFFRON};color:#fff}
    .cpb-dest-btn.sel{background:${ACC};border-color:${ACC};color:#fff;font-weight:700}
    .cpb-slider-wrap{padding:0.5rem 0}
    .cpb-slider{width:100%;-webkit-appearance:none;height:6px;border-radius:3px;background:rgba(255,255,255,0.15);outline:none;cursor:pointer}
    .cpb-slider::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:${ACC};cursor:pointer;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)}
    .cpb-slider-labels{display:flex;justify-content:space-between;font-size:0.7rem;color:rgba(255,255,255,0.4);margin-top:6px}
    .cpb-counter{display:flex;align-items:center;gap:1rem}
    .cpb-counter-btn{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.2);color:#fff;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
    .cpb-counter-btn:hover{background:${ACC};border-color:${ACC}}
    .cpb-counter-val{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:#fff;min-width:40px;text-align:center}
    .cpb-hotel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem}
    .cpb-hotel-btn{padding:1rem;border:2px solid rgba(255,255,255,0.15);border-radius:12px;background:transparent;color:rgba(255,255,255,0.7);cursor:pointer;transition:all .2s;text-align:center}
    .cpb-hotel-btn.sel{background:rgba(247,148,29,0.15);border-color:${SAFFRON};color:#fff}
    .cpb-hotel-icon{font-size:1.5rem;margin-bottom:4px}
    .cpb-hotel-name{font-size:0.82rem;font-weight:600;display:block}
    .cpb-hotel-price{font-size:0.68rem;opacity:0.6;margin-top:2px;display:block}
    .cpb-activity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:0.75rem}
    .cpb-activity-btn{padding:0.85rem;border:2px solid rgba(255,255,255,0.15);border-radius:12px;background:transparent;color:rgba(255,255,255,0.65);cursor:pointer;transition:all .2s;text-align:center;font-size:0.8rem}
    .cpb-activity-btn.sel{background:rgba(212,80,10,0.2);border-color:${ACC};color:#fff}
    .cpb-price-box{background:${ACC};border-radius:16px;padding:1.5rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem}
    .cpb-price-main{font-family:'Cormorant Garamond',serif;font-size:2.8rem;font-weight:700;color:#fff;line-height:1}
    .cpb-price-note{font-size:0.8rem;color:rgba(255,255,255,0.7);margin-top:4px}
    .cpb-wa-btn{background:#25D366;color:#fff;border:none;border-radius:12px;padding:14px 28px;font-size:1rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:10px;transition:all .25s;font-family:'Outfit',sans-serif}
    .cpb-wa-btn:hover{background:#1da851;transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,211,102,0.4)}

    /* ── FLOATING WHATSAPP BUTTON ── */
    .wa-float{position:fixed;bottom:2rem;right:2rem;z-index:150;width:58px;height:58px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.5);cursor:pointer;transition:all .3s;animation:waPulse 2s infinite}
    .wa-float:hover{transform:scale(1.1);box-shadow:0 8px 32px rgba(37,211,102,0.6)}
    @keyframes waPulse{0%,100%{box-shadow:0 4px 20px rgba(37,211,102,0.5)}50%{box-shadow:0 4px 32px rgba(37,211,102,0.8)}}
    .rev-section{background:#fff;border-radius:20px;padding:2rem;box-shadow:0 3px 18px rgba(0,0,0,0.06);margin-bottom:1.5rem}
    .rev-section h3{font-family:'Cormorant Garamond',serif;font-size:1.35rem;font-weight:700;color:${DARK};margin-bottom:1.5rem}
    .rev-summary{display:flex;gap:2rem;align-items:center;padding:1.5rem;background:${CREAM};border-radius:16px;margin-bottom:1.75rem;flex-wrap:wrap}
    .rev-big-score{text-align:center;min-width:90px}
    .rev-big-num{font-family:'Cormorant Garamond',serif;font-size:3.5rem;font-weight:700;color:${DARK};line-height:1}
    .rev-big-label{font-size:0.72rem;color:#888;margin-top:4px}
    .rev-bars{flex:1;min-width:180px}
    .rev-bar-row{display:flex;align-items:center;gap:10px;margin-bottom:7px}
    .rev-bar-label{font-size:0.72rem;color:#666;width:30px;text-align:right;flex-shrink:0}
    .rev-bar-track{flex:1;height:8px;background:#eee;border-radius:4px;overflow:hidden}
    .rev-bar-fill{height:100%;border-radius:4px;background:${SAFFRON};transition:width .5s ease}
    .rev-bar-count{font-size:0.7rem;color:#aaa;width:24px;flex-shrink:0}
    .rev-card{padding:1.5rem 0;border-bottom:1px solid #f5f5f5}
    .rev-card:last-child{border-bottom:none;padding-bottom:0}
    .rev-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.75rem;gap:1rem;flex-wrap:wrap}
    .rev-author{display:flex;align-items:center;gap:12px}
    .rev-av{width:40px;height:40px;border-radius:12px;background:${ACC};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.78rem;flex-shrink:0}
    .rev-name{font-weight:700;font-size:0.88rem;color:${DARK}}
    .rev-loc{font-size:0.75rem;color:#999;margin-top:1px}
    .rev-date{font-size:0.72rem;color:#bbb}
    .rev-verified{display:inline-flex;align-items:center;gap:4px;background:#e8f5e9;color:#2e7d32;font-size:0.68rem;font-weight:700;padding:2px 8px;border-radius:50px}
    .rev-pending{display:inline-flex;align-items:center;gap:4px;background:#fff3e0;color:#e65100;font-size:0.68rem;font-weight:700;padding:2px 8px;border-radius:50px}
    .rev-title{font-weight:700;font-size:0.92rem;color:${DARK};margin-bottom:0.4rem}
    .rev-body{font-size:0.85rem;color:#555;line-height:1.7}
    .rev-helpful{font-size:0.75rem;color:#888;cursor:pointer;display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:50px;border:1.5px solid #eee;transition:all .2s;margin-top:0.85rem;background:#fff}
    .rev-helpful:hover{border-color:${ACC};color:${ACC}}
    .write-rev{background:linear-gradient(135deg,${DARK},${FOREST});border-radius:20px;padding:2rem;margin-bottom:1.5rem}
    .write-rev h3{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:#fff;margin-bottom:0.4rem}
    .write-rev-sub{font-size:0.82rem;color:rgba(255,255,255,0.55);margin-bottom:1.5rem}
    .star-picker{display:flex;gap:6px;margin-bottom:1.25rem}
    .star-pick-btn{background:none;border:none;cursor:pointer;transition:transform .15s;padding:2px}
    .star-pick-btn:hover{transform:scale(1.2)}
    .rev-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .rev-inp{width:100%;padding:10px 14px;border:2px solid rgba(255,255,255,0.12);border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.85rem;background:rgba(255,255,255,0.07);color:#fff;outline:none;transition:border .2s}
    .rev-inp::placeholder{color:rgba(255,255,255,0.3)}
    .rev-inp:focus{border-color:${ACC};background:rgba(255,255,255,0.1)}
    .rev-ta{width:100%;padding:10px 14px;border:2px solid rgba(255,255,255,0.12);border-radius:10px;font-family:'Outfit',sans-serif;font-size:0.85rem;background:rgba(255,255,255,0.07);color:#fff;outline:none;resize:vertical;min-height:90px;transition:border .2s}
    .rev-ta::placeholder{color:rgba(255,255,255,0.3)}
    .rev-ta:focus{border-color:${ACC}}
    .rev-filter{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.25rem}
    .rev-filter-btn{padding:5px 14px;border-radius:50px;font-size:0.75rem;font-weight:600;cursor:pointer;border:1.5px solid #eee;background:#fff;color:#888;transition:all .2s}
    .rev-filter-btn.on{background:${ACC};border-color:${ACC};color:#fff}
    .rev-sort{font-size:0.78rem;padding:6px 12px;border:1.5px solid #eee;border-radius:8px;background:#fff;outline:none;cursor:pointer;color:#555}
    @media(max-width:700px){
      .rev-summary{flex-direction:column;gap:1.25rem}
      .rev-form-grid{grid-template-columns:1fr}
    }
    .auth-wrap{min-height:100vh;display:flex;align-items:stretch;font-family:'Outfit',sans-serif}
    .auth-left{flex:1;background:linear-gradient(160deg,${DARK} 0%,${FOREST} 50%,#0a1a0a 100%);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:4rem 3.5rem}
    .auth-left-bg{position:absolute;inset:0;opacity:0.08;background-size:cover;background-position:center}
    .auth-left-pattern{position:absolute;inset:0;background-image:radial-gradient(circle at 30% 70%,rgba(212,80,10,0.2) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(247,148,29,0.1) 0%,transparent 50%)}
    .auth-left-content{position:relative;z-index:2}
    .auth-brand{display:flex;align-items:center;gap:12px;margin-bottom:3rem}
    .auth-brand-icon{width:46px;height:46px;background:${ACC};border-radius:12px;display:flex;align-items:center;justify-content:center}
    .auth-brand-name{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:700;color:#fff}
    .auth-brand-name span{color:${SAFFRON}}
    .auth-tagline{font-family:'Cormorant Garamond',serif;font-size:2.4rem;font-weight:700;color:#fff;line-height:1.2;margin-bottom:1rem}
    .auth-tagline em{font-style:italic;color:${SAFFRON}}
    .auth-sub{font-size:0.95rem;color:rgba(255,255,255,0.6);line-height:1.75;margin-bottom:2.5rem}
    .auth-features{display:flex;flex-direction:column;gap:0.85rem}
    .auth-feat{display:flex;align-items:center;gap:12px;font-size:0.85rem;color:rgba(255,255,255,0.75)}
    .auth-feat-dot{width:32px;height:32px;border-radius:10px;background:rgba(212,80,10,0.2);border:1px solid rgba(212,80,10,0.3);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .auth-right{width:480px;flex-shrink:0;display:flex;align-items:center;justify-content:center;padding:3rem 2.5rem;background:#fff}
    .auth-box{width:100%;max-width:380px}
    .auth-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:700;color:${DARK};margin-bottom:0.4rem}
    .auth-desc{font-size:0.85rem;color:#888;margin-bottom:2rem;line-height:1.6}
    .auth-fg{margin-bottom:1.25rem}
    .auth-lbl{display:flex;align-items:center;justify-content:space-between;font-size:0.78rem;font-weight:600;color:#555;margin-bottom:6px}
    .auth-inp-wrap{position:relative}
    .auth-inp{width:100%;padding:12px 16px;border:2px solid #e8e8e8;border-radius:12px;font-family:'Outfit',sans-serif;font-size:0.9rem;color:#222;outline:none;transition:border .2s,box-shadow .2s;background:#fafafa}
    .auth-inp:focus{border-color:${ACC};background:#fff;box-shadow:0 0 0 4px rgba(212,80,10,0.08)}
    .auth-inp.has-icon{padding-left:44px}
    .auth-inp-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);pointer-events:none}
    .auth-inp-toggle{position:absolute;right:14px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:#aaa;padding:2px;display:flex;align-items:center}
    .auth-inp-toggle:hover{color:${ACC}}
    .auth-error{background:#fff0f0;border:1.5px solid #ffc1c1;border-radius:10px;padding:10px 14px;font-size:0.82rem;color:#c62828;margin-bottom:1.25rem;display:flex;align-items:flex-start;gap:8px}
    .auth-btn{width:100%;padding:14px;border:none;border-radius:12px;background:${ACC};color:#fff;font-family:'Outfit',sans-serif;font-size:0.95rem;font-weight:700;cursor:pointer;transition:all .25s;letter-spacing:0.3px;display:flex;align-items:center;justify-content:center;gap:8px}
    .auth-btn:hover:not(:disabled){background:#bf4a08;transform:translateY(-1px);box-shadow:0 8px 28px rgba(212,80,10,0.35)}
    .auth-btn:disabled{opacity:0.7;cursor:not-allowed}
    .auth-divider{display:flex;align-items:center;gap:12px;margin:1.5rem 0;color:#ccc;font-size:0.78rem}
    .auth-divider::before,.auth-divider::after{content:'';flex:1;height:1px;background:#eee}
    .auth-remember{display:flex;align-items:center;gap:8px;font-size:0.82rem;color:#666;cursor:pointer;margin-bottom:1.5rem}
    .auth-remember input{width:16px;height:16px;accent-color:${ACC};cursor:pointer}
    .auth-link{color:${ACC};font-weight:600;cursor:pointer;text-decoration:none;font-size:0.82rem;transition:color .15s}
    .auth-link:hover{color:#bf4a08}
    .auth-user-chip{display:flex;align-items:center;gap:10px;padding:12px 14px;background:#fdf6ec;border:1.5px solid rgba(212,80,10,0.2);border-radius:12px;margin-bottom:1.5rem}
    .auth-spinner{width:18px;height:18px;border:3px solid rgba(255,255,255,0.3);border-top:3px solid #fff;border-radius:50%;animation:spin .7s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    /* Admin user management table */
    .user-role-badge{display:inline-block;padding:3px 10px;border-radius:50px;font-size:0.68rem;font-weight:700}
    .role-super{background:#fce4ec;color:#c62828}
    .role-pkg{background:#e8f5e9;color:#2e7d32}
    .role-content{background:#e3f2fd;color:#1565c0}
    .role-booking{background:#fff3e0;color:#e65100}
    /* Admin header with user info */
    .admin-topbar{background:#fff;border-bottom:1px solid #f0f0f0;padding:0 2rem;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10}
    .admin-topbar-left{font-size:0.88rem;color:#888}
    .admin-topbar-left strong{color:${DARK}}
    .admin-user-pill{display:flex;align-items:center;gap:10px;padding:6px 14px 6px 8px;background:#f8f8f8;border:1.5px solid #eee;border-radius:50px;cursor:pointer;transition:all .2s}
    .admin-user-pill:hover{border-color:${ACC};background:#fff8f4}
    .admin-user-av{width:30px;height:30px;border-radius:50%;background:${ACC};color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:700}
    .admin-user-name{font-size:0.82rem;font-weight:600;color:${DARK}}
    .admin-user-role{font-size:0.7rem;color:#999}
    .logout-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;background:#fff0f0;border:1.5px solid #ffc1c1;border-radius:8px;color:#c62828;font-size:0.8rem;font-weight:600;cursor:pointer;transition:all .2s}
    .logout-btn:hover{background:#c62828;color:#fff;border-color:#c62828}
    @media(max-width:768px){
      .auth-left{display:none}
      .auth-right{width:100%;padding:2rem 1.5rem}
    }

    /* ANIMATIONS */
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes heroZoom{from{transform:scale(1.03)}to{transform:scale(1.08)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}

    /* ── TABLET (max 900px) ── */
    @media(max-width:900px){
      .footer-top{grid-template-columns:1fr 1fr}
      .detail-grid{grid-template-columns:1fr}
      .stats-row{grid-template-columns:1fr 1fr}
      .hero-body{padding:110px 1.5rem 2rem}
      .hero-strip{padding:1.2rem 1.5rem;flex-wrap:wrap;gap:0.75rem}
      .hero-stat{border-right:none;flex:unset;min-width:44%;text-align:left}
      .admin-sb{width:220px}
      .admin-main{margin-left:220px;padding:1.5rem}
    }

    /* ── MOBILE (max 700px) ── */
    @media(max-width:700px){
      /* Nav */
      .nav{padding:0 1rem;height:60px}
      .nav-links{display:none}
      .mob-toggle{display:block}

      /* Hero */
      .hero{min-height:100svh;background:#0a180a}
      .hero-bg{background-image:url('/mobile-hero-bg.jpg') !important;background-size:cover;background-position:center;background-color:#0a180a;opacity:0.7}
      .hero-grad{background:linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.25) 60%,rgba(0,0,0,0.1) 100%)}
      .hero-body{padding:90px 1.25rem 2rem;min-height:unset;justify-content:center;text-align:center;align-items:center}
      .hero-pill{font-size:0.65rem;padding:5px 12px;margin-bottom:1rem}
      .hero-h1{font-size:clamp(2rem,7vw,2.8rem);margin-bottom:1rem}
      .hero-sub{font-size:0.88rem;margin-bottom:1.75rem;max-width:100%}
      .hero-btns{flex-direction:column;gap:0.75rem;align-items:center}
      .hero-btns .btn{width:100%;justify-content:center;padding:13px 20px}

      /* Hero stats strip — 2×2 grid */
      .hero-strip{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:0;
        padding:0;
      }
      .hero-stat{
        padding:1rem;
        border-right:1px solid rgba(247,148,29,0.15);
        border-bottom:1px solid rgba(247,148,29,0.15);
        min-width:unset;
        text-align:center;
      }
      .hero-stat:nth-child(2){border-right:none}
      .hero-stat:nth-child(3){border-bottom:none}
      .hero-stat:nth-child(4){border-right:none;border-bottom:none}
      .stat-n{font-size:1.6rem}
      .stat-l{font-size:0.65rem}

      /* Section */
      .sec{padding:3rem 1.25rem}
      .sec-title{font-size:1.75rem}
      .sec-sub{font-size:0.88rem}

      /* Destination grid — 1 col */
      .dest-grid{grid-template-columns:1fr}

      /* Category strip — scroll on mobile */
      .cat-strip-inner{justify-content:flex-start !important;flex-wrap:nowrap !important;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .pkg-grid{grid-template-columns:1fr !important}
      .pkg-img-wrap{aspect-ratio:16/9 !important}
      .pkg-name{font-size:1.1rem}
      .pkg-body{padding:1rem}

      /* Char Dham feature banner — stack on mobile */
      .char-dham-grid{grid-template-columns:1fr !important}
      .char-dham-dhams{grid-template-columns:1fr 1fr !important;margin-top:1.5rem}

      /* Tiger safari section — 1 col */
      .tiger-grid{grid-template-columns:1fr !important}

      /* Testimonial cards — show full width */
      .testi-card{min-width:calc(100vw - 2.5rem);max-width:calc(100vw - 2.5rem)}

      /* Offers grid — 1 col */
      .offers-grid{grid-template-columns:1fr}

      /* Blog grid — 1 col */
      .blog-grid{grid-template-columns:1fr}

      /* Booking page */
      .booking-page{padding:5rem 1.25rem 3rem;overflow-x:hidden}
      .booking-form{padding:1.5rem;border-radius:16px;width:100%;max-width:100%}
      .form-grid{grid-template-columns:1fr !important}
      .form-full{grid-column:1 !important}
      .est-box{flex-direction:column;gap:0.5rem;align-items:flex-start}

      /* Package detail */
      .detail-page{padding:5rem 1.25rem 3rem}
      .detail-hero{height:240px;border-radius:14px}
      .detail-hero-info{padding:1rem}
      .detail-grid{grid-template-columns:1fr}
      .detail-sec{padding:1.25rem}
      .sidebar-box{position:static;border-radius:14px;padding:1.5rem}
      .sb-price{font-size:2rem}

      /* Footer */
      .footer-top{grid-template-columns:1fr}
      .footer{padding:3rem 1.25rem 1.5rem}
      .footer-bottom{flex-direction:column;gap:0.5rem;text-align:center}

      /* CTA section */
      .cta-sec{padding:3.5rem 1.25rem}
      .cta-btns{flex-direction:column;align-items:center}
      .cta-btns .btn{width:100%;max-width:320px;justify-content:center}

      /* Admin sidebar hidden on mobile */
      .admin-sb{transform:translateX(-100%);z-index:100}
      .admin-main{margin-left:0 !important;padding:1rem}
      .admin-topbar{padding:0 1rem}
      .stats-row{grid-template-columns:1fr 1fr}
      .adm-title{font-size:1.4rem}

      /* Auth */
      .auth-left{display:none}
      .auth-right{width:100%;padding:2rem 1.5rem;min-height:100vh}
    }

    /* ── SMALL MOBILE (max 420px) ── */
    @media(max-width:420px){
      .nav-logo-text{font-size:1.2rem}
      .hero-h1{font-size:1.75rem}
      .booking-form{padding:1.25rem}
      .pkg-body{padding:1rem}
      .pkg-price{font-size:1.3rem}
      .detail-hero{height:200px}
      .sec{padding:2.5rem 1rem}
      .testi-card{min-width:calc(100vw - 2rem);max-width:calc(100vw - 2rem)}
    }
  `;

export default CSS;
