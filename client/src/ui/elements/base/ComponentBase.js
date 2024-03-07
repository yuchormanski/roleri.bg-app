// return (
//   <>
//     <div className={styles.container}></div>
//       <h3 className={styles.heading}>{lang.bookLesson}</h3>

//       <div className={styles.secondaryContainer}></div>
//     </div>
//   </>
// );

/////////////////

// const [fieldValues, setFieldValues] = useState(initialFieldsValues);
// function valueHandler(e) {
//   const valueName = e.target.name;
//   const value = e.target.value;
//   setFieldValues({ ...fieldValues, [valueName]: value });
// }
// <div className={styles.element}>
//   <input
//     className={styles.textInput}
//     type="text"
//     id="firstName"
//     name={"firstName"}
//     {...register("firstName", {
//       required: "First name is required",
//       maxLength: {
//         value: 20,
//         message: "First name can't be more than 20 characters long!",
//       },
//     })}
//     onBlur={valueHandler}
//     // autoComplete="given-name"
//     // autoComplete="family-name"
//   />
//   <label
//     htmlFor={"firstName"}
//     className={`${styles.label} ${
//       fieldValues.firstName ? styles.filled : null
//     }`}
//   >
//     {lang.firstName}
//   </label>
// </div>;
