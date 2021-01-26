# API-CHATBOT-BASEDEDATOS 

## Introducción

El objetivo primario de este chatbot es servir como herramienta extra-escolar y, al mismo tiempo, como guía en la interacción entre profesores y alumnos, asesorándolos, dándoles seguimiento y facilitando la comunicación entre ellos. De estamanera, los alumnos podrían expresarse más libremente, pues el chatbot funge como intermediario con sus profesores y demás personal involucrado en dicho proceso, como trabajadores sociales, psicólogos, pedagogos, prefectos y directivos. De esta manera el profesor y los estudiantes refuerzan los procesos de enseñanza aprendizaje en diversos temas educativos.

El proyecto Chatbot Cinvestav 1.0, está dirigido por la Dra. Sonia Mendoza Chapa y el Dr. José Rodríguez García investigadores en el Departamento de Computación del Centro de Investigación y de Estudios Avanzados del IPN. Actualmente, el M. en C. José Fidel Urquiza Yllescas es el encargado del desarrollo, diseño, actualización y mantenimiento del software iniciado por el Ing. Luis Alejandro Pérez Sarmiento. Se espera a que se integren estudiantes de servicio social y de posgrado en los siguientes meses para el fortalecimiento de este proyecto.

## Requerimientos

Para el correcto funcionamiento se necesita:
- [npm](https://www.npmjs.com/) es un sistema de gestión de paquetes, desarrollado en el lenguaje de programación Javascript, por defecto para Node.js. Se utiliza principalmente para instalar bibliotecas de manera sencilla que permite administrar nuestros módulos, distribuir paquetes y agregar dependencias a nuestros proyectos. Cabe señalar que npm va en combinación con Node.js.
- [Node.js](https://nodejs.org) es un entorno de ejecución para el lenguaje de programación JavaScript. Permite crear aplicaciones web escalables de una manera sencilla.
- [AdonisJs](https://adonisjs.com/) es un entorno de trabajo enfocado al desarrollo web. Se basa principalmente en Node.js y utiliza el patrón de diseño MVC. Por lo que proporciona desarrollo y pruebas sencillas. Cabe destacar que una utilidad importante es que se pueden desarrollar Interfaces de Programación de Aplicaciones (API) lo que facilita la interoperabilidad con otros programas.
- [XAMPP](https://www.apachefriends.org/es/index.html) es una distribución libre de Apache con un facilidad de uso relativamente sencilla, tanto para su instalación como su manejo. El paquete consiste principalmente de manejadores de base de datos como MySQL, servidor web Apache, lenguaje de programación PHP y de script como Perl. **Para la instalación y configuración del chatbot es preferible hacerlo con este paquete, que tiene más herramientas que podrían facilitar la visualización de las operaciones con base de datos, principalmente.**
- [MySQL](https://www.mysql.com/) (**opcional**) es un sistema de gestión de bases de datos relacional. La compañía de Oracle Corporation es la propietaria y está considerada como una de las bases de datos de código abierto más popular. Trabaja excelentemente bien en entornos de desarrollo web.
- [Postman](https://www.postman.com/) es herramienta que se utiliza, entre otras cosas, para hacer pruebas con el API que se desarrolle. Es decir, permite el envío de peticiones HTTP REST sin necesidad de desarrollar un cliente para realizar esa función.
- Clonar o descargar este proyecto.

## Instalación de las herramientas

### Windows
Para la instalación de las herramientas en Windows se debe dar clic en las ligas de la lista de requerimientos y descargar los archivos correspondientes para la instalación.

### GNU/Linux

Abrir una terminal y teclar lo siguiente:
```
sudo apt update
sudo apt install nodejs
sudo apt install npm
sudo apt install git
sudo npm i -g @adonisjs/cli
```

Para MySQL (**opcional**)
```
sudo apt install mysql-server
```

Para Postman
- Se puede instalar desde la página oficial, [aquí](https://www.postman.com/downloads).
- Desde una distribución GNU/Linux. Por ejemplo, en Ubuntu abrir el programa *Software de Ubuntu*, buscar postman e instalarlo.

### Configuración
Para la configuración base de datos con XAMPP en GNU/Linux seguir las siguientes instrucciones:
- Si no se modifica la ruta de instalación de XAMPP,  por defecto, lo hace en el directorio `/opt/lampp/`.
- Para ejecutar el servicio en XAMPP utilizamos el siguiente comando `sudo /opt/lampp/lampp start`
- Para verificar que los servicios de XAMPP están activos, basta con abrir un navegador Web y poner la siguiente URL `http://localhost/phpmyadmin/`
- Después de que los servicios estén activos, se debe crear la base de datos del chabtbot. 
- Desde la interfaz gráfica *phpMyAdmin* elegir la opción *Nueva* , escribir el nombre de la base de datos `chatbotcinvestavbd` y dar clic en el botón *Crear*. 
**No es necesario crear ninguna tabla ni modificar nada más en la base de datos. **

Para la configuración del proyecto seguir las siguientes instrucciones:
- Ingresar al directorio `API-CHATBOT-BASEDEDATOS` y abrir el archivo `.env`
- En el campo `DB_DATABASE` poner el nombre de la base de datos creada `chatbotcinvestavbd`. Ejemplo `DB_DATABASE=chatbotcinvestavbd`.
- Abrir una terminal, posicionarse dentro del proyecto y teclear `adonis migration:refresh` para realizar las migraciones necesarias. **Se debe tener instalado AdonisJs para poder realizar este paso y se debe estar corriendo XAMPP. De no ser así saldrán errores.**
- El paso anterior crea las tablas en la base de datos del chatbot. 
**Para revisar que todo salió bien, se puede ingresar al servicio de phpMyAdmin para cerciorar que las tablas se han creado.**

Creación del usuario administrador:
- Para el correcto funcionamiento del chatbot es necesario crear un usuario administrador. Para esto se deberá contar con alguna herramienta para que probar el API.
- En el directorio del proyecto teclear `adonis serve --dev`
- Abrir Postman y elegir `new>request`. En los campos *Request name* poner un nombre para identificar la solicitud, por ejemplo, `usuario_admin`. En el campo `Request description` omitir pues es opcional. En *+Create Collection* poner algún nombre, por ejemplo `admindb`. Cuando la información esté completa dar clic en el botón *Save*.
- Elegir el método POST y escribir el URL `http://127.0.0.1:3333/api/v1/users`.
- Dirigirse a la sección de *Body* con la opción *raw* y *Text* como *JSON*. 
- En el espacio de trabajo se debe agregar el contenido del JSON con los campos *username*, *age*, *email*, *password* y *type*, por ejemplo:
```
{
    "username":"TU USUARIO",
    "age":"TU EDAD",
    "email":"TU CORREO",
    "password":"TU CONTRASEÑA",
    "type":"Administrador"
}
```
- En las palabras con mayúsculas van los datos que quieres para el administrador.
- Una vez escrito el JSON dar clic en el botón *Send*. **Debe estar ejecutándose XAMMP para que se pueda crear el administrador**.
- Entrar a *phpMyAdmin*, seleccionar la base de datos `chatbotcinvestavbd` y después la tabla `users`.
- En la tabla `users` elegir la opción `Editar` del usuario administrador. Cambiar la columna `activated` del valor `0` al `1` y dar clic en el botón *continuar*.
Hasta este punto se ha creado el usuario que hará gestiones de administración en la interfaz del chatbot.
