import axios from "axios";
import jsSHA from "jssha";

const baseURL = "http://ogala.ga:1111/log";
// const tdxURL = "https://ptx.transportdata.tw/MOTC/v2/Bus/";
// `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/NearBy?$spatialFilter=nearby(${latitude},${longitude},800)&$format=JSON`,

export default {
  log(data) {
    console.log(data);
    return axios.post(baseURL, data).catch(() => {});
  },
  getAuthorizationHeader() {
    let AppID = "69121a1d8f714a5faa4f54c512bb459e";
    let AppKey = "nYALaDjx1Au-PYCnZOnL-InFIZI";

    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
    return { Authorization: Authorization, "X-Date": GMTString };
  }
};
