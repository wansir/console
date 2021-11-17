import mitt from 'mitt';

const init = () => {
  globals.emmiter = mitt();
};

export default { init };
