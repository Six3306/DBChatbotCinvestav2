"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
    return { greeting: "API Base de Datos Chatbot  Cinvestav corriendo al 100%" };
});

// 7.02.2020
//Se introduce las rutas de cómo se harán las llamadas a la API
//Se debe tener cuidado con el orden en el que se ponen las rutas
// Group es para agrupar las rutas al método
Route.group(() => {
    Route.post("users", "UserController.store");
    Route.get("users", "UserController.index");
    Route.get("usersActivated", "UserController.getStudentsActivated");
    Route.get("users/:id", "UserController.show");
    Route.put("users/:id", "UserController.update");
    Route.delete("users/:id", "UserController.delete");
    Route.get("usersNotLesson", "UserController.studentsNotLesson");
    Route.get("getProfesors", "UserController.getProfesors"); //obtenemos solo profesores de los usuarios
    Route.get("usersVerifyEmail/:email", "UserController.verifyEmail");

    Route.post("lessons", "LessonController.store");
    Route.get("lessons", "LessonController.index");
    Route.get("lessonsByID", "LessonController.getByGrade");
    Route.get("lessonsGroupGrade", "LessonController.getByGradeAndGroup");
    Route.get("lessons/:id", "LessonController.show");
    Route.put("lessons/:id", "LessonController.update");
    Route.delete("lessons/:id", "LessonController.delete");
    Route.delete("lessonsIdUser/:id", "LessonController.deleteByIdUser");

    Route.post("subjects", "SubjectController.store");
    Route.get("subjects", "SubjectController.index");
    Route.get("subjects/:id", "SubjectController.show");
    Route.get("subjectsByProfesor/:id", "SubjectController.getByProfesor"); /////////
    Route.put("subjects/:id", "SubjectController.update");
    Route.delete("subjects/:id", "SubjectController.delete");
    Route.get("getSubjectsByGradeProfesor", "SubjectController.getByGradeandProfesor");

    Route.get("subjectsGrade", "SubjectController.getByGrade");

    Route.post("login", "UserController.login");

    Route.post("profesors", "ProfesorController.store");
    Route.get("profesors", "ProfesorController.index");
    Route.get("profesors/:id", "ProfesorController.show");
    Route.put("profesors/:id", "ProfesorController.update");
    Route.delete("profesors/:id", "ProfesorController.delete");

    Route.post("alumnos", "AlumnoController.store");
    Route.get("alumnos", "AlumnoController.index");
    Route.get("alumnos/:id", "AlumnoController.show");
    Route.put("alumnos/:id", "AlumnoController.update");
    Route.delete("alumnos/:id", "AlumnoController.delete");

    Route.post("scores", "ScoreController.store");
    Route.put("scores/:id", "ScoreController.updateScore");
    Route.get("getScoresByAlumn", "ScoreController.getScoresByAlumn");


}).prefix("api/v2");