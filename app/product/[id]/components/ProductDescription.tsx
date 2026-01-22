interface ProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="mt-16 pt-10 border-t border-slate-100">
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-9">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Deskripsi Produk
          </h3>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
