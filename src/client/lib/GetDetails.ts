import axios from "axios";

export async function getDetails({ github, gitlab, twitter }) {
  let callString = `api/details`;

  if (github) {
    callString += `?github=${github}`;
  }

  if (gitlab) {
    callString += `&gitlab=${gitlab}`;
  }

  if (twitter) {
    callString += `&twitter=${twitter}`;
  }

  return await axios.get(callString);
}
