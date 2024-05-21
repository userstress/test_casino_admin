import { useState } from "react";
import axiosInstance from "./CallAxios"; // axiosInstance를 임포트합니다.

/**
 * @example 요청 예시
 * POST 요청
 * sendRequest({
 * method: 'POST',
 * url: '/api/users', // 'http://178.12.12.12/api/users' 로 요청을 보냄
 * body: { key: 'value' },
 * headers: { Authorization: 'Bearer token' }});
 * @example
 * GET 요청
 * sendRequest({
 * method: 'GET',
 * headers: { Authorization: 'Bearer token' },});
 * @example
 * DELETE 요청
 * sendRequest({
 * method: 'DELETE',
 * headers: { Authorization: 'Bearer token' },});
 * @example
 * PATCH 요청
 * sendRequest({
 * method: 'PATCH',
 * body: { key: 'new value' },
 * headers: { Authorization: 'Bearer token' },});
 */
const useAxiosRequest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = (method, url, headers, body, onComplete) => {
    setLoading(true);

    axiosInstance({
      method,
      url,
      data: body,
      headers,
    })
      .then((response) => {
        setData(response);
        setError(null);
        if (onComplete) {
          onComplete(null, response); // if 문을 사용하여 콜백 호출
        }
      })
      .catch((err) => {
        setData(null);
        const status = err.response ? err.response.status : "unknown";
        setError(status);
        if (onComplete) {
          onComplete(status, null); // if 문을 사용하여 콜백 호출
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { sendRequest, data, loading, error };
};

export default useAxiosRequest;
