import { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';
import { TodoList } from './components/TodoList'
const allowChoose = ["All", "Active", "Completed"];
function App() {
  const [totalList, setTotalList] = useState([]);
  const inputRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const [choosed, setChoosed] = useState("All");

  // 计算未选中的数量
  const unSelected = useMemo(() => {
    return totalList.length - selected
  }, [totalList, selected])

  // 根据选中状态过滤数据
  const showList = useMemo(() => {
    if (choosed === "All") {
      return totalList
    } else if (choosed === "Active") {
      return totalList.filter(item => !item.checked)
    } else {
      return totalList.filter(item => item.checked)
    }
  }, [choosed, totalList])

  // 添加
  const addTo = (e) => {
    e.preventDefault();
    const value = inputRef.current?.value.trim();
    if (value) {
      const news = {
        id: Date.now(),
        value,
        checked: false,
      }
      setTotalList((list) => [...list, news]);
      inputRef.current.value = '';
    }
  };

  // chechbox点击
  const onChange = (index, e) => {
    console.log(index,e)
    setTotalList((list) => {
      const data = [...list]
      data[index].checked = e;
      return data
    });
    setSelected((num) => {
      if(e) {
        num ++
      } else {
        num --
      }
      return num
    })
  }

  const selectToggle = () => {
    let allSeleccted = true;
    for(let i = 0; i < totalList.length; i++) {
      if(!totalList[i].checked) {
        allSeleccted = false;
        break;
      }
    }
    setTotalList((list) => { 
      return list.map((item) => {
        item.checked = !allSeleccted;
        return item
      })
    })
  }

  // 清除选择的
  const clear = () => {
    setTotalList((list) => {
      return list.filter((item) => {
        return !item.checked
      })
    })
    setSelected(0)
  }

  // 删除当前选择
  const onDelete = (index,checked) => {
    setTotalList((list) => {
      return list.filter((item, i) => {
        return i !== index
      })
    })
    if(checked) {
      setSelected(selected - 1)
    }
  }
  useEffect(() => {
    console.log(totalList)
  }, [totalList])
  return (
    <div className="App">
      <div className='main'>
        <header className='todos'>
          <h1>todos</h1>
        </header>
        <section className='todos-list'>
          <div className='add-todo'>
            <div onClick={selectToggle} className='choose-all'></div>
            <form onSubmit={addTo}>
              <input ref={inputRef} name='todo' type="text" className='new-todo' placeholder="What needs to be done?" style={{ border: 'none' }} onBlur={addTo} />
            </form>
          </div>
          <ul className='todo-list'>
            {
              showList.map((item, index) => {
                return (<TodoList key={index} value={item} onChange={(e) => onChange(index, e)} onDelete={(checked) => onDelete(index, checked)} />);
              })
            }
          </ul>
          {
            totalList.length ? <footer className='footer'>
              <span className="todo-count">
                <strong>{unSelected}</strong>
                <span>items left</span>
              </span>
              <ul className="filters">
                {
                  allowChoose.map(item => {
                    return (
                      <li key={item}>
                        <a onClick={() => setChoosed(item)} href={'#/' + item.toLocaleLowerCase()} className={`${item} ${choosed === item ? 'selected' : ''}`}>{item}</a>
                      </li>
                    );
                  })
                }
              </ul>
              <button className='clear-completed' onClick={() => clear()}> Clear completed </button>
            </footer> : null
          }
        </section>
      </div>
    </div>
  );
}

export default App;
