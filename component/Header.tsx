export default function Header({ str }: { str: string }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left">
      {str.split(" ")[0]} <span className="text-blue-500">{str.split(" ")[1]}</span>
    </h2>
  );
}
