// Component for feature titles
interface FeatureTitleProps {
  text: string;
}

export function FeatureTitle({ text }: FeatureTitleProps) {
  return <h3 className="mb-5 mt-2 text-2xl font-bold text-blue-600">{text}</h3>;
}

interface FeatureDescriptionProps {
  text: string;
}

export function FeatureDescription({ text }: FeatureDescriptionProps) {
  return <p className="text-lg text-black">{text}</p>;
}
