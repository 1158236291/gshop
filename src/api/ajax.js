import axios from "axios";

export default function ajax(url = "", data = {}, type = "GET") {
  return new Promise(function (resolve, reject) {
    let promise;

    if (type === "GET") {
      let str = "";

      Object.keys(data).forEach((key) => {
        str += key + "=" + data[key] + "&";
      });
      if (str !== "") {
        str = str.substring(0, str.lastIndexOf("&"));

        url = url + "?" + str;
      }

      promise = axios.get(url);
    } else {
      promise = axios.post(url, data);
    }

    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
