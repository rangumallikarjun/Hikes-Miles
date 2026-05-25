import I from "./Icon";
import Stars from "./Stars";
import { ACC, FOREST, DARK, CAT_COLORS } from "../constants/colors";

function PkgCard({ pkg, go }) {
  return (
    <div className="pkg-card" onClick={() => go("pkg-detail", pkg)}>
      <div className="pkg-img-wrap">
        <img
          src={pkg.image}
          alt={pkg.name}
          loading="lazy"
          onError={e => { e.target.style.display="none"; e.target.parentNode.style.background=`linear-gradient(135deg,${CAT_COLORS[pkg.category]||FOREST},${DARK})`; }}
        />
        <div className="pkg-img-overlay" />
        <div className="pkg-badge" style={{ background: CAT_COLORS[pkg.category] || ACC }}>{pkg.badge}</div>
        <div className="pkg-cat-dot">{pkg.category}</div>
      </div>
      <div className="pkg-body">
        <div className="pkg-name">{pkg.name}</div>
        <div className="pkg-dest">
          <I n="map" s={12} c="#bbb" />
          <span>{pkg.destination} · {pkg.state}</span>
        </div>
        <div className="pkg-metas">
          <div className="pkg-meta"><I n="clock" s={13} c="#bbb" />{pkg.duration}</div>
          <div className="pkg-meta"><I n="users" s={13} c="#bbb" />{pkg.groupSize} pax</div>
        </div>
        <div className="pkg-foot">
          <div>
            <div className="pkg-strike">₹{Number(pkg.originalPrice).toLocaleString("en-IN")}</div>
            <div className="pkg-price">
              ₹{Number(pkg.price).toLocaleString("en-IN")}
              <small>per person</small>
            </div>
          </div>
          <div className="pkg-rating">
            <Stars r={pkg.rating} s={13} />
            <span>{pkg.rating} ({pkg.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PkgCard;
