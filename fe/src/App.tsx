import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoCreateSharp } from "react-icons/io5";
import moment from "moment";

const App = () => {
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<{}>({});

  const [toggle, setToggle] = useState<boolean>(false);

  const [parent, enableAnimations] = useAutoAnimate();

  const onToggle = () => {
    setToggle(!toggle);
  };

  const fetchData = () => {
    const url: string = "http://localhost:4499/api/get";

    fetch(url, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res?.data);
      });
  };

  const updateProgressData = () => {
    const url: string = "http://localhost:4499/api/get";

    fetch(url, { method: "PATCH" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res?.data);
      });
  };

  const createTask = () => {
    const url: string = "http://localhost:4499/api/create/";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: text }),
    }).then(() => {
      window.location.reload();
    });
  };

  let title = Object.keys(data);
  let values = Object.values(data);

  console.log(values);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" flex flex-col relative">
      {toggle && (
        <div className="absolute  flex flex-col top-0 w-full h-screen items-center justify-center backdrop-blur-sm z-10">
          <input
            className="w-[300px] border h-[40px] p-2"
            placeholder="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="bg-blue-950 w-[300px] border h-[40px] p-2 text-white mt-3 mb-10"
            onClick={() => {
              createTask();
              setText("");
              onToggle();
            }}
          >
            add
          </button>
        </div>
      )}
      <div className="m-8 border rounded-md w-[1000px] p-4">
        <div className="flex gap-3">
          {title?.map((props: string) => (
            <div
              key={props}
              className="border rounded-md p-4 w-[300px] flex items-center justify-between"
            >
              <span className="capitalize font-semibold tracking-widest">
                {props}
              </span>

              {props === "task" && (
                <IoCreateSharp
                  className="cursor-pointer text-[25px]"
                  onClick={onToggle}
                />
              )}
            </div>
          ))}
        </div>

        <div ref={parent} className="mt-6 flex gap-3">
          {values?.map((el: any) => (
            <div>
              {el?.map((props: any) => (
                <main className="border my-2 rounded-md w-[300px] p-2">
                  <p className="text-[18px] font-bold mb-1 capitalize">
                    {props.title}
                  </p>
                  <p className="text-[12px] text-gray-600 capitalize">
                    {moment(props.createdAt).fromNow()}
                  </p>

                  <div className="flex justify-end">
                    <button
                      className={`py-1 px-8 ${
                        props.progress && props.done
                          ? "bg-green-500"
                          : props.progress
                          ? "bg-orange-500"
                          : "bg-red-500"
                      } text-white rounded-sm cursor-pointer text-[12px] font-semibold tracking-widest`}
                    >
                      {props.progress && props.done
                        ? "completed"
                        : props.progress
                        ? "in progress"
                        : "start"}
                    </button>
                  </div>
                </main>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
