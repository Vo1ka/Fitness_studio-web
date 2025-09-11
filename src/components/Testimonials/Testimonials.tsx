export function Testimonial({ name, text }: { name: string; text: string }) {
  return (
    <blockquote className="border-l-4 border-[#FBF9D1] pl-4 italic">
      <p className="mb-2">"{text}"</p>
      <footer className="font-semibold">— {name}</footer>
    </blockquote>
  );
}