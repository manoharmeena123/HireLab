"use client";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import styles from "./Detail.module.css"; // Import the CSS module
import Image from "next/image";
import avatar from '@/images/chat/avatar.png';
import arrowUp from '@/images/chat/arrowUp.png';
import arrowDown from '@/images/chat/arrowDown.png';
import download from '@/images/chat/download.png';

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  return (
    <div className={styles.detail}>
      <div className={styles.user}>
        <Image src={user?.avatar || avatar} alt="User Avatar" width={100} height={100} />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className={styles.info}>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Chat Settings</span>
            <Image src={arrowUp} alt="Arrow Up" width={30} height={30} />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Chat Settings</span>
            <Image src={arrowUp} alt="Arrow Up" width={30} height={30} />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Privacy & help</span>
            <Image src={arrowUp} alt="Arrow Up" width={30} height={30} />
          </div>
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Shared photos</span>
            <Image src={arrowDown} alt="Arrow Down" width={30} height={30} />
          </div>
          {/* <div className={styles.photos}>
            <div className={styles.photoItem}>
              <div className={styles.photoDetail}>
                <Image
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt="Shared Photo"
                  width={40}
                  height={40}
                  className={styles.img}
                />
                <span>photo_2024_2.png</span>
              </div>
              <Image src={download} alt="Download" width={30} height={30} className={styles.icon} />
            </div>
            <div className={styles.photoItem}>
              <div className={styles.photoDetail}>
                <Image
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt="Shared Photo"
                  width={40}
                  height={40}
                  className={styles.img}
                />
                <span>photo_2024_2.png</span>
              </div>
              <Image src={download} alt="Download" width={30} height={30} className={styles.icon} />
            </div>
            <div className={styles.photoItem}>
              <div className={styles.photoDetail}>
                <Image
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt="Shared Photo"
                  width={40}
                  height={40}
                  className={styles.img}
                />
                <span>photo_2024_2.png</span>
              </div>
              <Image src={download} alt="Download" width={30} height={30} className={styles.icon} />
            </div>
            <div className={styles.photoItem}>
              <div className={styles.photoDetail}>
                <Image
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt="Shared Photo"
                  width={40}
                  height={40}
                  className={styles.img}
                />
                <span>photo_2024_2.png</span>
              </div>
              <Image src={download} alt="Download" width={30} height={30} className={styles.icon} />
            </div>
          </div> */}
        </div>
        <div className={styles.option}>
          <div className={styles.title}>
            <span>Shared Files</span>
            <Image src={arrowUp} alt="Arrow Up" width={30} height={30} />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
