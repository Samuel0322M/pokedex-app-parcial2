interface Props {
  title: string;
  description?: string;
}

export const CustomJumbotron = ({ title, description }: Props) => {
  return (
    <div className="text-center mb-10 mt-4">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4 drop-shadow-sm">
        {title}
      </h1>
      {description && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{description}</p>}
    </div>
  );
};