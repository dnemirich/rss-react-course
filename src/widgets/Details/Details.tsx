import { ArrowPathIcon } from '@heroicons/react/20/solid';
import { useFetchArtworkByIdQuery } from 'entities/artwork';
import { useSearchParams } from 'react-router-dom';
import { fieldsListLong } from 'shared/constants/items-constants.ts';
import { Loader } from 'shared/ui/Loader';

export const Details = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details') || '';

  const { data, error, isFetching, isLoading, refetch } =
    useFetchArtworkByIdQuery({
      fields: fieldsListLong.join(','),
      id: detailsId,
    });

  const artwork = data?.data;

  const onClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  return (
    <div className="w-[360px] h-full bg-stone-50 dark:bg-stone-600 border-l border-stone-300 p-8 relative">
      <div className="flex justify-between items-center">
        <button className="mb-4 cursor-pointer" onClick={onClose}>
          Close
        </button>
        <button className="mb-4" disabled={isFetching} onClick={refetch}>
          <ArrowPathIcon
            className={'hover:text-lime-600 transition-colors'}
            height={20}
            width={20}
          />
        </button>
      </div>
      {(isLoading || isFetching) && <Loader />}
      {error && <div className="min-w-[360px] p-8">{String(error)}</div>}
      {!isFetching && !isLoading && !error && artwork && (
        <div>
          <div className={'absolute top-2 right-2 text-lime-600 text-md'}>
            {artwork.artwork_type_title}
          </div>
          <div className={'mb-4'}>
            <div className="text-lg font-bold">{artwork.title}</div>
            <div className="italic">{artwork.artist_title}</div>
            <div className="text-sm text-stone-500">
              {artwork.date_display}, {artwork.place_of_origin}
            </div>
          </div>
          <div>
            <div>
              <span className={'font-bold'}>Dimensions: </span>
              {artwork.dimensions || '-'}
            </div>
            <div>
              <span className={'font-bold'}>Materials: </span>
              {artwork.medium_display}
            </div>
            <div
              className={'my-3'}
              dangerouslySetInnerHTML={{ __html: artwork.description || '' }}
            />
            <div className={'flex gap-1 flex-wrap'}>
              {artwork.category_titles.map((item, index) => (
                <span
                  className={
                    'rounded-sm bg-stone-300 dark:bg-stone-400 p-1 text-sm'
                  }
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
