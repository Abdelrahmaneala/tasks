const products = [
  { name: "Headphones", ratings: [4, 5, 4], popular: false },
  { name: "Phone Case", ratings: [3, 3.5, 4], popular: false },
  { name: "Smartwatch", ratings: [5, 4.5, 4.75], popular: false },
];

function calculateAverage(ratings) {
  const sum = ratings.reduce((acc, val) => acc + val, 0);
  return sum / ratings.length;
}

products.forEach(product => {
  product.average = calculateAverage(product.ratings);
  product.popular = product.average >= 4.0;
});

products.sort((a, b) => b.average - a.average);

products.forEach(product => {
  console.log(`${product.name}: Average = ${product.average.toFixed(2)}, Popular = ${product.popular}`);
});

const popularProducts = products
  .filter(product => product.popular)
  .map(product => product.name);

console.log('Popular Products:', JSON.stringify(popularProducts));
