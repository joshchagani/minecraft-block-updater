
export interface IBlock {
	_id: string;
	type: string;
	meta: string;
	name: string;
	textType: string;
	thumbnailUrl: string;
	hqImage: boolean;
	hqImageUrl?: string;
	expandable: boolean;
	credit?: string;
}
