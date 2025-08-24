# Superheroe Assembler

## ¿Qué pasos deberá tomar en el futuro si la cantidad de superhéroes aumenta?
- Una solución podría ser implementar la query useFetchHero (Agregada dentro de api/superheroes.ts), para poder extraer los datos individuales de cada superhéroe cuando se ingrese en la página de detalle de un superhéroe, y se debería de cambiar el query de todos los heroes para que solo se obtengan los datos necesarios de cada superhéroe (id, nombre, imagen pequeña, si es favorito, powerlevel).
- Otra solución podría ser implementar de páginación, obtener los superhéroes de a 30 por vez, para poder cargar los superhéroes de manera eficiente y poder mantener la misma funcionalidad de la app actual.
- También se podría implementar lazy loading en las imágenes para poder cargar el contenido, incluso si no se ha cargado la imagen completa, se podría ver una imagen placeholder y luego la imagen completa cuando se haya cargado.

## ¿Qué podría modificar si se reciben reportes de usuarios que perciben que la app es muy lenta? 
- La lentitud de la aplicación se podría deber al la cantidad de elementos que se están renderizando en la pantalla principal (incluso con la utilización de caching por React Query), lo que se podría hacer es implementar paginación para poder cargar los superhéroes de a 10 o 30 por vez. 
- También se podría utilizar un nuevo componente experimental llamado FlashList, el cual está hecho para manejar incluso una mayor cantidad de elementos de manera eficiente (Incluso mejor optimizado que el componente FlatList y sus optimizaciones (como maxToRenderPerBatch, removeClippedSubviews y windowSize) que utiliza virtualización de componentes como ahora).
- Se podrían implementar métricas de rendimiento para saber en qué parte del procesamiento es que está sucediendo el problema.

## ¿Dejo algún aspecto pendiente? ¿Por qué?
- Un aspecto que no implementé es la eliminación y edición de un equipo. No lo implementé porque no se tenía dentro de los requerimientos originales del proyecto, por lo que no lo consideré necesario para la funcionalidad de la app.
- También se podría implementar autenticación de usuario, para que los usuarios puedan guardar sus superhéroes favoritos y equipos de superhéroes a una cuenta, y así poder tener los datos tanto localmente como en el servidor.
- Otro aspecto que no implementé es la sincronización de la base de datos local con el servidor, esto fue más que todo porque no se tiene una API backend que almacene la información de los superhéroes favoritos y equipos de supehéroes por cuenta, por lo que no se puede sincronizar la base de datos local con el servidor.
