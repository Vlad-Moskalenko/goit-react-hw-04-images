import './image-gallery.css';
import { useState, useEffect } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import fetchGetImage from '../api/fetchGetImage';
import Button from '../Button/Button';
import Modal from 'components/Modal/Modal';
import { toast } from 'react-toastify';

export default function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentModalImage, setCurrentModalImage] = useState('');

  const toggleModal = e => {
    if (e && e.target.dataset.src) {
      setCurrentModalImage(e.target.dataset.src);
    }
    setShowModal(!showModal);
  };

  const onRequest = async (searchQuery, page) => {
    setStatus('pending');
    try {
      const newImages = await fetchGetImage(searchQuery, page);
      setImages([...newImages]);
      setStatus('resolved');
    } catch {
      toast.error(`Didn't find ${searchQuery}`);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    setPage(1);
    setImages([]);

    onRequest(searchQuery);
  }, [searchQuery]);

  if (status === 'pending') return <Loader />;

  if (status === 'resolved') {
    return (
      <>
        <ul className="imageGallery">
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              onClick={toggleModal}
              largeImageURL={largeImageURL}
              webImgUrl={webformatURL}
            />
          ))}
        </ul>
        <Button onClick={() => setPage(page + 1)} />
        {showModal && (
          <Modal toggleModal={toggleModal} largeImageUrl={currentModalImage} />
        )}
      </>
    );
  }
}
