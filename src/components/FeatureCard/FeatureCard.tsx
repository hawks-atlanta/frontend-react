interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="m-2 rounded-lg bg-gray-100 p-10">
      <div className="mx-1 flex flex-col items-center p-2 text-center sm:mx-2">
        {icon}
        <h3 className="mb-4 mt-2 text-2xl font-bold text-blue-600">{title}</h3>
        <p className="text-lg text-black">{description}</p>
      </div>
    </div>
  );
}
