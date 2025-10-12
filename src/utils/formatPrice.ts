/**
 * Fungsi utilitas untuk format harga
 */
export const formatRupiah = (price: number | string): string => {
  // Jika sudah dalam format string dengan titik, hapus dulu
  if (typeof price === 'string') {
    price = price.replace(/\./g, '');
  }
  
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(Number(price));
};

export const parsePrice = (price: string | number): number => {
  if (typeof price === 'string') {
    return parseInt(price.replace(/\./g, '')) || 0;
  }
  return price;
};