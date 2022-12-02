export interface JJBAData {
  "Stardust Crusaders": Stand[];
  "Diamond is Unbreakable": Stand[];
  "Vento Aureo": Stand[];
  "Stone Ocean": Stand[];
}

export interface Stand {
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