import styles from "./register.module.css";
import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { handleNotification } from "../../utils/notifications";

const Register = ({ setOpenRegister }) => {
  const closeModal = () => setOpenRegister(false);

  const modal = useRef();

  const registerUser = (values, { setSubmitting }) => {

    axiosConfig
      .post("auth/register", { ...values })
      .then(({ data }) => {
        console.log("token", data.token);
        handleNotification(data.status_code, data.message);
      })
      .catch((err) => {
        console.log(err.response.data);
        handleNotification(
          err.response.data.status_code,
          err.response.data.message
        );
      });
    setSubmitting(false);
  };

  const userRegisterSchema = Yup.object().shape({
    user_name: Yup.string()
      .min(5, "Nombre usuario muy pequeño.")
      .required("El nombre de usuario es requerido."),
    user_lastname: Yup.string()
      .min(5, "Apellido muy pequeño.")
      .required("El apellido de usuario es requerido."),
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
            user_name: "",
            user_lastname: "",
            user_email: "",
            user_password: "",
          }}
          validationSchema={userRegisterSchema}
          onSubmit={registerUser}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              {/* name user */}
              <section className={styles.formItem}>
                <p>nombre: </p>
                <section className={styles.formField}>
                  <label htmlFor="user_name">
                    <AiOutlineUser />
                  </label>
                  <Field
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="Ingrese nombre"
                  />
                </section>
                <ErrorMessage
                  name="user_name"
                  component={"p"}
                  className={styles.textError}
                />
              </section>
              {/* name lastanme */}
              <section className={styles.formItem}>
                <p>apellido: </p>
                <section className={styles.formField}>
                  <label htmlFor="user_lastname">
                    <AiOutlineUser />
                  </label>
                  <Field
                    type="text"
                    name="user_lastname"
                    id="user_lastname"
                    placeholder="Ingrese su apellido"
                  />
                </section>
                <ErrorMessage
                  name="user_lastname"
                  component={"p"}
                  className={styles.textError}
                />
              </section>
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
                    placeholder="Ingrese su correo"
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
                    placeholder="Ingrese una contraseña"
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
                Registrarse
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer
          position="top-right"
          autoClose={300}
          limit={4}
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
export default Register;
