export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan "-"
    .replace(/[^\w-]+/g, ""); // Hapus karakter non-alphanumerik selain "-"
};
