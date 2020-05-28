const express = require('express');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const MoviesService = require('../services/movies');
const InitiativesService = require('../services/initiatives');
// const {
//   movieIdSchema,
//   createMovieSchema,
//   updateMovieSchema,
// } = require('../utils/schemas/movies');
const { movieIdSchema, updateMovieSchema } = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

const cacheResponse = require('../utils/cacheResponse');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/initiatives', router);

  const moviesService = new MoviesService();
  const initiativeService = new InitiativesService();

  router.get('/', async function (req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    //const { tags } = req.query;
    try {
      //const movies = await moviesService.getMovies({ tags });
      const directories = await readdir('../');
      //console.log(directories);
      res.status(200).json({
        data: directories,
        message: 'directories listed',
      });
    } catch (err) {
      next(err);
    }
  });
  router.get('/:directoryName', async function (req, res, next) {
    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

    const { directoryName } = req.params;

    try {
      //const movies = await moviesService.getMovie({ directoryName });
      const directory = await await (
        await readFile('../' + directoryName + '/config.json')
      ).toString();

      let directoryArray = JSON.parse(directory);

      //const directory = await readdir('../' + directoryName);
      console.log(directoryArray);
      res.status(200).json({
        data: directoryArray,
        message: 'config file retrieved',
      });
    } catch (err) {
      next(err);
    }
  });
  router.post('/:directoryName', async function (req, res, next) {
    const { body: configFile } = req;
    const { directoryName } = req.params;
    try {
      const folderName = directoryName;

      const folderPath = '../' + directoryName;

      const folderExists = await initiativeService.folderExistsFn(folderPath);

      if (!folderExists) {
        await initiativeService.createFolderFn(folderPath, folderName);
      }

      await initiativeService.createFileFn(
        folderPath,
        directoryName,
        'config.json',
        configFile
      );

      res.status(201).json({
        data: folderName,
        message: 'initiative directory created',
      });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function (req, res, next) {
      const { movieId } = req.params;
      const { body: movie } = req;

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });

        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { movieId } = req.params;

      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId });

        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApi;
