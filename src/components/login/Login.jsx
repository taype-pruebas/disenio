import styles from "./login.module.css";

import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { handleNotification } from "../../utils/notifications";
import axiosConfig from "../../utils/axiosConfig";

const Login = ({ setOpenLogin }) => {
  const closeModal = () => setOpenLogin(false);

  const modal = useRef();

  const userLogin = (values, { setSubmitting }) => {
    axiosConfig
      .post("auth/login", { ...values })
      .then(({ data }) => {
        handleNotification(data.status_code, data.message);
        setSubmitting(false);
        // closeModal();
      })
      .catch((err) => {
        console.log(err.response.data);
        handleNotification(
          err.response.data.status_code,
          err.response.data.message
        );

        setSubmitting(false);
      });
  };

  const userRegisterSchema = Yup.object().shape({
    user_email: Yup.string()
      .email("Ingresar un email válido.")
      .required("El email de usuario es requerido."),
    user_password: Yup.string()
      .min(5, "Contraseña muy pequeño.")
      .required("La contraseña es requerida."),
  });

  return (
    <article
      className={styles.container}
      ref={modal}
      onClick={(e) => {
        e.stopPropagation();

        if (e.target == modal.current) {
          // console.log("fyerra el modal");
          closeModal();
        }
      }}
    >
      <section className={styles.containerLogin}>
        <AiFillCloseCircle
          className={styles.iconClose}
          color="black"
          onClick={closeModal}
          style={{ cursor: "pointer" }}
        />

        {/* header modal */}
        <section className={styles.header}>
          <h1>Dev Connect</h1>
          <p>Es el momento de unirte - crea tus credenciales</p>
        </section>

        {/* body modal */}
        <Formik
          initialValues={{
            user_email: "",
            user_password: "",
          }}
          validationSchema={userRegisterSchema}
          onSubmit={userLogin}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              {/* user email */}
              <section className={styles.formItem}>
                <p>Correo: </p>
                <section className={styles.formField}>
                  <label htmlFor="user_email">
                    <MdAlternateEmail />
                  </label>
                  <Field
                    type="email"
                    name="user_email"
                    id="user_email"
                    placeholder="Ingrese su contraseña"
                  />
                </section>
                <ErrorMessage
                  name="user_email"
                  component={"p"}
                  className={styles.textError}
                />
              </section>
              {/* user password */}
              <section className={styles.formItem}>
                <p>Contraseña: </p>
                <section className={styles.formField}>
                  <label htmlFor="user_password">
                    <FaKey />
                  </label>
                  <Field
                    type="password"
                    name="user_password"
                    id="user_password"
                    placeholder="Ingrese su contraseña"
                  />
                </section>
                <ErrorMessage
                  name="user_password"
                  component={"p"}
                  className={styles.textError}
                />
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.btnRegister}
              >
                Iniciar sesión
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </section>
    </article>
  );
};
export default Login;
