import { useEffect, useState } from "react";
import Menu from "../../components/Menu/Menu";
import Register from "../../components/register/Register";
import styles from "./home.module.css";
import Login from "../../components/login/Login";
import { Outlet, useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <main className={styles.main}>
      {openRegister && <Register setOpenRegister={setOpenRegister} />}
      {openLogin && <Login setOpenLogin={setOpenLogin} />}

      {/* Menu */}
      <section className={styles.menu}>
        <Menu
          user={null}
          setOpenRegister={setOpenRegister}
          setOpenLogin={setOpenLogin}
        />
      </section>

      {/* content */}
      <section className={styles.content}>
        {path == "/" ? <h1>En elhome</h1> : <Outlet />}
      </section>

      {/* tendence */}
      <section className={styles.tendence}>tendence</section>
    </main>
  );
};
export default Home;
