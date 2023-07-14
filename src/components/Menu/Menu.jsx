import { AiOutlineHome } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { IoIosNotificationsOutline } from "react-icons/io";
// import { Icon } from "react-icons";
import { Link, NavLink } from "react-router-dom";
import styles from "./menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/states/user";

const Menu = ({ user, setOpenRegister, setOpenLogin }) => {
  const dispatcher = useDispatch();
  const userState = useSelector((store) => store.user);

  const links = [
    { name: "Home", route: "/", icon: AiOutlineHome },
    { name: "Explorar", route: "/tools", icon: BiHash },
    {
      name: "Notificaciones",
      route: "/",
      icon: IoIosNotificationsOutline,
    },
  ];

  const logout = () => {
    dispatcher(logoutUser());
  };

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
        {userState && userState.user_name ? (
          <section className={`${styles.user}`}>
            <p>{userState.user_name}</p>
            <button
              className={`${styles.btn} ${styles.btnClose}`}
              onClick={logout}
            >
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
