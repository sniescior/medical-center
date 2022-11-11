import React from 'react';
import '../../styles/tabs/tabs.css'

export default function TabsHeader(props) {
    const { tabs, activeTab, setActiveTab } = props;

    return (
        <div className="tabs-header">
            {tabs.map(tab => {
                return (
                    <button key={tab.id} className={activeTab === tab.id ? "tab-button active" : "tab-button"} onClick={() => {setActiveTab(tab.id)}}><i className={tab.icon}></i>{tab.title}</button>
                );
            })}
        </div>
    );
}
