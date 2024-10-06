import { useMessage } from '../../context/MessageContext';

import classes from './Message.module.css';

// type MessageProps = {
//   message: string;
// };

console.log(classes);

export default function Message() {
  const { message, setMessage, type, setType } = useMessage();
  if (!message) return null;
  const closeMessage = () => {
    setType('success');
    setMessage('');
  };
  return (
    <>
      <div className={classes.overlap} onClick={closeMessage} />
      <article
        className={`${classes.message} ${
          type === 'error' ? classes.error : classes.success
        }`}
      >
        {message}
        <button className={classes.closeBtn} onClick={closeMessage}>
          X
        </button>
      </article>
    </>
  );
}
