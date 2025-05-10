import { memo, useEffect } from 'react';
import './index.css';

export const TodoList = memo((props) => {
  const value = props.value;
  useEffect(() => {
    console.log(value)
  }, [value])
  return (
    <li>
      <div className='view'>
        <input checked={!!value?.checked} type="checkbox" className={'toggle ' + `${!!value?.checked ? 'checked' : ''}`} onChange={(e) => props.onChange(e.target.checked)}/>
        <label>{value.value}</label>
        <button className='destroy' onClick={()=>props.onDelete(value.checked)}></button>
      </div>
    </li>
  )
})