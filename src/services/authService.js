import { host } from "../shared/constants";
import axios from 'axios';

class AuthService {
	async getToken() {
		let url = `${host}/api/Dealer`;
		return await axios.get(url)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				return err;
			})
	}
}

export default new AuthService();