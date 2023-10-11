interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 p-10 text-center shadow-sm">
      {icon}
      <h3 className="text-3xl font-bold text-blue-600">{title}</h3>
      <p className="text-lg text-black">{description}</p>
    </div>
  );
}
