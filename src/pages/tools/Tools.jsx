import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./tools.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import makeRequest from "../../utils/peticiones";
import ToolsBody from "../../components/toolBody/ToolsBody";
import FormCreate from "../../components/form/FormCreate";

const Tools = () => {
  const navigate = useNavigate();
  const [openRegister, setOpenRegister] = useState(false);

  const routes = [
    {
      nombre: "Sugeridas",
      route: "home",
    },
  ];

  // const userState = useSelector((store) => store.user);

  const handlePage = (ruta) => {
    navigate(`/tools?page=${ruta}`);
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await makeRequest("/tools");
        setData(response?.data);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.container}>
      {/* header */}
      <nav className={styles.nav}>
        {routes.map((item, index) => (
          <NavLink
            key={index}
            onClick={(e) => {
              e.preventDefault();
              handlePage(item.route);
            }}
            className={`${({ isActive, isPending }) =>
              isPending
                ? styles.linkPending
                : isActive
                ? styles.linkActive
                : ""} ${styles.link}`}
          >
            {item.nombre}
          </NavLink>
        ))}

        <section>
          <button
            className={styles.btn_add}
            onClick={() => setOpenRegister(true)}
          >
            agregar categoria
          </button>
          <button
            className={styles.btn_add}
            onClick={() => setOpenRegister(true)}
          >
            agregar herramienta
          </button>
        </section>
      </nav>

      <section>
        {openRegister && <FormCreate setOpenRegister={setOpenRegister} />}
        {loading && "cargando"}
        {/* {console.log(data)} */}
        {/* {data &&
          data.map((item, index) => (
            <article key={index} className={styles.container_item}>
              <h2 className={styles.item_title}>
                {Object.values(item)[0].category_name}
              </h2>
              <span className={styles.item_description}>
                {Object.values(item)[0].category_description}
              </span>
              <ToolsBody tools={Object.values(item)[0].category_tools} />
            </article>
          ))} */}
      </section>
    </section>
  );
};
export default Tools;
