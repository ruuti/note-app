import React from 'react';

const InlineEditForm = ({ onSubmit, onChange, value, maxLength }) => (
  <div className={'inline-edit'}>
    <form onSubmit={onSubmit}>
      <input 
        type={'text'} 
        value={value} 
        placeholder={'Type a folder name..'} 
        onChange={onChange} 
        autoFocus
        maxLength={maxLength}
        required={true} />
    </form>
  </div>
)

export default InlineEditForm;