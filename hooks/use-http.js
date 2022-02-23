import { useCallback, useState } from "react";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const useHttp = () => {
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(null);

  const AJAX = useCallback(async function (url, uploadData = undefined) {
    try {
      setLoad(true);
      setErr(null);
      const fetchPro = uploadData
        ? fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(uploadData),
          })
        : fetch(url);
      const res = await Promise.race([fetchPro, timeout(12)]);
      setLoad(false);
      if (!res.ok) throw new Error("Some thing wrong!!! Please try again");
      const data = await res.json();
      return data;
    } catch (err) {
      setErr(err.message);
      setLoad(false);
      throw err;
    }
  }, []);
  return {
    load,
    err,
    AJAX,
  };
};

export default useHttp;
