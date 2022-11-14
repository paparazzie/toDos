import React from 'react';
import { FaMinus } from "react-icons/fa";

const Checklist = ({checkBoxList, handleCheck, handleDelete, setcheckBoxListItem, handleFocus}) => (
  <div>
    
    {checkBoxList && <ul>
          {checkBoxList.map(
            item =>
              <div key={item.id} className="checkbox">
                <input
                  type="checkbox"
                 // name={item.id}
                  id="checkbox"
                  checked = {item.done}
                  className="input-checkbox"
                  onChange = {() => handleCheck(item.id)}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder={item.placeholder}
                  defaultValue={item.value}
                  onChange={(e) => setcheckBoxListItem(previousList => ({ ...previousList, value: e.target.value, id: item.id, done:item.done, isEditing: true }))}
                  onBlur={(e) => handleFocus(e, item.id)}
                />
                <div className="minus" onClick={() => handleDelete(item.id)}><FaMinus className='icon' /></div>

              </div>

          )}

        </ul>}

  </div>
);

export default Checklist;


