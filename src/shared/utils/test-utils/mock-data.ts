import type { Artwork, RequestParams, ResponseType } from 'entities/artwork';

export const mockSearchData: Artwork[] = [
  {
    artist_title: 'Dr. Jeannette Dean Throckmorton',
    artwork_type_title: 'Textile',
    category_titles: ['Textiles', 'Women artists'],
    date_display: 'c. 1950',
    description: 'Some description',
    dimensions: '224.6 x 172.7 cm',
    id: 123,
    image_id: '2198091289021hkj',
    medium_display:
      'Appliqued and embroidered quilt; dyed and undyed cotton plain weave fabrics; cotton embroidery threads; graphite pencil pattern outlines',
    place_of_origin: 'Iowa',
    title: 'State Birds and Flowers Quilt',
  },
  {
    artist_title: 'Katsuda Yukio',
    artwork_type_title: 'Print',
    category_titles: ['Arts of Asia'],
    date_display: '1981',
    description: null,
    dimensions: null,
    id: 197508,
    image_id: '65d9b58d-ec3f-a680-b83f-96acc70b397e',
    medium_display: 'Color woodblock print',
    place_of_origin: 'Japan',
    title: 'Sunflower',
  },
  {
    artist_title: 'Georges Lemmen',
    artwork_type_title: 'Drawing and Watercolor',
    category_titles: ['Prints and Drawings'],
    date_display: 'August 20, 1895',
    description: null,
    dimensions: '61.5 x 47 cm',
    id: 35720,
    image_id: '461c0069-45a9-c67e-7210-bfb512c3ea58',
    medium_display: 'Watercolor, with pen and ink, on paper',
    place_of_origin: 'Belgium',
    title: 'Sunflowers',
  },
];

export const mockArtworkData: Artwork[] = [
  ...mockSearchData,
  {
    artist_title: 'Camille Pissarro',
    artwork_type_title: 'Painting',
    category_titles: ['Painting and Sculpture of Europe'],
    date_display: '1866',
    description: 'long description',
    dimensions: '91.8 x 150.2 cm',
    id: 6005,
    image_id: '3d950ecc-73f4-c28a-f216-0940b23fa5e8',
    medium_display: 'Oil on canvas',
    place_of_origin: 'France',
    title: 'The Banks of the Marne in Winter',
  },
  {
    artist_title: 'Ancient Greek',
    artwork_type_title: 'Vessel',
    category_titles: ['Arts of Greece, Rome, and Byzantium'],
    date_display: '410-400 BCE',
    description: 'long description',
    dimensions: '9.2 x 22.5 x 16.2 cm',
    id: 161,
    image_id: '1bc27523-6b27-d9b1-4ea0-ec436d6fd95e',
    medium_display: 'terracotta, black-glaze with impressed decoration',
    place_of_origin: 'Cales',
    title: 'Skyphos (Drinking Cup)',
  },
  {
    artist_title: 'Fran\u00e7ois Boucher',
    artwork_type_title: 'Drawing and Watercolor',
    category_titles: ['Prints and Drawings'],
    date_display: 'c. 1740-1760',
    description: null,
    dimensions: '31.9 x 24.8 cm',
    id: 12216,
    image_id: null,
    medium_display:
      'Pen and brown ink and brush and brown wash, with brush and red chalk wash, over traces of black chalk, on oval-shaped cream laid paper, laid down on ivory laid paper',
    place_of_origin: 'France',
    title: 'Cupid and Psyche: Design for a Ceiling',
  },
];

export const mockDetailedArtworkData: Artwork = {
  artist_title: 'Claude Monet',
  artwork_type_title: 'Painting',
  category_titles: ['Painting and Sculpture of Europe', 'Essentials'],
  date_display: '1906',
  description: `"One instant, one aspect of nature contains it all," said Claude Monet, referring to his late masterpieces, the water landscapes that he produced at his home in Giverny between 1897 and his death in 1926. These works replaced the varied contemporary subjects he had painted from the 1870s through the 1890s with a single, timeless motif — water lilies. The focal point of these paintings was the artist's beloved flower garden, which featured a water garden and a smaller pond spanned by a Japanese footbridge. In his first water-lily series (1897–99), Monet painted the pond environment, with its plants, bridge, and trees neatly divided by a fixed horizon. Over time, the artist became less and less concerned with conventional pictorial space. By the time he painted Water Lilies, which comes from his third group of these works, he had dispensed with the horizon line altogether. In this spatially ambiguous canvas, the artist looked down, focusing solely on the surface of the pond, with its cluster of vegetation floating amid the reflection of sky and trees. Monet thus created the image of a horizontal surface on a vertical one.`,
  dimensions:
    '89.9 x 94.1 cm (35 3/8 x 37 1/16 in.); Framed: 103.2 x 107 x 5.8 cm (40 5/8 x 42 1/8 x 2 1/4 in.)',
  id: 16568,
  image_id: '3c27b499-af56-f0d5-93b5-a7f2f1ad5813',
  medium_display: 'Oil on canvas',
  place_of_origin: 'France',
  title: 'Water Lilies',
};

export const mockParams: RequestParams = {
  fields:
    'id,title,image_id,date_display,artist_title,place_of_origin,description,dimensions,medium_display,artwork_type_title,category_titles',
  page: 1,
  size: 3,
};

export const mockParamsWithSearch: RequestParams = {
  ...mockParams,
  q: 'sunflower',
};

export const mockGeneralResponse: ResponseType = {
  data: mockArtworkData,
  pagination: {
    current_page: 1,
    limit: 6,
    offset: 0,
    total: 129355,
    total_pages: 10780,
  },
};

export const mockSearchResponse: ResponseType = {
  data: mockSearchData,
  pagination: {
    current_page: 1,
    limit: 3,
    offset: 0,
    total: 35,
    total_pages: 1,
  },
};
