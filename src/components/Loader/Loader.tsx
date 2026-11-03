import css from './Loader.module.css';

const Loader: React.FC = () => {
  return <p className={css.text}>Loading movies, please wait...</p>;
};

export default Loader;
