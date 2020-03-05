import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { connect } from 'react-redux';

import { addTodo, updateTodo } from '../store/actions/actions';

import { priority } from '../configuration';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/CustomModal.css';

const ModalPopup = props => {
  const { type, title, row, addNewRow, updateRow } = props;
  
  const [modal, setModal] = useState(false);
  const [summary, setSummary] = useState((row && row.summary) || '');
  const [desc, setDesc] = useState(row && row.description || '');
  const [pri, setPri] = useState( (row && row.priority) || -1);
  const [dueDate, setDueDate] = useState((row && new Date(row.dueDate)) || new Date());
  const toggle = () => setModal(!modal);

  const handleSummary = e =>{
    if(e.target.value.length < 140){
      setSummary(e.target.value);
    }else{
      return false;
    }
  };

  const handleDesc = e =>{
    if(e.target.value.length < 500){
      setDesc(e.target.value)
    }else{
      return false;
    }
  };

  const handleSave = () =>{
    const rec = {
      currentState: true,
      summary: summary,
      description: desc,
      createdAt: moment(new Date()).format('L'),
      dueDate: moment(new Date(dueDate)).format('L'),
      priority: pri
    }
    if(type === "new"){
      addNewRow(rec)
    }else{
      updateRow({...rec, id: row.id})
    }
      
    setModal(false)
  };

  return (
    <React.Fragment>
      {type === "new" ? (
        <div className="justify-content-end row">
          <button className="btn" onClick={toggle}>
            <i className="fa fa-plus-circle fa-2x" style={{color:"red"}} aria-hidden="true"></i>
          </button>
        </div>
      ) : (
        ``
      )}
      {type === "edit" ? (
        <i
          onClick={toggle}
          className="fa mx-2 fa-pencil-square-o"
          style={{color:"blue"}}
          aria-hidden="true"
        ></i>
      ) : (
        ""
      )}
      {type === "view" ? (
        <i onClick={toggle} className="fa mx-2 fa-eye" style={{color:"orange"}} aria-hidden="true"></i>
      ) : (
        ""
      )}

      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          <Form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Summary :</label>
              <div className="col-sm-10">
                {type === "view" ? (
                  <span className="read-only-els">{summary}</span>
                ) : (
                  <input
                    type="text"
                    value={summary}
                    onChange={handleSummary}
                    className="w-75 form-control"
                  />
                )}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Description:</label>
              <div className="col-sm-10 rte">
                {type === "view" ? (
                  <p className="read-only-els">{row.description}</p>
                ) : (
                  <textarea
                    rows="10"
                    className='form-control w-100'
                    value={desc}
                    onChange={handleDesc}
                  />
                )}
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-6 row">
                <label className="col-sm-2 col-form-label">Priority:</label>
                <div className="col-sm-10">
                  {type === "view" ? (
                    <span className="priority read-only-els"> {pri}</span>
                  ) : (
                    <select
                      className="form-control w-50"
                      onChange={e => setPri(e.target.value)}
                    >
                      <option defaultValue="-1">Select One</option>
                      {priority.map(opt => {
                        return (
                          <option
                            defaultValue={opt}
                            key={opt}
                            selected={opt === pri ? true : false}
                          >
                            {opt}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>

              <div className="col-sm-6 row">
                <label className="col-sm-4 col-form-label">Due date:</label>
                <div className="col-sm-8">
                  {type === "view" ? (
                    <span className="read-only-els due-date">
                      {moment(row.dueDate).format('LL')}
                    </span>
                  ) : (
                    <DatePicker
                      selected={dueDate}
                      onChange={date => setDueDate(date)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Form>
        </ModalBody>
        { type !== "view" ? (
        <ModalFooter>
            <Button color="secondary" onClick={toggle} className="btn-lg">
              Cancel
            </Button>
            <Button color="primary" className="btn-lg" onClick={handleSave}>
              {type === "edit" ? 'Update' : 'Save'}
            </Button>
          </ModalFooter>
        ):('')}
      </Modal>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  addNewRow : row => dispatch(addTodo(row)),
  updateRow : row => dispatch(updateTodo(row))
});

export default connect(null, mapDispatchToProps)(ModalPopup);