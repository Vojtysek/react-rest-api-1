import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const maxSize = 30;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setInterval(() => {
      axios
        .get("https://api.golemio.cz/v2/gtfs/routes?limit=25&offset=0", {
          headers: {
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9qdGFAcG9zdC5jeiIsImlkIjoxNjQwLCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NzQ0NzQ2NTEsImV4cCI6MTE2NzQ0NzQ2NTEsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIyZDZmZGViYS0zZmZhLTRhZWQtYTc4NS03NjU3Yjc1NDIyMTYifQ.43Ta_ATiwxGda3ocXcY0kJowwbuIqFmfnRRbEc00AT8",
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-3 gap-1 mx-auto h-screen overflow-y-auto">
          {[...Array(maxSize)].map((_, index) => (
            <div
              key={index}
              className="w-full h-24 border-2 rounded-md animate-pulse bg-slate-300"
            />
          ))}
        </div>
      ) : (
        <div className="w-scree h-screen p-10 ">
          <div className="grid grid-cols-3 gap-4 mx-auto h-screen">
            {data.map((item: any) => (
              <div
                key={item.route_id}
                className="w-full h-24 border-4 shadow-lg bg-white rounded-md"
                style={{ borderColor: `#${item.route_color}` }}
              >
                <div className="flex flex-row items-center h-full justify-center space-x-5 p-3">
                  <div className="flex flex-col space-y-3">
                    <div
                      className="text-center font-bold"
                      style={{ color: `#${item.route_color}` }}
                    >
                      {item.route_long_name}
                    </div>
                    <div
                      className="text-center font-bold"
                      style={{ color: `#${item.route_color}` }}
                    >
                      {item.route_short_name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
