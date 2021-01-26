//Es el prefijo para sintaxis que se utilizará, es decir, Javascritp
"use strict";

//Constante para el Modelo
const Alumno = use("App/Models/Alumno");

//Clase AlumnoController
class AlumnoController {
  //7.02.2020
  //Métodos asíncronos

  async index({ response }) {
    let alumnos = await Alumno.all();
    return response.json(alumnos);
  }

  async show({ params, response }) {
    const alumno = await Alumno.find(params.id);
    return response.json(alumno);
  }

  async store({ request, response }) {
    const alumnoInfo = request.only([
      "nombre",
      "apellido_materno",
      "apellido_paterno",
      "edad",
      "correo",
      "contraseña"
    ]);

    const alumno = new Alumno();
    alumno.nombre = alumnoInfo.nombre;
    alumno.apellido_materno = alumnoInfo.apellido_materno;
    alumno.apellido_paterno = alumnoInfo.apellido_paterno;
    alumno.edad = alumnoInfo.edad;
    alumno.correo = alumnoInfo.correo;
    alumno.contraseña = alumnoInfo.contraseña;

    await alumno.save();

    return response.status(201).json(alumno);
  }
  async update({ params, request, response }) {
    const alumnoInfo = request.only([
      "nombre",
      "apellido_materno",
      "apellido_paterno",
      "edad",
      "correo",
      "contraseña"
    ]);

    const alumno = await Alumno.find(params.id);
    if (!alumno) {
      return response.status(404).json({ data: "Resource not found" });
    }
    alumno.nombre = alumnoInfo.nombre;
    alumno.apellido_materno = alumnoInfo.apellido_materno;
    alumno.apellido_paterno = alumnoInfo.apellido_paterno;
    alumno.edad = alumnoInfo.edad;
    alumno.correo = alumnoInfo.correo;
    alumno.contraseña = alumnoInfo.contraseña;

    await alumno.save();

    return response.status(200).json(alumno);
  }

  async delete({ params, response }) {
    const alumno = await Alumno.find(params.id);
    if (!alumno) {
      return response.status(404).json({ data: "Resource not found" });
    }
    await alumno.delete();

    return response.status(204).json(null);
  }
}

module.exports = AlumnoController;
