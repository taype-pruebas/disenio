import { useState } from "react";
import Menu from "../../components/Menu/Menu";
import Register from "../../components/register/Register";
import styles from "./home.module.css";
import Login from "../../components/login/Login";

const Home = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

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
      <section className={styles.content}>Aqui va el foro</section>

      {/* tendence */}
      <section className={styles.tendence}>tendence</section>
    </main>
  );
};
export default Home;
