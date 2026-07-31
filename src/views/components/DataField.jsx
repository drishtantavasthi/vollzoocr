import React from 'react';

export default function DataField({ label, name, value = '', onChange, multiline = false, rows = 3, groupKey = null }) {
  const isMultiline = multiline || value.length > 60 || value.includes('\n');
  
  const handleChange = (e) => {
    if (onChange) {
      onChange(e, groupKey);
    }
  };

  return (
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label className="text-sm font-medium text-slate-400 capitalize mb-1" htmlFor={name}>
          {label}
        </label>
      )}
      {isMultiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          rows={rows}
          className="input-field w-full resize-y"
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="input-field w-full"
        />
      )}
    </div>
  );
}
