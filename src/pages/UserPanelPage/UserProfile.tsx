import { auth } from "../../firebase";

import image from "../../images/placeholder.webp";

const UserProfile = () => {
  const user = auth?.currentUser?.email;

  return (
    <section className="user-profile">
      <div className="title-container">
        <h2 className="title-container__title">{user}</h2>
        <div className="title-container__line"></div>
      </div>

      <div className="user-details">
        <img className="user-details__image" src={image} alt="profile" />
        <p className="user-details__text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          ut aliquid error praesentium! In magni quia perspiciatis ut id ipsam
          magnam, tenetur sed, at blanditiis, nam neque labore iure laudantium.
        </p>
      </div>
    </section>
  );
};

export default UserProfile;
