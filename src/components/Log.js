import React from 'react';
import { Colors } from '@blueprintjs/core';
import { useSelector } from 'react-redux';

function Log() {
  const todoLog = useSelector((state) => state.todo.todoLog);
  return (
    <>
      <h3>Log</h3>
      {Array.from(todoLog)
        .reverse()
        .map(({ content, date }) => (
          <div key={date}>
            {content} <span style={{ color: Colors.FOREST4 }}>{date}</span>
          </div>
        ))}
    </>
  );
}

export default Log;
