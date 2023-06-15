import { AiOutlineHome } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
// import { Icon } from "react-icons";
import { Link, NavLink } from "react-router-dom";
import styles from "./menu.module.css";

const Menu = ({ user, setOpenRegister, setOpenLogin }) => {
  const links = [
    { name: "Home", route: "/", icon: AiOutlineHome },
    { name: "Explorar", route: "/tools", icon: BiHash },
    {
      name: "Notificaciones",
      route: "/",
      icon: IoIosNotificationsOutline,
    },
  ];

  const openModalRegister = () => setOpenRegister(true);
  const openModalLogin = () => setOpenLogin(true);

  return (
    <nav className={styles.nav}>
      <article className={styles.logo}>
        <Link to={"/"}>
          <img src="./logoDevConnect.png" alt="logo" />
        </Link>
      </article>

      <article>
        {links.map((link, index) => (
          <NavLink
            key={index}
            to={link.route}
            className={`${({ isActive, isPending }) =>
              isPending
                ? styles.linkPending
                : isActive
                ? styles.linkActive
                : ""} ${styles.link}`}
          >
            <link.icon size={24} /> <span> {link.name} </span>
          </NavLink>
        ))}
      </article>

      <article>
        {user ? (
          <section className={`${styles.user}`}>
            <p>{user}</p>
            <button className={`${styles.btn} ${styles.btnClose}`}>
              Cerrar sesion
            </button>
          </section>
        ) : (
          <section className={`${styles.user}`}>
            <button
              className={`${styles.btn} ${styles.btnLogin}`}
              onClick={openModalLogin}
            >
              Iniciar sesión
            </button>
            <button
              className={`${styles.btn} ${styles.btnRegister}`}
              onClick={openModalRegister}
            >
              Registrarse
            </button>
          </section>
        )}
      </article>
    </nav>
  );
};
export default Menu;
