import { type Artwork, fetchArtworkById } from 'entities/artwork';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fieldsListLong } from 'shared/constants/items-constants.ts';
import { Loader } from 'shared/ui/Loader';

export const Details = () => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  const { detailsId = '', page = '1' } = useParams<{
    detailsId?: string;
    page?: string;
  }>();

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    fetchArtworkById(detailsId, fieldsListLong.join(','))
      .then((data) => {
        if (!ignore) setArtwork(data.data);
      })
      .catch((err) => {
        if (!ignore) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [detailsId]);

  if (!artwork) return null;

  const onClose = () => {
    navigate(`/${page}`);
  };

  return (
    <div className="w-[360px] h-full bg-stone-50 dark:bg-stone-600 border-l border-stone-300 p-8 relative">
      <button className="mb-4 cursor-pointer" onClick={onClose}>
        Close
      </button>
      {loading && <Loader />}
      {error && <div className="min-w-[360px] p-8">{error}</div>}
      {!loading && !error && (
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
