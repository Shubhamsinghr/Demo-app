import { host } from "../shared/constants";
import axios from 'axios';

class DealerService {
	async getDealers(AccessToken, SearchString) {
		let url = `${host}/api/Dealer`;
		let body = {
			accessToken: AccessToken,
			searchString: SearchString
		}
		return await axios.post(url, body)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			})
	}
}

export default new DealerService();