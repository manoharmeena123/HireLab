import ChatList from "./chatList/ChatList";
import Userinfo from "./userInfo/Userinfo";
import styles from './List.module.css'; // Import the CSS module

const List = () => {
  return (
    <div className={styles.list}>
      <Userinfo />
      <ChatList />
    </div>
  );
};

export default List;
