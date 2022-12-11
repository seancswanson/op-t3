export interface JJBAData {
  "data": Stand[];
}

export interface Stand {
  id: number;
  reference_url: string;
  season: string;
  type: string[];
  stand: string;
  stand_ja: string;
  stand_images: string[];
  user: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  user_images: string[];
}

export interface FormattedStand {
  id: number;
  reference_url: string;
  season: string;
  type_0: string;
  type_1?: string;
  type_2?: string;
  type_3?: string;
  name: string;
  name_jp: string;
  stand_image_0: string;
  stand_image_1?: string;
  stand_image_2?: string;
  stand_image_3?: string;
  user: string;
  gender: string;
  hair_color: string;
  eye_color: string;
  user_image_0: string;
  user_image_1?: string;
  user_image_2?: string;
  user_image_3?: string;
}