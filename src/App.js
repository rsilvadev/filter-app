import { useEffect, useRef, useState } from "react";
import "./App.scss";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const iconNames = [
    "bi-cup-straw",
    "bi-bag",
    "bi-bar-chart",
    "bi-box",
    "bi-calendar",
    "bi-camera",
    "bi-cart",
    "bi-chat-text"
  ];
  const [showFilters, setShowFilters] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isCompleted, setIsCompleted] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const filterIconRef = useRef(null);

  const selectRandomIconName = () => {
    return iconNames[Math.floor(Math.random() * 8)];
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => (item.iconName = selectRandomIconName()));
        setData(json);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (filterIconRef.current) {
      if (showFilters) {
        filterIconRef.current.classList.remove("text-white", "text-dark");
        filterIconRef.current.classList.add("text-warning");
      } else {
        filterIconRef.current.classList.remove("text-warning");

        if (darkMode) {
          filterIconRef.current.classList.add("text-white");
        } else {
          filterIconRef.current.classList.add("text-dark");
        }
      }
    }
  }, [showFilters, darkMode]);

  return (
    <div className={`${darkMode ? "bg-dark" : "bg-white"}`}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-secondary" role="status"></div>
        </div>
      ) : (
        <div className="container">
          <div className="row pt-3 pb-3 ms-1 me-1">
            <div className="col-6">
              <h4 className={`${darkMode ? "text-white" : "text-dark"}`}>
                Simple Filter App
              </h4>
              <span className={`${darkMode ? "text-white" : "text-dark"}`}>
                Made using JSONPlaceholder API & Bootstrap
              </span>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <i
                className={`theme-mode-icon bi bi-funnel fs-4 text-center ${
                  darkMode ? "text-white" : "text-dark"
                } me-3`}
                onClick={() => setShowFilters((current) => !current)}
                ref={filterIconRef}
              ></i>
              <i
                className={`theme-mode-icon bi fs-4 text-center ${
                  darkMode
                    ? "bi-brightness-high text-white"
                    : "bi-moon text-dark"
                }`}
                onClick={() => setDarkMode((current) => !current)}
              ></i>
            </div>
          </div>
          {showFilters && (
            <div className="row pt-3 pb-3">
              <div
                className={`filter-container col d-flex flex-column ${
                  darkMode ? "bg-secondary text-white" : "bg-light text-dark"
                } p-4 ms-3 me-3`}
              >
                <span>Search Text</span>
                <input
                  type="text"
                  className={`form-control ${
                    darkMode ? "bg-secondary text-white" : "bg-white text-dark"
                  } mb-2`}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <span>Completed</span>
                <input
                  type="checkbox"
                  defaultChecked={isCompleted}
                  onChange={() => setIsCompleted((current) => !current)}
                />
              </div>
            </div>
          )}
          <div className="row pb-3">
            {data
              .filter(
                (item) =>
                  item.title.includes(searchText) &&
                  (isCompleted === null || item.completed === isCompleted)
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-1 p-3"
                >
                  <div
                    className={`item-container d-flex justify-content-center align-items-center flex-column shadow p-3 ${
                      darkMode ? "bg-secondary" : "bg-light"
                    } text-dark text-center`}
                  >
                    <i
                      className={`close-icon bi bi-x-lg text-dark`}
                      onClick={() => {
                        setData((current) =>
                          current.filter((i) => i.id !== item.id)
                        );
                      }}
                    ></i>
                    <div className="item-content w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                      <i className={`bi ${item.iconName} fs-1`}></i>
                      <span className="mt-1">{item.title}</span>
                      <div
                        className={`item-status-container w-100 pt-1 pb-1 ${
                          item.completed ? "bg-success" : "bg-danger"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
