import axios from "axios";

export async function getDetails({ github, gitlab, twitter }) {
  let callString = `api/details?`;
  let accountCount = 0;

  if (github) {
    if (accountCount > 0) {
      callString += `&`;
    }
    callString += `github=${github}`;
    accountCount += 1;
  }

  if (gitlab) {
    if (accountCount > 0) {
      callString += `&`;
    }
    callString += `gitlab=${gitlab}`;
    accountCount += 1;
  }

  if (twitter) {
    if (accountCount > 0) {
      callString += `&`;
    }
    callString += `twitter=${twitter}`;
    accountCount += 1;
  }

  return await axios.get(callString);
}
