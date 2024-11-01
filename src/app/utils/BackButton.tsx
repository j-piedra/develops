import { useRouter } from 'next/router';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()} 
      className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    >
      Back
    </button>
  );
};

export default BackButton;