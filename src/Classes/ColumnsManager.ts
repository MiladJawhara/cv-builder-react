import ColumnOfContent from "../Components/ColumnOfContent";


let allColumns: Array<ColumnOfContent> = [];
export default class ColumnsManager {

    static addColumn(col: ColumnOfContent) {
        allColumns.push(col);
    }

    static runMouseDetection() {
        allColumns.forEach(col => col.checkMouseOver());
    }


}