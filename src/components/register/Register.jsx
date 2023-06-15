import styles from "./register.module.css";
import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

const Register = ({ setOpenRegister }) => {
  const closeModal = () => setOpenRegister(false);

  const modal = useRef();

  const handleNotification = () =>
    toast.error("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 1,
      theme: "dark",
    });

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
            user_name: "",
            user_lastname: "",
            user_email: "",
            user_password: "",
          }}
          validationSchema={userRegisterSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
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
                  <Field type="text" name="user_lastname" id="user_lastname" />
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
                  <Field type="email" name="user_email" id="user_email" />
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
export default Register;
