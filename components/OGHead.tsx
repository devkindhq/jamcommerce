type TOGHead = {
    title: string,
    description: string,
    url: string,
    image?: string

}
const OGHead = ({ description, url, image, title }: TOGHead) => {
  return (
    <>
      <meta property="og:url" content={url} key="ogurl" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta property="og:site_name" content="Calvin Torra" key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
    </>
  );
};

export default OGHead;