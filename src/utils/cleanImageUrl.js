const cleanImageUrl = (raw = "") => {
  const url = raw.trim();
  if (!url) return "";
  const drive = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (drive) return `https://drive.google.com/uc?export=view&id=${drive[1]}`;
  const uImg = url.match(/images\.unsplash\.com\/(photo-[a-zA-Z0-9_-]+)/);
  if (uImg) return `https://wsrv.nl/?url=images.unsplash.com/${uImg[1]}&w=800&q=80&fit=cover`;
  const uPage = url.match(/unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/);
  if (uPage) return `https://images.unsplash.com/${uPage[1]}/800x600`;
  return url;
};

export default cleanImageUrl;
