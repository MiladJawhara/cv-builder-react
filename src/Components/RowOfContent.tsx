import React from "react";
import ColumnOfContent, { ColumnOfContentProps, IColumnOfContent } from "./ColumnOfContent";

export interface RowOfContentProps {
    cols?: Array<ColumnOfContentProps>;
}

export interface RowOfContentState {
    cols: Array<IColumnOfContent>;
}

export const MAX_COLS_SIZE_IN_ROW: number = 12;

export const sumOfColumnsSizes = (cols: Array<IColumnOfContent>): number => {

    return cols.reduce((pre, current, index) => {
        return pre + current.size;
    }, 0);

}

export const getLargestCol = (cols: Array<IColumnOfContent>): { col: IColumnOfContent, index: number } => {

    let res = cols[0];
    let index = 0;

    for (let i = 1; i < cols.length; i++) {
        if (res.size < cols[i].size) { res = cols[i]; index = i }
    }

    return { col: res, index }
}

export const getSmallestCol = (cols: Array<ColumnOfContentProps>): { col: ColumnOfContentProps, index: number } => {

    let res = cols[0];
    let index = 0;

    for (let i = 1; i < cols.length; i++) {
        if (res.size > cols[i].size) { res = cols[i]; index = i }
    }

    return { col: res, index }
}

export const sortCols = (cols: Array<IColumnOfContent>): Array<IColumnOfContent> => {
    return [...cols].sort((col1, col2) => {
        if (!col1.order) return -1;
        if (!col2.order) return 1;
        return (col1.order - col2.order);
    })
}



class RowOfContent extends React.Component<
    RowOfContentProps,
    RowOfContentState
> {
    constructor(props: RowOfContentProps | Readonly<RowOfContentProps>) {
        super(props);
        this.fitAllColumns();
    }
    state: RowOfContentState = {
        cols: [
            {
                id: '1',
                order: 1,
                size: 3,
                bgColor: 'blue'
            },
            {
                id: '2',
                order: 2,
                size: 4,
                bgColor: 'lightgray'
            }
        ],
    };



    fitAllColumns() {
        const { cols } = this.state;
        let tempCols: Array<IColumnOfContent> = [...cols];

        while (sumOfColumnsSizes(tempCols) > MAX_COLS_SIZE_IN_ROW) {
            let largestCol = getLargestCol(tempCols);
            largestCol.col.size -= largestCol.col.size >= 1 ? 1 : 0;
        }
        while (sumOfColumnsSizes(tempCols) < MAX_COLS_SIZE_IN_ROW) {
            let largestCol = getLargestCol(tempCols);
            largestCol.col.size += 1;
        }

        this.setState({ cols: tempCols });
    }


    handleColBgChange = (id: string, newColor: string) => {
        const { cols } = this.state;
        let tempCols = [...cols];
        const wantedCol = tempCols.find(col => { return col.id === id });
        if (!wantedCol) return;
        wantedCol.bgColor = newColor;
        this.setState({ cols: tempCols });
    }

    render() {

        return <div className="row">{sortCols(this.state.cols).map((col) => {
            return <ColumnOfContent
                id={col.id}
                key={'col-' + col.id}
                size={col.size}
                children={col.children}
                bgColor={col.bgColor}
                lockOverlay={col.lockOverlay}
                onBgColorChange={this.handleColBgChange}
            />
        })}</div>;
    }

}

export default RowOfContent;
