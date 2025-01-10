# Movie App

Este es un proyecto de una aplicación web para visualizar información sobre películas. El proyecto está desarrollado con **Angular V19** y consume la API de **The Movie Database (TMDb)**.

## Descripción

La aplicación consta de dos vistas principales:

1. **Home**: En esta vista, podrás ver las películas más populares del momento. También incluye una barra de búsqueda donde puedes buscar películas por título.
2. **Detalle de la Película**: Esta vista muestra la información detallada de una película seleccionada, como su sinopsis, fecha de estreno, género, etc.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu_usuario/movieApp.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd movieApp
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

4. Corre la aplicación:

    ```bash
    ng serve
    ```

    La aplicación estará disponible en [http://localhost:4200](http://localhost:4200).

## Endpoints de la API

La aplicación usa los siguientes endpoints de la API de The Movie Database (TMDb):

- **Películas Populares**:  
  `GET /movie/popular?language=en-US&page={page}`  
  Este endpoint devuelve una lista de las películas más populares en el idioma inglés.
  
- **Buscar Películas por Título**:  
  `GET /search/movie?query={query}&include_adult=false&language=en-US&page={page}`  
  Este endpoint permite buscar películas por título. El parámetro `include_adult=false` excluye películas para adultos.
  
- **Detalle de una Película**:  
  `GET /movie/{id}`  
  Este endpoint devuelve detalles de una película seleccionada.

- **Cast de la Película**:  
  `GET /movie/{id}/credits?language=en-US`  
  Este endpoint devuelve la lista de actores y miembros del equipo de la película.

## Tecnologías

- **Angular V19**
- **The Movie Database API (TMDb)**

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
