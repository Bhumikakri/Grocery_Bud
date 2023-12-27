import React, { useState, useRef, useEffect } from 'react';
import './main.css';
import Alert from './Alert';

const Main = () =>{

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [items, setItems] = useState([]);
    const inputRef = useRef(null);


    // Load items from local storage on initial render
    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('groceryItems'));
        if (storedItems) {
            setItems(storedItems);
        }
    }, []);

    // adding item 
    const addItem = () => {
        const newItem = inputRef.current.value.trim();
        if (newItem !== '') {
            const capitalizedItem = newItem
            .toLowerCase()
            .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
          const updatedItems = [...items, capitalizedItem];
          setItems(updatedItems);
          saveItemsToLocalStorage(updatedItems);
          inputRef.current.value = '';
          setAlertMessage('✅ Item has been Added');
          setShowAlert(true);
        } else {
          setAlertMessage('🔇 Please Provide value');
          setShowAlert(true);
        }
    };


    const removeItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        saveItemsToLocalStorage(updatedItems);
        setAlertMessage('❎ Item has been deleted');
        setShowAlert(true);
    };

    // Function to save items to local storage
    const saveItemsToLocalStorage = (items) => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
    };

    return (
        <div className='mainContainer'>
            <h1>Grocery Bud</h1>
            <Alert message={alertMessage} showAlert={showAlert} setShowAlert={setShowAlert} />
            <div className='inputs'>
                <input type="text" ref={inputRef} placeholder="Enter an item" />
                <button onClick={addItem} className='Addbtn'>Add item</button>
            </div>
        <ul className="items-list">
        {items.map((item, index) => (
          <li key={index}>
            <div className='checkbox'>
            <input type='checkbox' ></input>
            {item}
            </div>
            <button onClick={() => removeItem(index)}>Delete</button>
          </li>
        ))}
        </ul>
        </div>

    );
}

export default Main;