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
            <div className="expand-wrapper">
                <button onClick={() => { props.deleteItemAction(props.item); }}><i className="bi bi-trash3"></i>Usuń</button>
            </div>
        </li>
    );
}

function ListItem(props) {
    const { editable, item, selectedItems, selectItem, unSelectItem } = props;

    const ifSelected = (id) => {
        if(selectedItems.has(id)) { return true; }
        return false;
    }

    return (
        <li className={ifSelected(item.id) ? "selected" : ""} onClick={() => {
            if(editable) {
                if(ifSelected(item.id)) {
                    unSelectItem(item.id);
                } else {
                    selectItem(item.id);
                }
            }
        }}>
            <p>{item.title}</p>
            <i className={!ifSelected(item.id) ? "bi bi-plus-lg" : "bi bi-dash-lg"}></i>
        </li>
    );
}

export default function SelectableList(props) {
    const [loader, setLoader] = useState(false);

    const { editable, refreshState, deleteItemAction, modalOpened, refreshList, elementIDState, setError, selectedItems, setSelectedItems, titleQuery, setTitleQuery, addedItems, setAddedItems, items, setItems } = props;

    useEffect(() => {
        console.log('Editable: ', editable);
    })

    useEffect(() => {
        refreshList(setLoader, setError);
    }, [elementIDState, titleQuery, modalOpened, refreshState]);

    const unSelectItem = (id) => {
        setSelectedItems(prev => new Set([...prev].filter(x => x !== id)));
    }

    const selectItem = (id) => {    
        setSelectedItems(previousState => new Set([...previousState, id]));
    }

    return (
        <div className={editable === 1 ? "selectable-list" : "selectable-list view-only"}>
            <div className="input-wrapper icon">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Wyszukaj" value={titleQuery} onChange={(e) => setTitleQuery(e.target.value) } />
            </div>
            <ul className="list">
                {addedItems.map((element, key) => {
                    return <AddedListItem editable={editable} deleteItemAction={deleteItemAction} key={key} item={element} />
                })}
                {items.map((element, key) => {
                    return <ListItem editable={editable} selectedItems={selectedItems} key={key} item={element} selectItem={selectItem} unSelectItem={unSelectItem} />
                })}
            </ul>
            <div className="selected-summary">
                <p>Zaznaczono {selectedItems.size}</p>
            </div>
        </div>
    );
}
