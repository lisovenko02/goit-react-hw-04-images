import { ModalImg } from "components/ModalImg/ModalImg";
import { useState } from "react";
import { ListImg, ListItems } from "./ImageGalleryItem.styled";


export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  };

  

  return (
    <>
    <ListItems key={id}>
        <ListImg src={webformatURL} 
              alt={tags} 
              onClick={toggleModal}
              loading="lazy"/>

        {isModalOpen && (
            <ModalImg
                largeImgURL={largeImageURL}
                tags={tags}
                isModalOpen={isModalOpen}
                onClose={toggleModal}
            />
            )}
    </ListItems>
</>
  );
}