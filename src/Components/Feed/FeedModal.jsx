import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import { PHOTO_GET } from '../../Api';
import PhotoContent from '../Photo/PhotoContent';
import Button from '../Forms/Button';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }
  function handleClick() {
    setModalPhoto(null);
  }
  return (
<section className={styles.modal} onClick={handleOutsideClick}>
    <div className={styles.innerModal}>
      {data &&  <Button className={styles.closeButton} onClick={handleClick}>X</Button>}
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  </section>
  );
};

export default FeedModal;
