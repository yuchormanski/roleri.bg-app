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
// </div>

// SELECT

{
  /* <div className={styles.element}>
<select
  name="groupAge"
  id={`groupAge`}
  className={styles.select}
  defaultValue=""
  {...register("groupAge", {
    required: "Age is required",
  })}
  onBlur={(e) => {
    valueHandler(e), ageHandler(e);
  }}
>
  <option value="" disabled hidden></option>
  {data.groupsAgeData.map((age) => (
    <option value={age._id} key={age._id}>
      {age.typeGroup}
    </option>
  ))}
</select>
<label
  htmlFor={`groupAge`}
  className={`${styles.selectLabel} ${
    fieldValues.groupAge ? styles.filled : null
  }`}
>
  <span>{lang.ageGroup}</span>
</label>
</div> */
}

{
  /*TEXTAREA*/
}
// <div className={styles.element}>
//   <textarea
//     className={styles.textarea}
//     type="text"
//     id="additionalRequirements"
//     name="additionalRequirements"
//     {...register("additionalRequirements", {
//       maxLength: {
//         value: 300,
//         message:
//           "Additional requirement can't be more than 300 characters long!",
//       },
//     })}
//     rows={3}
//     onBlur={valueHandler}
//   />
//   <label
//     htmlFor={"additionalRequirements"}
//     className={`${styles.label} ${
//       fieldValues.additionalRequirements ? styles.filled : null
//     }`}
//   >
//     {lang.requirements}
//   </label>
// </div>

// инфо

// import { GoIssueOpened } from "react-icons/go";

// <section className={styles.description}>
//   <p className={styles.info}>
//     <span>
//       <GoIssueOpened />
//     </span>
//     To create an instructor select him from the list and change his role
//   </p>
// </section>;

// .description {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     margin-top: 2rem;
//   }

//   .info {
//     width: 100%;
//     font-size: 1.6rem;
//   }
//   .info span {
//     font-size: 1.6rem;
//     color: var(--color-main-btn);
//     margin-right: 1rem;
//   }
