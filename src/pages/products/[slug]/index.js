import ProductOverview from "@/components/organism/ProductOverview";
import { formatCurrency } from "@/helper/util/formatCurrency";

const api = process.env.NEXT_PUBLIC_API;
const dir = process.env.NEXT_PUBLIC_DIR;

// Fungsi untuk mengubah kebab-case menjadi format pencarian yang sesuai
const formatSlugToName = (slug) => {
  return slug
    .split("-") // Pisahkan berdasarkan tanda "-"
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Kapitalisasi setiap kata
    .join(" "); // Gabungkan kembali dengan spasi
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const productName = formatSlugToName(slug); // Normalisasi slug

  const response = await fetch(
    `${api}/product/search?name=${encodeURIComponent(productName)}`,
  );
  const data = await response.json();

  // Jika tidak ada produk ditemukan
  if (!data.data || data.data.length === 0) {
    return {
      notFound: true,
    };
  }

  const product = data.data[0];

  return {
    props: { product },
  };
}

const ProductDetail = ({ product }) => {
  return (
    <ProductOverview
      title={product.name}
      price={formatCurrency(product.price)}
      description={product.description}
      image={dir + product.imagePath}
    />
  );
};

export default ProductDetail;
