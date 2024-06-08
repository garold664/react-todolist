import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil } from 'lucide-react';

export default function App() {
  const dispatch = useDispatch();
  const messageItems = useSelector((state) => state.messageItems);
  const dialogNames = useSelector((state) => state.dialogNames);

  const [text, setText] = useState('');
  const [name, setName] = useState(dialogNames[0].name);
  const [nameColor, setNameColor] = useState('#1af901');
  const [editStatus, setEditStatus] = useState('Send');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newName, setNewName] = useState('');

  const nameInputRef = useRef();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <select
        name=""
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        ref={nameInputRef}
      >
        {dialogNames.map((name) => (
          <option value={name.name}>{name.name}</option>
        ))}
      </select>
      {/* <input
        
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="name"
      /> */}
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="text"
      />
      <br />
      <button
        onClick={() => {
          if (editStatus === 'Send') {
            dispatch({
              type: 'ADD-MESSAGE',
              payload: { message: text, id: 5, name: name },
            });
          }

          if (editStatus === 'Edit') {
            dispatch({
              type: 'MESSAGE-CHANGE',
              payload: { message: text, id: currentItemId, name: name },
            });
          }

          setName('');
          setText('');
          setEditStatus('Send');
          setCurrentItemId(null);
          // nameInputRef.current.focus();
          console.log(messageItems);
        }}
      >
        {editStatus}
      </button>
      <ul>
        {messageItems.map((item) => {
          const nameColor = dialogNames.find(
            (el) => el.name === item.name
          ).color;
          return (
            <li key={item.id}>
              <b style={{ color: nameColor }}>{item.name}</b>:{' '}
              <span>{item.message}</span>
              <button
                onClick={() => {
                  setEditStatus('Edit');
                  setName(item.name);
                  setText(item.message);
                  setCurrentItemId(item.id);
                }}
              >
                <Pencil />
              </button>
            </li>
          );
        })}
      </ul>

      <input
        type="text"
        placeholder="new name"
        value={newName}
        onChange={(ev) => setNewName(ev.target.value)}
      />
      <input
        type="color"
        value={nameColor}
        onChange={(ev) => setNameColor(ev.target.value)}
      />
      <button
        onClick={() =>
          dispatch({
            type: 'ADD-NAME',
            payload: {
              name: newName,
              color: nameColor,
            },
          })
        }
      >
        Add new name
      </button>
      {nameColor}
    </div>
  );
}
