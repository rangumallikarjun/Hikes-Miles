import I from "./Icon";

const Stars = ({ r, s = 14 }) => (
  <span style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => <I key={i} n="star" s={s} c={i <= Math.round(r) ? "#F7941D" : "#ddd"} stroke={false} />)}
  </span>
);

export default Stars;
