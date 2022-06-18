import axios from "axios";

export async function getDetails(gh, gl, tw) {
  return await axios.get(`api/details?github=${gh}&gitlab=${gl}&twitter=${tw}`);
}
