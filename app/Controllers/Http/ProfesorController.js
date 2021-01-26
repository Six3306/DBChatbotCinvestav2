'use strict'

const Profesor = use('App/Models/Profesor')

class ProfesorController {
    async index ({response}) {
        let profesors = await Profesor.all()

        return response.json(profesors)
    }
    async show ({params, response}) {
        const profesor = await Profesor.find(params.id)
        return response.json(profesor)
    }

    async store ({request, response}) {
        const profesorInfo = request.only(['contraseña','nombre', 'apellido_materno', 'apellido_paterno', 'edad', 'correo'])

        const profesor = new Profesor()
        profesor.nombre = profesorInfo.nombre
        profesor.apellido_materno = profesorInfo.apellido_materno
        profesor.apellido_paterno = profesorInfo.apellido_paterno
        profesor.edad = profesorInfo.edad
        profesor.correo = profesorInfo.correo
        profesor.contraseña = profesorInfo.contraseña

        await profesor.save()

        return response.status(201).json(profesor)
      }
    async update ({params, request, response}) {
        const profesorInfo = request.only(['contraseña','nombre', 'apellido_materno', 'apellido_paterno', 'edad', 'correo'])


        const profesor = await Profesor.find(params.id)
        if (!profesor) {
        return response.status(404).json({data: 'Resource not found'})
        }
        profesor.nombre = profesorInfo.nombre
        profesor.apellido_materno = profesorInfo.apellido_materno
        profesor.apellido_paterno = profesorInfo.apellido_paterno
        profesor.edad = profesorInfo.edad
        profesor.correo = profesorInfo.correo
        profesor.contraseña = profesorInfo.contraseña


        await profesor.save()

        return response.status(200).json(profesor)
    }

    async delete ({params, response}) {
        const profesor = await Profesor.find(params.id)
        if (!profesor) {
        return response.status(404).json({data: 'Resource not found'})
        }
        await profesor.delete()

        return response.status(204).json(null)
    }
}

module.exports = ProfesorController
