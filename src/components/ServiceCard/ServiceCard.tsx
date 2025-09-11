export function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-[#F9F4E6] rounded-lg p-6 shadow-md flex flex-col items-center text-center text-[#9A3F3F]">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-base">{description}</p>
    </div>
  );
}