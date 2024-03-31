const Fetch = () => {
  fetchData = async (endpoint, method, body, token) => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    const returnValue = {};
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.message };
      } else {
        return (returnValue = { ok: true, data });
      }
    }
  };

  return returnValue;
};

export default Fetch;
