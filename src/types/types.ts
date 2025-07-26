export type Artwork = {
  artist_title: string;
  artwork_type_title: string;
  category_titles: string[];
  date_display: string;
  description: string;
  dimensions: string;
  gallery_title: string;
  id: number;
  image_id: string;
  medium_display: string;
  place_of_origin: string;
  short_description: string;
  title: string;
};

export type RequestParams = {
  fields?: string;
  from?: number;
  limit?: number;
  page?: number;
  q?: string;
  size?: number;
};

export type ResponseType = {
  data: Artwork[];
  pagination: {
    current_page: number;
    limit: number;
    next_url: string;
    offset: number;
    total: number;
    total_pages: number;
  };
};
