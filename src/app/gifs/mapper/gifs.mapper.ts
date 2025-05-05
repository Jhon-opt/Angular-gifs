import { Gif } from "../interfaces/gif.interface";
import { GiphyItem } from "../interfaces/giphy.interface";


export class GifsMapper {
    static mapGiphyItemToGif(Item: GiphyItem):Gif{
      return {
      id :Item.id,
      title: Item.title,
      url:Item.images.original.url}
    }

    static mapGiphyItemsToGifsArray(items: GiphyItem[]): Gif[] {
      return items.map(this.mapGiphyItemToGif);

    }
}
