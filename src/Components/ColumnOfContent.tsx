import React, { Component, createRef } from 'react'
import './ColumnOfContent.css'
import SettingsDialog from './SettingsDialog';
import { SketchPicker } from 'react-color';
import { Card } from 'react-bootstrap';
import Input from './../Classes/Input';
import ColumnsManager from '../Classes/ColumnsManager';



export type columnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface IColumnOfContent {
    id: string,
    size: columnSize,
    order?: number,
    children?: Array<Component>,
    bgColor?: string,
    lockOverlay?: boolean,
}

export interface ColumnOfContentProps extends IColumnOfContent {
    onBgColorChange: Function,
}

export interface ColumnOfContentState {
    size: columnSize,
    hoveringOver: boolean,
    bgColor?: string,
    children?: Array<Component>,
    colorPickerIsOpen: boolean,
    settingsIsOpen: boolean
}

export const isMouseHoveringOverCol = (column: ColumnOfContent): boolean => {
    const col = column.colRoot.current;

    if (!col) return false;

    let xCol = col.offsetLeft;
    let yCol = col.offsetTop;
    let mousePos = Input.getMousePos();

    let xBoundary = (mousePos.x > xCol && mousePos.x < xCol + col.offsetWidth);
    let yBoundary = (mousePos.y > yCol && mousePos.y < yCol + col.offsetHeight);

    let res = xBoundary && yBoundary;

    return res;
}

class ColumnOfContent extends React.Component<ColumnOfContentProps, ColumnOfContentState> {
    colRoot: React.RefObject<HTMLDivElement>;

    constructor(props: ColumnOfContentProps | Readonly<ColumnOfContentProps>) {
        super(props);
        this.colRoot = createRef();
        ColumnsManager.addColumn(this);
    }
    state: ColumnOfContentState = {
        size: this.props.size,
        bgColor: this.props.bgColor,
        hoveringOver: false,
        colorPickerIsOpen: false,
        settingsIsOpen: false
    }

    getClasses(): string | undefined {
        return 'col-12 col-md-' + this.state.size;
    }
    getStyles(): React.CSSProperties | undefined {
        return { backgroundColor: this.props.bgColor, minHeight: '100vh', position: 'relative' }
    }

    toggleBgColorPicker = () => {
        this.setState({ colorPickerIsOpen: !this.state.colorPickerIsOpen });
    }

    renderColorPicker = () => {
        if (this.state.colorPickerIsOpen) {
            return <SketchPicker className='color-picker' onChange={(e) => { this.props.onBgColorChange(this.props.id, e.hex) }} color={this.props.bgColor} />
        }

    }

    colSettingRender = () => {
        return (
            <div className="row">
                <div className="col">
                    <div style={{ position: 'relative' }}>
                        <span onClick={this.toggleBgColorPicker} className="btn p-3 d-inline-block" style={{ backgroundColor: this.props.bgColor }}></span>
                        {this.renderColorPicker()}
                    </div>
                </div>
            </div>
        );
    }

    renderColOverlay = () => {
        if (!this.state.hoveringOver) return null;

        return (
            <div className='w-100 h-100 col-overlay'>
                <span onClick={this.openSettings} className="mdi mdi-cog btn icon cog" data-toggle="modal" data-target={'#settings-' + this.props.id}></span>
                <div className='btn-plus'>
                    <span className="mdi mdi-plus-circle btn icon" ></span>
                    <div className="position-absolute element-adder">
                        <Card>
                            <Card.Header style={{ whiteSpace: 'nowrap' }}>Add New Element</Card.Header>
                            <Card.Body></Card.Body>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }

    handelMouseEnter = () => {
        if (this.props.lockOverlay) return;
        this.setState({ hoveringOver: true });
    }
    handelMouseLeave = () => {
        if (this.props.lockOverlay) return;
        this.setState({ hoveringOver: false });
    }

    openSettings = () => {
        this.setState({ settingsIsOpen: true });
        this.setState({ hoveringOver: false });
    }

    handelCloseSettings = () => {
        this.setState({ settingsIsOpen: false });
        ColumnsManager.runMouseDetection();
    }


    checkMouseOver = () => {
        if (isMouseHoveringOverCol(this)) {
            this.setState({ hoveringOver: true });
        }
    }

    render() {
        return (
            <div
                ref={this.colRoot}
                onMouseEnter={this.handelMouseEnter}
                onMouseLeave={this.handelMouseLeave}
                className={this.getClasses()}
                style={this.getStyles()}>
                {this.renderColOverlay()}
                <SettingsDialog show={this.state.settingsIsOpen} onClose={this.handelCloseSettings} id={'settings-' + this.props.id} title='Column Settings' >
                    {this.colSettingRender()}
                </SettingsDialog>
            </div>
        );
    }

}

export default ColumnOfContent;