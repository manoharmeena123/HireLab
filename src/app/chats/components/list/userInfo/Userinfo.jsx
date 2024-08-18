import React from "react";
import { useUserStore } from "../../../lib/userStore";
import styles from "./UserInfo.module.css"; // Import the CSS module
import More from '@/images/chat/more.png';
import Video from '@/images/chat/video.png';
import Edit from '@/images/chat/edit.png';
import Image from 'next/image'
import Avatar from '@/images/chat/avatar.png'
const Userinfo = () => {

  const { currentUser } = useUserStore();
  console.log('currentUser', currentUser)
console.log('More', More)
  return (
    <div className={styles.userInfo}>
      <div className={styles.user}>
        <Image src={currentUser.avatar || Avatar} alt="" width={50} height={50} />
        <h2>{currentUser.username}</h2>
      </div>
      <div className={styles.icons}>
        <Image src={More} alt="More options" />
        <Image src={Video} alt="Start video" />
        <Image src={Edit} alt="Edit profile" />
      </div>
    </div>
  )
}

export default Userinfo;
