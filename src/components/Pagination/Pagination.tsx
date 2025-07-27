import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import { ArrowLongRightIcon } from '@heroicons/react/16/solid';

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: Props) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={'flex items-center gap-2 self-end'}>
      <button
        className={
          'w-10 h-10 flex justify-center items-center cursor-pointer hover:shadow-md active:bg-stone-300 transition-colors disabled:opacity-50'
        }
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <ArrowLongLeftIcon height={24} width={24} />
      </button>
      <span className={'text-lg font-bold text-stone-400'}>{currentPage}</span>
      <span>/</span>
      <span className={'text-lg'}>{totalPages}</span>
      <button
        className={
          'w-10 h-10 flex justify-center items-center cursor-pointer hover:shadow-md active:bg-stone-300 transition-colors disabled:opacity-50'
        }
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <ArrowLongRightIcon height={24} width={24} />
      </button>
    </div>
  );
};
