import React, { useState, useEffect } from "react";
import "../../styles/list/list.css";

function AddedListItem(props) {
    const { loader, item, detailAction } = props;

    return (
        <li className={loader ? "added disabled" : "added"}>
            <div className="header-wrapper">
                <p>{item.title}</p>
                <i className="bi bi-chevron-down" onClick={() => { detailAction(item); }}></i>
            </div>
        </li>
    );
}

function ListItem(props) {
    const { loader, editable, item, selectedItems, selectItem, unSelectItem } = props;

    const ifSelected = (id) => {
        if(selectedItems.has(id)) { return true; }
        return false;
    }

    return (
        <li className={ifSelected(item.id) && loader ? "selected disabled" : loader ? "disabled" : ifSelected(item.id) ? "selected" : ""} onClick={() => {
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
    const [noData, setNoData] = useState(false);
    const { listLoader, modalLoader, detailAction, editable, refreshState, deleteItemAction, modalOpened, refreshList, elementIDState, setError, selectedItems, setSelectedItems, titleQuery, setTitleQuery, addedItems, setAddedItems, items, setItems } = props;

    useEffect(() => {
        setNoData(items.length < 1 && addedItems.length < 1);
    }, [items.length, addedItems.length]);

    const unSelectItem = (id) => {
        setSelectedItems(prev => new Set([...prev].filter(x => x !== id)));
    }

    const selectItem = (id) => {
        setSelectedItems(previousState => new Set([...previousState, id]));
    }

    return (
        <div className={editable === 1 ? "selectable-list" : "selectable-list view-only"}>
            <span className={listLoader ? "loader big" : "loader big hidden"}></span>
            <div className={(noData && !listLoader) ? "no-data-wrapper" : "no-data-wrapper none"}>
                <img className="no-data-img" src="search.svg" />
                <h4>Brak wyników</h4>
            </div>

            <div className={modalLoader ? "input-wrapper icon disabled" : "input-wrapper icon"}>
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Wyszukaj" value={titleQuery} onChange={(e) => setTitleQuery(e.target.value) } />
            </div>
            <ul className="list">
                {addedItems.map((element, key) => {
                    return <AddedListItem loader={modalLoader} detailAction={detailAction} editable={editable} deleteItemAction={deleteItemAction} key={key} item={element} />
                })}
                {items.map((element, key) => {
                    return <ListItem loader={modalLoader} editable={editable} selectedItems={selectedItems} key={key} item={element} selectItem={selectItem} unSelectItem={unSelectItem} />
                })}
            </ul>
            <div className="selected-summary">
                <p>Zaznaczono {selectedItems.size}</p>
            </div>
        </div>
    );
}
