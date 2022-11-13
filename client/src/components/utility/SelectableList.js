import React, { useState, useEffect } from "react";
import "../../styles/list/list.css";

function AddedListItem(props) {

    const [active, setActive] = useState(false);

    return (
        <li className={active ? "added active" : "added"}>
            <div className="header-wrapper">
                <p>{props.item.title}</p>
                <i className="bi bi-chevron-down" onClick={() => { setActive(!active); }}></i>
            </div>
        </li>
    );
}

function ListItem(props) {
    const { item, selectedItems, selectItem, unSelectItem } = props;

    const ifSelected = (id) => {
        if(selectedItems.has(id)) { return true; }
        return false;
    }

    return (
        <li className={ifSelected(item.id) ? "selected" : ""} onClick={() => { 
            if(ifSelected(item.id)) {
                unSelectItem(item.id);
            } else {
                selectItem(item.id);
            }
        }}>
            <p>{item.title}</p>
            <i className={!ifSelected(item.id) ? "bi bi-plus-lg" : "bi bi-dash-lg"}></i>
        </li>
    );
}

export default function SelectableList(props) {
    const [loader, setLoader] = useState(false);

    const { modalOpened, refreshList, elementIDState, setError, selectedItems, setSelectedItems, titleQuery, setTitleQuery, addedItems, setAddedItems, items, setItems } = props;

    useEffect(() => {
        refreshList(setLoader, setError);
    }, [elementIDState, titleQuery, modalOpened]);

    const unSelectItem = (id) => {
        setSelectedItems(prev => new Set([...prev].filter(x => x !== id)));
    }

    const selectItem = (id) => {    
        setSelectedItems(previousState => new Set([...previousState, id]));
    }

    return (
        <div className="selectable-list">
            <div className="input-wrapper icon">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Wyszukaj" value={titleQuery} onChange={(e) => setTitleQuery(e.target.value) } />
            </div>
            <ul className="list">
                {addedItems.map((element, key) => {
                    return <AddedListItem key={key} item={element} />
                })}
                {items.map((element, key) => {
                    return <ListItem selectedItems={selectedItems} key={key} item={element} selectItem={selectItem} unSelectItem={unSelectItem} />
                })}
            </ul>
            <div className="selected-summary">
                <p>Zaznaczono {selectedItems.size}</p>
            </div>
        </div>
    );
}