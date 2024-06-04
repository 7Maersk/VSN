export default interface Album {
	id: number;
	name: string;
	katalog_number: string;
	release_date: string;
	country: {
		name: string;
	};
	rating: number;
	cover: string;
	artists: {
		nickname: string;
	}[];
	songs: {
		title: string;
		duration: number;
		position: string;
		extraartists: {
			id: number;
			artist: {
				nickname: string;
			};
		}[];
	}[];
	genres: {
		name: string;
	}[];
}
