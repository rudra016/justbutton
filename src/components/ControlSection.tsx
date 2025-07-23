interface ControlSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ControlSection({ title, children }: ControlSectionProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}
