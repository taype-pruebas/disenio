import styles from "./toolBody.module.css";

const ToolsBody = ({ tools }) => {
  return (
    <section className={styles.container_tools}>
      {tools?.map((item, index) => (
        <section key={index} className={styles.tool}>
          <img src={item.tool_image} alt={item.tool_name} />
          <p>{item.tool_name}</p>
          <span>{item.tool_description}</span>
          <a href={item.tool_link} target="_blank" referrerPolicy="no-referrer">
            Visitar
          </a>
        </section>
      ))}
    </section>
  );
};
export default ToolsBody;
