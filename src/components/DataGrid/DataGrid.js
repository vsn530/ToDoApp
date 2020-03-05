import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';

import DataTable from "react-data-table-component";

import { deleteTodo, updateTodo, markDone, markPending } from '../../store/actions/actions'
import CustomModal from '../Modal';

import { 
  PriorityFormatter,
  CreatedOnFormatter,
  DuedateFormatter
} from './ColumnFormatter';

import './DataGrid.css';

const DataGrid = props =>{
  const { todoList, removeRow, updateRow, tickDone, tickPending } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const [selection, setSelection] = useState(false);

  const columns = [
    {
      name: "Title",
      selector: "title",
      sortable: true,
    },
    {
      name: "Priority",
      selector: "priority",
      sortable: true,
      cell : row => <PriorityFormatter row={row} />
    },
    {
      name: "Created On",
      selector: "createdAt",
      sortable: true,
      cell: row => <CreatedOnFormatter row={row}/>
    },
    {
      name: "Due Date",
      selector: "dueDate",
      sortable: true,
      cell: row => <DuedateFormatter row={row}/>
    },
    {
      name: "Actions",
      selector: "",
      cell : row => {
        const { currentState } = row;
        return (
          <React.Fragment>
            <CustomModal type="edit" title="Edit Todo" row={row} />
            <CustomModal type="view" title="View Todo" row={row} />
            <i
              className="fa mx-2 fa-trash"
              style={{color:"red"}}
              aria-hidden="true"
              onClick={() => removeRow([row])}
            ></i>
            <input
              type="button"
              className="btn btn-sm btn-link"
              value={currentState ? 'Done' : 'Re-Open'}
              onClick={() => updateRow({...row, currentState: !currentState})}
            />
          </React.Fragment>
        );
      }
    }
  ]

  const conditionalRowStyles = [
    {
      when: row => !row.currentState,
      style: {
        backgroundColor: '#defade',
      },
    }
  ]

  const handleRowSelected = rows =>{
    setSelectedRows(rows.selectedRows)
  }

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      removeRow(selectedRows);
      setSelection(true);
    };
    const handleDone = () => {
      tickDone(selectedRows);
      setSelection(true);
    };
    const handlePending = () =>{
      tickPending(selectedRows);
      setSelection(true);
    }

    return (
      <React.Fragment>
        <input type='button' onClick={handleDelete} value='Delete' className='btn btn-sm btn-danger mx-2'/>
        <input type='button' onClick={handleDone} value='Mark As Done' className='btn btn-sm btn-success mx-2'/>
        <input type='button' onClick={handlePending} value='Mark As Pending' className='btn btn-sm btn-secondary mx-2'/>
      </React.Fragment>
    );
  }, [todoList, selectedRows]);

  return (
    <DataTable
      title="TODo List"
      columns={columns}
      data={todoList}
      fixedHeader
      dense
      fixedHeaderScrollHeight="350px"
      highlightOnHover
      className='todolist-component'
      conditionalRowStyles={conditionalRowStyles}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
      contextActions={contextActions}
      clearSelectedRows = {selection}
    />
  );
};

const mapStateToProps = state =>({
  todoList: state.combReducer.todos
})

const mapDispatchToProps = dispatch =>({
  removeRow: row => dispatch(deleteTodo(row)),
  updateRow : row => dispatch(updateTodo(row)),
  tickDone: rows => dispatch(markDone(rows)),
  tickPending: rows => dispatch(markPending(rows))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);