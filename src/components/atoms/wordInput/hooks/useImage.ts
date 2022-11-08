import { useEffect, useState } from 'react';

interface UseImageRes {
  image?: HTMLImageElement;
}

interface UseImageProps {
  src?: string;
}

const useImage: (props: UseImageProps) => UseImageRes = ({ src }) => {
  const [result, setResult] = useState<HTMLImageElement>();

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setResult(img);
    };

    img.src = src || '';

    return () => {
      img.onload = null;
    };
  }, [src]);

  return {
    image: result,
  };
};

export default useImage;
