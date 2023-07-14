import styles from "./form.module.css";
import lowerCaseObject from "../../utils/lowerCaseObject";
import { handleNotification } from "../../utils/notifications";
import * as Yup from "yup";
import { useRef } from "react";
import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axiosConfig from "../../utils/axiosConfig";
import { ToastContainer } from "react-toastify";

const FormCreate = ({ setOpenRegister }) => {
  const closeModal = () => setOpenRegister(false);

  const modal = useRef();

  const createCategory = (values, { setSubmitting }) => {
    let valueUser = lowerCaseObject(values);

    axiosConfig
      .post("categorys", { ...valueUser })
      .then(({ data }) => {
        handleNotification(200, "creado");
      })
      .catch((err) => {
        console.log(err);
        handleNotification(404, "error");
      });
    setSubmitting(false);
  };

  const categorySchema = Yup.object().shape({
    category_name: Yup.string()
      .min(5, "Nombre muy pequeño.")
      .required("El nombre de categoria es requerido."),
    category_description: Yup.string()
      .min(15, "descripcion muy pequeño.")
      .required("descripcion de usuario es requerido."),
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
          <p>Crea una nueva categoria</p>
        </section>

        {/* body modal */}
        <Formik
          initialValues={{
            category_name: "",
            category_description: "",
          }}
          validationSchema={categorySchema}
          onSubmit={createCategory}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              {/* name user */}
              <section className={styles.formItem}>
                <p>nombre: </p>
                <section className={styles.formField}>
                  <label htmlFor="category_name">
                    <AiOutlineUser />
                  </label>
                  <Field
                    type="text"
                    name="category_name"
                    id="category_name"
                    placeholder="Ingrese categoria"
                  />
                </section>
                <ErrorMessage
                  name="category_name"
                  component={"p"}
                  className={styles.textError}
                />
              </section>
              {/* name lastanme */}
              <section className={styles.formItem}>
                <p>descripcion: </p>
                <section className={styles.formField}>
                  <label htmlFor="category_description">
                    <AiOutlineUser />
                  </label>
                  <Field
                    type="text"
                    name="category_description"
                    id="category_description"
                    placeholder="Ingrese su descripcion"
                  />
                </section>
                <ErrorMessage
                  name="category_description"
                  component={"p"}
                  className={styles.textError}
                />
              </section>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.btnRegister}
              >
                Crear
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
export default FormCreate;
