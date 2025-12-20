import { NewProductForm } from "./NewProductForm";

export default function NewProductPage() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Produk Baru</h1>
        <p className="text-gray-500 mt-1">
          Buat produk baru dan tambahkan beberapa varian.
        </p>
      </div>

      <NewProductForm />
    </main>
  );
}
