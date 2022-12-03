import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31796661-d78e1c08e6ba05d0253f19feb';
const PARAMS = '&orientation=horizontal&image_type=photo&safesearch=true';

export class PictureAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.amountOfElements = 40;
  }

  async getPicture() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.amountOfElements}${PARAMS}`
      );
      this.addPage();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  addPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
