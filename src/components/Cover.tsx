import { backgroundOptions } from "../data/backgrounds";

interface CoverProps {
  id?: number | string;
}

export const Cover = ({ id }: CoverProps) => {
  const randomBackground =
    backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];

  return (
    <div
      className={`aspect-square ${randomBackground} transition-opacity hover:opacity-80`}
    />
  );
};

