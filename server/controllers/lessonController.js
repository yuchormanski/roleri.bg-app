import { Router } from "express";

import { lessonCreateSchema } from "../util/validationSchemes.js";
import { getAllLessons } from "../services/lessonService.js";

const lessonController = Router();

lessonController.get("/", async (req, res, next) => {
  try {
    // const allLessons = [
    //   {
    //     _id: 1,
    //     imageUrl:
    //       "https://roleri.bg/wp-content/uploads/2015/10/beginers_group_winter.jpg",
    //     title: "Група напреднали &/& Group advanced",
    //     titleInfo: "С фиксиран ден и час &/& With fixed day or hour",
    //     age: "4-99",
    //     skills: " Правилна стойка, Контрол &/& Correct position, Control",
    //     participants: " 1 до 7 &/& 1 to 7",
    //     type: " Един или Абонамент &/& One time or Schedule",
    //     count: " 1 или 4 *(+2) &/& 1 or 4 *(+2)",
    //     location: "на открито / в зала &/& Outside / Indoor",
    //     price: "40.00 лева",
    //     geoLocation: { lat: "", lon: "" },
    //     description: "С урока за напреднали можеш да подобриш техниката си.",
    //   },
    //   {
    //     _id: 2,
    //     imageUrl:
    //       "https://roleri.bg/wp-content/uploads/2015/10/advanced_group_winter-300x235.jpg",
    //     title: "Група напреднали &/& Group advanced",
    //     titleInfo: "С фиксиран ден и час &/& With fixed day or hour",
    //     age: "4-99",
    //     skills: " Правилна стойка, Контрол &/& Correct position, Control",
    //     participants: " 1 до 7 &/& 1 to 7",
    //     type: " Един или Абонамент &/& One time or Schedule",
    //     count: " 1 или 4 *(+2) &/& 1 or 4 *(+2)",
    //     location: "на открито / в зала &/& Outside / Indoor",
    //     price: "40.00 лева",
    //     geoLocation: { lat: "", lon: "" },
    //     description:
    //       "Урок в който ще научите правилната стойка и как да контролирате скороста си.",
    //   },
    // ];

    const allLessons = await getAllLessons();

    res.status(200).json(allLessons);
  } catch (error) {
    next(error);
  }
});

export { lessonController };
