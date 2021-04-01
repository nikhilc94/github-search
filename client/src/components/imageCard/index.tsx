import React, { FC, MouseEventHandler } from 'react';

import './index.scss';

interface ImageCardProps {
  logo: string;
  title: string;
  content: string;
  onImageClick?: MouseEventHandler<HTMLDivElement>;
}

const ImageCard: FC<ImageCardProps> = ({
  logo,
  title,
  content,
  onImageClick,
}) => {
  return (
    <div className='image-card'>
      <img src={logo} alt='github-logo' onClick={onImageClick} />
      <div className='card-content'>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ImageCard;
