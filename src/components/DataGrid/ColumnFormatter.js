import React from 'react';
import moment from 'moment';

const PriorityFormatter = props => {
  return <span className='priority'>{props.row.priority}</span>
};

const CreatedOnFormatter = props => {
  return <span className='created-on'>{moment(props.row.createdAt).format('LL')}</span>
}

const DuedateFormatter = props => {
  return <span className='due-date'>{moment(props.row.dueDate).format('LL')}</span>
}


export { 
  PriorityFormatter,
  CreatedOnFormatter,
  DuedateFormatter
}