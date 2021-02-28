import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Hapi from '@hapi/hapi';
import routes from './routes';
import store from './store';

const init = async () => {
  const server = Hapi.server({
    port: 10032,
    host: 'localhost'
  });

  server.route(routes);

  await server.start();
  if (store.dev) {
    console.log('Server running on %s', server.info.uri);
  }
};

init();
