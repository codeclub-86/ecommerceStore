const products = [
  {
    id: "1", // 👈 string instead of number
    image: "/product-1.jpg",
    category: "Watches",
    name: "Xiaomi Mi Band 5",
    rating: 4,
    price: 199.0,
  },
  {
    id: "2",
    image: "/product-1.jpg",
    category: "Speaker",
    name: "Big Power Sound Speaker",
    rating: 5,
    price: 275.0,
    oldPrice: 399.0, // 👈 keep as number for formatting
    discount: "-25%",
  },
  {
    id: "3",
    image: "/product-1.jpg",
    category: "Speaker",
    name: "Big Power Sound Speaker",
    rating: 5,
    price: 275.0,
    oldPrice: 399.0,
    discount: "-25%",
  },
  {
    id: "4",
    image: "/product-1.jpg",
    category: "Speaker",
    name: "Big Power Sound Speaker",
    rating: 5,
    price: 275.0,
    oldPrice: 399.0,
    discount: "-25%",
  },
  // ➝ Add more dummy products here (id must be string)
];

export default products;
