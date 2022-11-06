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

  useEffect(() => {
    if (!searchQuery) return;

    setStatus('pending');
    setPage(1);
    setImages([]);

    const onRequest = async searchQuery => {
      try {
        const newImages = await fetchGetImage(searchQuery);
        setImages([...newImages]);
        setStatus('resolved');
      } catch {
        toast.error(`Didn't find ${searchQuery}`);
        setStatus('rejected');
      }
    };

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
          <Modal onClose={toggleModal} largeImageUrl={currentModalImage} />
        )}
      </>
    );
  }
}
