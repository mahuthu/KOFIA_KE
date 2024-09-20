import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

// For small screens, show single image
export const showSingleImageOnSmallScreens = css`
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

// For large screens, hide single image
export const hideSingleImageOnLargeScreens = css`
  @media only screen and (min-width: 601px) {
    display: none;
  }
`;

// Image styling for small screens
export const responsiveImageStyles = css`
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 100%; // Adjust height to maintain aspect ratio
    object-fit: cover; // Ensure the image covers the container
  }
`;
