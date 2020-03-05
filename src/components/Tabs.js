import React from 'react';
import { connect } from 'react-redux';

import { updateActiveTab } from '../store/actions/actions';
import { tabs } from '../configuration';


import '../styles/Tabs.css';

const Tabs = props => {
  const { setActiveTab, activeTab } = props;
  return (
    <nav className='py-2'>
      <ul>
        {tabs.map(tab=>{
          return (
            <li className={(activeTab===tab.key)?'active':''} key={tab.key}>
              <input type='button' value={tab.label} className='btn btn-link' onClick={()=>setActiveTab(tab.key)}/>
            </li>
          )
        })

        }
      </ul>
    </nav>
  );
}

const mapStateToPorps = state => ({
  activeTab: state.combReducer.activeTab
});

const mapDispatchToProps = dispatch =>({
  setActiveTab : data => dispatch(updateActiveTab(data)) 
});

export default connect(mapStateToPorps, mapDispatchToProps)(Tabs);