import React from 'react';

// Recuperation de la Position du petit bloc ROUGE (FOOD snake)

export default (props) => {

  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  }

  return (
    <div className="snake-food" style={style}></div>
  )
}