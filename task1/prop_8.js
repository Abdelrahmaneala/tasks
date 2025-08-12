const fs = require('fs').promises;  // استيراد مكتبة قراءة الملفات باستخدام الوعود

async function processProducts() {
  try {
    const data = await fs.readFile('data.json', 'utf-8');
    const products = JSON.parse(data);

    // 1- عرض أسماء المنتجات
    console.log('All product names:');
    products.forEach(p => console.log(p.name));

    // 2- حساب مجموع أسعار المنتجات
    const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
    console.log('\nTotal price of all products:', totalPrice);

    // 3- إيجاد أغلى منتج
    const mostExpensive = products.reduce((prev, curr) => (curr.price > prev.price ? curr : prev));
    console.log('\nMost expensive product:', mostExpensive.name, 'with price', mostExpensive.price);

    // 4- عرض المنتجات المتوفرة في المخزن
    const inStockProducts = products.filter(p => p.inStock);
    console.log('\nProducts in stock:');
    inStockProducts.forEach(p => console.log(p.name));

    // 5- إنشاء مصفوفة بجميع الفئات (بدون تكرار)
    const categories = [...new Set(products.map(p => p.category))];
    console.log('\nAll categories:', categories);

  } catch (error) {
    console.error('Error reading or processing file:', error);
  }
}

processProducts();
