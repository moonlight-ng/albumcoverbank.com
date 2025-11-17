export interface Cover {
  album: string;
  imageUrl: string;
  year: number;
  musicArtistName: string;
  musicArtistUrl: string;
  coverArtistName: string;
  coverArtistUrl: string;
  sourceUrl: string;
}

export interface ApiRecord {
  Album: string;
  Image: Array<{ signedUrl: string }>;
  Source: string;
  Year: string;
  "Name (from Music Artists)": string[];
  "Website (from Music Artists)": string[];
  "Name (from Cover Artists)": string[];
  "Website (from Cover Artists)": string[];
}

export interface ApiCoversResponse {
  records: ApiRecord[];
  offset: string | null;
}

export interface CoversResponse {
  records: Cover[];
  offset: string | null;
}

export interface FetchCoversParams {
  offset?: number;
  limit?: number;
  searchTerm?: string;
}
