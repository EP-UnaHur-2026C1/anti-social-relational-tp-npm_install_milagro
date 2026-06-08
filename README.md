# Estrategias de Persistencia - Trabajo Práctico 1: Red anti-social
### integrantes:
 + Dylan Correa
 + Agustin Fernandes
 + Leonardo Murano
 + Tomas Rosales
 + Matias de la Rosa

## 💾 Arquitectura de Persistencia y Base de Datos

Este sistema ha sido diseñado bajo un modelo de **persistencia agnóstica**, cumpliendo con el requisito de que el motor de base de datos pueda ser sustituido de forma transparente sin modificar la lógica de negocio de la aplicación.

### Configuración Flexible

La arquitectura permite alternar entre diferentes gestores de bases de datos (SQLite, MySQL, PostgreSQL) únicamente ajustando las **variables de entorno** (`.env`). Esta separación de responsabilidades asegura que el sistema sea portátil y fácil de configurar en cualquier entorno de desarrollo o producción.

* **Puerto de ejecución:** Configurable mediante `PORT`.
* **Motor de Base de Datos:** Definido mediante `DB_DIALECT`.
* **Credenciales:** Gestión centralizada de acceso sin exponer datos sensibles en el código fuente.

### Validación: Uso de Base de Datos en la Nube (Supabase)

Para demostrar la capacidad de conexión a motores externos, el sistema ha sido configurado para operar con **PostgreSQL en la nube** mediante Supabase. Esto valida que la aplicación no depende de archivos locales y es capaz de integrarse con servicios de infraestructura profesionales.



#### Capturas de la configuración:

1. **MER de la API de ANTISOCIAL RED en Supabase:**

![Configuración Supabase](assets/BD-SUPABASE-MER.png)

2. **TABLAS GENERADAS de ANTISOCIAL RED en Supabase:**

![Configuración Supabase](assets/BD-SUPABASE-TABLES.png)

3. **Confirmación de conectividad:**

![Configuración Supabase](assets/CONEXION-BD-PARAMS.png)

![Configuración Supabase](assets/CONEXION-SUPABASE.png)

---

### ¿Cómo cambiar de base de datos?

Para adaptar el sistema a cualquier otro motor (por ejemplo, MySQL), el procedimiento es el siguiente:

1. Asegurarse de tener instalado el driver correspondiente (por ejemplo, `mysql2` para MySQL).
2. Actualizar el archivo `.env` con los parámetros específicos del nuevo motor (Host, Usuario, Password, Dialect). Esto es lo que modificamos con la captura *CONEXION-BD-PARAMS* y la contraseseña que pusimos a la hora de crear el proyecto, para conectarnos con SUPABASE
3. Al reiniciar la aplicación, Sequelize detectará automáticamente el nuevo dialecto y establecerá la conexión, garantizando la transparencia solicitada en el requerimiento.

---
