type SubscriptionCardProps = {
  title: string;
  description: string;
  durationMonths: number;
  price: number;
  features: string[];
  popular?: boolean;
};

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  description,
  durationMonths,
  price,
  features,
  popular = false,
}) => {
  return (
    <div
      className={`relative rounded-lg p-8 shadow-lg flex flex-col justify-between bg-[#E6CFA9] text-[#9A3F3F] transition-transform duration-300 hover:scale-105 ${
        popular ? "border-4 border-[#9A3F3F]" : "border border-[#C1856D]"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 -right-3 bg-[#9A3F3F] text-[#FBF9D1] px-3 py-1 rounded-full text-sm font-semibold shadow-lg select-none">
          Популярный
        </div>
      )}
      <h2 className="text-3xl font-bold mb-3">{title}</h2>
      <p className="mb-6 text-base leading-relaxed">{description}</p>

      <ul className="mb-6 space-y-2 list-disc list-inside text-[#9A3F3F]">
        {features.map((feature, i) => (
          <li key={i} className="pl-2 before:text-[#9A3F3F]">
            {feature}
          </li>
        ))}
      </ul>

      <div className="text-xl font-extrabold mb-6">
        ₽{price} <span className="text-lg font-normal">/ {durationMonths} мес.</span>
      </div>

      <button
        className={`py-3 rounded font-semibold shadow-md transition-colors duration-300 ${
          popular
            ? "bg-[#9A3F3F] text-[#FBF9D1] hover:bg-[#C1856D]"
            : "bg-[#C1856D] text-[#FBF9D1] hover:bg-[#9A3F3F]"
        }`}
      >
        Купить
      </button>
    </div>
  );
};
