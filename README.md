# prueba-tecnica
Documentación del Proyecto: Mercado Gastronómico Azteca

Hola. Este repositorio contiene mi solución para la prueba técnica de la landing page de la campaña "Come bien y a un excelente precio" del Mercado Gastronómico Azteca (MGA).

A continuación detallo cómo está construido el proyecto y las decisiones que tomé durante el desarrollo.

Cómo correr el proyecto

Traté de mantener las cosas lo más simples posible. Como el proyecto está construido con Vanilla Web (HTML, CSS y JavaScript puros), no necesitas instalar Node.js ni correr procesos de compilación complicados.

Para verlo funcionar, solo tienes que clonar este repositorio (o descargar los archivos) y abrir el archivo index.html directamente en cualquier navegador

Como recomendación, para tener la mejor experiencia y evitar que el navegador bloquee la carga de algunos recursos locales (errores de CORS), te sugiero usar la extensión Live Server en VS Code o levantar un servidor local sencillo (como npx serve o python -m http.server).

Tecnologías utilizadas

Estructura y Lógica: Utilicé HTML5 semántico y JavaScript puro (Vanilla JS).

Estilos: Me apoyé en Tailwind CSS cargándolo mediante CDN. Esto me permitió agilizar mucho la maquetación sin tener que configurar herramientas de compilación complejas. Además, creé un archivo de estilos tradicional (css/styles.css) para manejar las animaciones más detalladas y los ajustes específicos de la marca que Tailwind no cubre por defecto.

Tipografías: Usé Fraunces para los títulos e Instrument Sans para los textos de lectura, ambas cargadas desde Google Fonts.

Arquitectura de Datos: Decidí separar por completo la información del diseño. Todo el contenido de la campaña vive en el archivo js/data.js, mientras que la lógica que se encarga de pintar esos datos en la pantalla está en js/app.js.

Errores, inconsistencias y huecos en el copy

Al leer detenidamente el documento original, detecté los siguientes detalles;

Estructura dispar: De lunes a jueves, el texto seguía el formato Marca: Promoción $Precio, pero el viernes cambiaba a Promoción $Precio | Marca. Mi solución fue estandarizar todo en mi archivo data.js para que cada promoción tenga campos fijos. Así, la pantalla siempre las muestra de forma uniforme

Datos faltantes: Había promociones el viernes que no tenían marca asignada, y algunos postres no tenían precio. Resolví esto directamente en el código de la interfaz: si el sistema detecta que no hay precio o no hay marca, la tarjeta simplemente omite ese pedazo de texto y se reacomoda, en lugar de mostrar espacios vacíos o errores

Repeticiones: En la parte de Azteca Estudios, la indicación de reportar fallas por WhatsApp venía repetida dos veces. Decidí quitar la repetición y agrupar la instrucción en un solo bloque visual llamativo al final, para que funcione como un verdadero botón de acción. También noté que el eslogan "Calidad, sabor y precio" cerraba cada sección; preferí sacarlo de ahí y ponerlo en el pie de página general para que cierre bien toda la experiencia

Ortografía: Al texto le faltaban casi todas las tildes. Aproveché la extracción de datos para corregir la ortografía y gramática de todo el documento

Categorización de Postres: En el texto estaban agrupados de una forma un poco confusa. En lugar de meterlos a la fuerza en el diseño de las tarjetas diarias, los agrupé visualmente según sus bloques de disponibilidad para respetar lo que intentaba comunicar el texto original

Uso de herramientas de IA

Para ser más eficiente en el desarrollo, me apoyé en algunas herramientas de IA:

Procesamiento de texto (ChatGPT / Claude): Las usé para pasar rápidamente el texto crudo del documento de Word al formato de datos estructurados que necesitaba para mi archivo js/data.js. Esto me ayudó mucho a estandarizar los campos y corregir la falta de acentos de forma automática. También le pedí ayuda para redactar la base de la configuración de accesibilidad (etiquetas aria)

Asistencia de código (Opencode): Lo utilicé dentro de mi editor para que me ayudara a autocompletar clases repetitivas de Tailwind y agilizar la escritura de la estructura básica de los eventos de JavaScript
