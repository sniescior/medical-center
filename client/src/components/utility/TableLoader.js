import React from "react";
import { useEffect, useState } from "react";

export default function TableLoader(props) {

    const [table, setTable] = useState(Array.from(Array(props.pageSize).keys()));

    useEffect(() => {
        const pageSize = props.pageSize;
        setTable(Array.from({ length: pageSize }, (_, index) => index + 1));
        
    }, [props.pageSize]);

    return (
        <tbody className={props.tableLoader ? "table-loader" : "table-loader none"}>
            {table.map((item, key) => {
                return (
                    <tr key={key}>
                        {props.headerData.map((element, key) => {
                            return (
                                <td key={key}>ND</td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}