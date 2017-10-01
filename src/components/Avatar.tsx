import React, { Suspense } from 'react';
import { Spinner, Image } from 'react-bootstrap';
import { useImage } from 'react-image';

const Avatar = (props: {
  url: string;
}) => {
  const { url } = props;

  const ReactImage = () => {
    const { src } = useImage({
      srcList: url,
    });

    return <Image src={src} alt="Avatar Url" width="50" height="50" thumbnail />;
  };

  const LoadingSpinner = () => (
    <Spinner
      animation="border"
      data-testid={url}
      role="progressbar"
    />
  );

  return (
    <Suspense
      fallback={LoadingSpinner()}
    >
      <ReactImage />
    </Suspense>
  );
};

export default Avatar;
