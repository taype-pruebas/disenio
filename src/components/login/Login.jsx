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
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/states/user";
import lowerCaseObject from "../../utils/lowerCaseObject";

const Login = ({ setOpenLogin }) => {
  // enviar info state
  const dispatccher = useDispatch();

  const closeModal = () => setOpenLogin(false);

  const formRef = useRef();
  const modal = useRef();

  const userLogin = (values, { setSubmitting }) => {
    let valueUser = lowerCaseObject(values);

    axiosConfig
      .post("auth/login", { ...valueUser })
      .then((response) => {
        handleNotification(response.data.status_code, response.data.message);
        const user = response.data.user;

        dispatccher(loginUser(user));
        console.log(response.data);

        formRef.current.reset();
        setSubmitting(false);

        // window.location.href = "/";
        // closeModal();
      })
      .catch((err) => {
        console.log("respuesta bad", err);
        console.log("respuesta bad", err?.response?.data);
        handleNotification(
          err?.response?.data.status_code,
          err?.response?.data.message
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

        // if (e.target == modal.current) {
        //   // console.log("fyerra el modal");
        //   closeModal();
        // }
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
            <Form className={styles.form} ref={formRef}>
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
          autoClose={2000}
          limit={4}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
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
