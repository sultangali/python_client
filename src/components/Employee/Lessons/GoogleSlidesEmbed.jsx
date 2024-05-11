import React from 'react';

const GoogleSlidesEmbed = ({ presentation }) => {

  return (
    <div  className="w-100 d-flex row align-items-center justify-content-center text-center"
                style={{
                      border: "1px solid #7209B7",
                      borderRadius: "4px",
                      maxWidth: '100%',
                      maxHeight: '750px',
                      borderTopLeftRadius: '0px',
                      borderTopRightRadius: '0px',
                      borderTop: 'none',
                      padding: '0px',
                      overflow: 'hidden',
                      margin: '0 auto'
                    }} >
                <div  dangerouslySetInnerHTML={{ __html: presentation }}></div>
    </div>
  );
};

export default GoogleSlidesEmbed;
