import React ,{useState ,useEffect}from 'react'
import "./style.css"

//data input feild m likhu then usko ek state m store kre and then state ka data one by one show krna h 

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");
    if(lists){
        return JSON.parse(lists) ;
    }else {
        return [];
    }
}; 

const Todo = () => {

  const [inputdata , setInputData] = useState(""); 
  const [items ,setItems] = useState(getLocalData());
  const [isEditItem , setIsEditItem] = useState("");
  const [toggleButton ,setToggleButton] = useState(false);

  const addItem = () => {
    if(!inputdata){
        alert('Please fill Data');
    }else if(inputdata && toggleButton){
        setItems(
            items.map((currentElement)=>{
                if(currentElement.id === isEditItem){
                    return {...currentElement , name:inputdata};
                }
                return currentElement;
            })
        );
        setInputData([]);
        setIsEditItem(null);
        setToggleButton(false);
    }
    else{
        const myNewInputData ={
            id:new Date().getTime().toString(),
            name:inputdata,
        };
        setItems([...items, myNewInputData]);
        setInputData(""); 
        // alert("item added in array");
    }
  };

  const editItem = (index) => {
    const item_todo_editted = items.find((currentElement)=>{
        return currentElement.id === index ;
    });

    setInputData(item_todo_editted.name);
    setIsEditItem(index);
    setToggleButton(true);

  };

  const deleteItem = (index) => {
    const updatedItem = items.filter((currentElement) => {
        return currentElement.id !== index ;
    });
    setItems(updatedItem);

  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("myTodoList",JSON.stringify(items));
  }, [items])
  


  return (
    <>
    <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src='./images/todo.svg' alt='todoLogo' />
                <figcaption>Add Your List Here</figcaption>
            </figure>
            <div className='addItems'>
                <input type='text' placeholder='✍️ Add items' className='form-control'
                 value={inputdata} onChange={(event)=>setInputData(event.target.value)}/>

                {toggleButton 
                ?<i className="far fa-edit add-btn" onClick={addItem} /> 
                :<i className="fa fa-plus add-btn" onClick={addItem} />}
                

            </div>
            <div className='showItems'>
                {
                    items.map((currentElement)=>{
                        return(
                            <div className='eachItem' key={currentElement.id} >
                                    <h3>{currentElement.name}</h3>

                                    <div className='todo-btn'>

                                    <i className="far fa-edit add-btn" 
                                        onClick = {()=> editItem(currentElement.id)}></i>

                                    <i className="far fa-trash-alt add-btn" 
                                        onClick={() => deleteItem(currentElement.id)}></i>
                                    </div>
                            </div>
                        );

                    })
                }
            </div>
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text = "Remove All" onClick={removeAll} >
                    <span>Check List</span>
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Todo