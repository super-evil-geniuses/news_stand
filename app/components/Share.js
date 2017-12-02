import React from 'react';
import PropTypes from 'prop-types';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const LinkedinIcon = generateShareIcon('linkedin');

const {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons;

const Share = ({article}) => {
  return (
    <div className="share-icons">
      <FacebookShareButton quote="Posted from News Stand" url={article.url}>
        <FacebookIcon
              size={32}
              round />
      </FacebookShareButton>
      <LinkedinShareButton url={article.url}>
        <LinkedinIcon
              size={32}
              round />
      </LinkedinShareButton>
      <TwitterShareButton url={article.url}>
        <TwitterIcon
              size={32}
              round />
      </TwitterShareButton>
    </div>
  );
} 

Share.propTypes = {
};

export default Share;
