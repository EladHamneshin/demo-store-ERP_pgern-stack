interface Window {
  _BASE_URL_: string;
}
const url = (window as unknown as Window)._BASE_URL_;
export const BASE_URL =  url !== "BASE_URL_PLACEHOLDER" ? url : "http://localhost:5000";
