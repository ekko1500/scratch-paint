import paper from "@turbowarp/paper";
import classNames from "classnames";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import PaperCanvas from "../../containers/paper-canvas.jsx";
import ScrollableCanvas from "../../containers/scrollable-canvas.jsx";

import BitBrushMode from "../../containers/bit-brush-mode.jsx";
import BitLineMode from "../../containers/bit-line-mode.jsx";
import BitOvalMode from "../../containers/bit-oval-mode.jsx";
import BitRectMode from "../../containers/bit-rect-mode.jsx";
import BitFillMode from "../../containers/bit-fill-mode.jsx";
import BitEraserMode from "../../containers/bit-eraser-mode.jsx";
import BitSelectMode from "../../containers/bit-select-mode.jsx";
import Box from "../box/box.jsx";
import Button from "../button/button.jsx";
import ButtonGroup from "../button-group/button-group.jsx";
import BrushMode from "../../containers/brush-mode.jsx";
import EraserMode from "../../containers/eraser-mode.jsx";
import FillColorIndicatorComponent from "../../containers/fill-color-indicator.jsx";
import FillMode from "../../containers/fill-mode.jsx";
import InputGroup from "../input-group/input-group.jsx";
import LineMode from "../../containers/line-mode.jsx";
import Loupe from "../loupe/loupe.jsx";
import FixedToolsContainer from "../../containers/fixed-tools.jsx";
import ModeToolsContainer from "../../containers/mode-tools.jsx";
import OvalMode from "../../containers/oval-mode.jsx";
import RectMode from "../../containers/rect-mode.jsx";
import ReshapeMode from "../../containers/reshape-mode.jsx";
import SelectMode from "../../containers/select-mode.jsx";
import StrokeColorIndicatorComponent from "../../containers/stroke-color-indicator.jsx";
import StrokeWidthIndicatorComponent from "../../containers/stroke-width-indicator.jsx";
import TextMode from "../../containers/text-mode.jsx";

import Formats, { isBitmap, isVector } from "../../lib/format";
import styles from "./paint-editor.css";

import bitmapIcon from "./icons/bitmap.svg";
import zoomInIcon from "./icons/zoom-in.svg";
import zoomOutIcon from "./icons/zoom-out.svg";
import zoomResetIcon from "./icons/zoom-reset.svg";
import themeIcon from "./icons/theme.svg";
import MenuIcon from "./menu.png";

const messages = defineMessages({
    bitmap: {
        defaultMessage: "Convert to Bitmap",
        description:
            "Label for button that converts the paint editor to bitmap mode",
        id: "paint.paintEditor.bitmap",
    },
    vector: {
        defaultMessage: "Convert to Vector",
        description:
            "Label for button that converts the paint editor to vector mode",
        id: "paint.paintEditor.vector",
    },
});

function PaintEditorComponent(props) {
    const [bottomBarOpen, setBottomBarOpen] = useState(false);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            // First element: "paint-editor_canvas-controls_3qGlY"
            const canvasControls = document.querySelector(
                ".paint-editor_canvas-controls_3qGlY"
            );
            const hideStageButton = document.querySelector(
                ".toggle-buttons_button_uta83.sa-hide-stage-button"
            );

            // hideStageButton.style.display = "none";

            // if (canvasControls) {
            //     canvasControls.style.position = "absolute";
            //     canvasControls.style.bottom = "6px";
            //     canvasControls.style.display = "flex";
            //     canvasControls.style.alignItems = "center";
            //     canvasControls.style.justifyContent = "space-between";
            //     // canvasControls.style.width = "100%";
            //     canvasControls.style.background = "rgb(17, 17, 17)";
            //     canvasControls.style.padding = "0 10px";
            // }

            // Second element: "paint-editor_editor-container-top_XIsRw"
            const editorContainerTop = document.querySelector(
                ".paint-editor_editor-container-top_XIsRw"
            );

            // Disconnect the observer once both elements are styled
            if (canvasControls && editorContainerTop) {
                observer.disconnect();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    //ekko was here
    const toggleBottomBar = async () => {
        // Toggle the bottom bar state
        setBottomBarOpen(!bottomBarOpen);

        // Click the button with the specified class name
        const hideStageButton = document.querySelector(
            ".toggle-buttons_button_uta83.sa-hide-stage-button"
        );
        if (hideStageButton) {
            hideStageButton.click();
        }

        // const menuDiv = document.querySelector(
        //     ".paint-editor_editor-container-top_XIsRw"
        // );
        // const stageDiv = document.querySelector(
        //     ".gui_stage-and-target-wrapper_2TUbW.box_box_tWy-0"
        // );

        const divFillColors = document.querySelectorAll(
            ".label_input-group_cypxi"
        );
        if (divFillColors.length > 0) {
            divFillColors.forEach((divFillColor) => {
                divFillColor.style.display = "flex";
                divFillColor.style.flexDirection = "row";
                divFillColor.style.width = "100%";
                divFillColor.style.justifyContent = "center";
                divFillColor.style.alignItems = "center";
                divFillColor.style.margin = "0";
            });
        }
    };

    useEffect(() => {}, [bottomBarOpen]);

    useEffect(() => {
        console.log("goodbye from paint editor");
        const divStage = document.querySelector(
            ".gui_stage-and-target-wrapper_2TUbW.box_box_tWy-0"
        );

        return () => {
            divStage.style.display = "flex";
        };
    }, []);

    // useEffect(() => {
    //     const observer = new MutationObserver((mutationsList, observer) => {
    //         const divFillColor = document.querySelector(
    //             ".label_input-group_cypxi"
    //         );
    //         if (divFillColor) {
    //             divFillColor.style.display = "flex";
    //             divFillColor.style.flexDirection = "row";
    //             divFillColor.style.width = "100%";
    //             divFillColor.style.justifyContent = "center";
    //             divFillColor.style.alignItems = "center";
    //             divFillColor.style.margin = "0";
    //             observer.disconnect(); // Stop observing once the element is found and styled
    //         }
    //     });

    //     observer.observe(document.body, { childList: true, subtree: true });

    //     return () => observer.disconnect(); // Cleanup observer on unmount
    // }, []);

    useEffect(() => {
        const observer = new MutationObserver((mutationsList, observer) => {
            const divFillColors = document.querySelectorAll(
                ".label_input-group_cypxi"
            );
            if (divFillColors.length > 0) {
                divFillColors.forEach((divFillColor) => {
                    divFillColor.style.display = "flex";
                    divFillColor.style.flexDirection = "row";
                    divFillColor.style.width = "100%";
                    divFillColor.style.justifyContent = "center";
                    divFillColor.style.alignItems = "center";
                    divFillColor.style.margin = "0";
                });
                observer.disconnect(); // Stop observing once the elements are found and styled
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    useEffect(() => {
        const checkAndSetPadding = () => {
            const tabList = document.querySelector(
                ".react-tabs_react-tabs__tab-list_zI_eR.gui_tab-list_3r8RB"
            );
            const editorContainerTop = document.querySelector(
                ".paint-editor_editor-container-top_XIsRw"
            );

            if (tabList && editorContainerTop) {
                editorContainerTop.style.paddingTop = "40px";
            } else if (editorContainerTop) {
                editorContainerTop.style.paddingTop = "0px";
            }
        };

        // Initial check
        checkAndSetPadding();

        // Set up click listeners for both buttons
        const floatingButton = document.querySelector(".floating-btn-toggle");
        const toggleButton = document.querySelector(
            ".button_button_2fP99.paint-editor_toggle-button_2fEdU"
        );

        if (floatingButton) {
            floatingButton.addEventListener("click", checkAndSetPadding);
        }
        if (toggleButton) {
            toggleButton.addEventListener("click", checkAndSetPadding);
        }

        // Cleanup
        return () => {
            if (floatingButton) {
                floatingButton.removeEventListener("click", checkAndSetPadding);
            }
            if (toggleButton) {
                toggleButton.removeEventListener("click", checkAndSetPadding);
            }
        };
    }, []);

    return (
        <div
            className={styles.editorContainer}
            dir={props.rtl ? "rtl" : "ltr"}
            data-paint-theme={props.theme}
        >
            <div className={styles.topAlignRow}>
                {/* Modes */}
                {props.canvas !== null && isVector(props.format) ? ( // eslint-disable-line no-negated-condition
                    <div className={styles.modeSelector}>
                        <SelectMode onUpdateImage={props.onUpdateImage} />
                        <ReshapeMode onUpdateImage={props.onUpdateImage} />
                        <BrushMode onUpdateImage={props.onUpdateImage} />
                        <EraserMode onUpdateImage={props.onUpdateImage} />
                        <FillMode onUpdateImage={props.onUpdateImage} />
                        <TextMode
                            textArea={props.textArea}
                            onUpdateImage={props.onUpdateImage}
                        />
                        <LineMode onUpdateImage={props.onUpdateImage} />
                        <OvalMode onUpdateImage={props.onUpdateImage} />
                        <RectMode onUpdateImage={props.onUpdateImage} />
                    </div>
                ) : null}

                {props.canvas !== null && isBitmap(props.format) ? ( // eslint-disable-line no-negated-condition
                    <div className={styles.modeSelector}>
                        <BitBrushMode onUpdateImage={props.onUpdateImage} />
                        <BitLineMode onUpdateImage={props.onUpdateImage} />
                        <BitOvalMode onUpdateImage={props.onUpdateImage} />
                        <BitRectMode onUpdateImage={props.onUpdateImage} />
                        <TextMode
                            isBitmap
                            textArea={props.textArea}
                            onUpdateImage={props.onUpdateImage}
                        />
                        <BitFillMode onUpdateImage={props.onUpdateImage} />
                        <BitEraserMode onUpdateImage={props.onUpdateImage} />
                        <BitSelectMode onUpdateImage={props.onUpdateImage} />
                    </div>
                ) : null}

                <div className={styles.controlsContainer}>
                    {/* Canvas */}
                    <ScrollableCanvas
                        canvas={props.canvas}
                        hideScrollbars={props.isEyeDropping}
                        style={styles.canvasContainer}
                    >
                        <PaperCanvas
                            canvasRef={props.setCanvas}
                            image={props.image}
                            imageFormat={props.imageFormat}
                            imageId={props.imageId}
                            rotationCenterX={props.rotationCenterX}
                            rotationCenterY={props.rotationCenterY}
                            theme={props.theme}
                            zoomLevelId={props.zoomLevelId}
                            onUpdateImage={props.onUpdateImage}
                        />
                        <textarea
                            className={styles.textArea}
                            ref={props.setTextArea}
                            spellCheck={false}
                        />
                        {props.isEyeDropping &&
                        props.colorInfo !== null &&
                        !props.colorInfo.hideLoupe ? (
                            <Box className={styles.colorPickerWrapper}>
                                <Loupe
                                    colorInfo={props.colorInfo}
                                    pixelRatio={paper.project.view.pixelRatio}
                                    theme={props.theme}
                                />
                            </Box>
                        ) : null}
                    </ScrollableCanvas>
                    <Button
                        className={styles.toggleButton}
                        onClick={toggleBottomBar}
                        style={{
                            // ekko was here
                            right: bottomBarOpen ? "150px" : "20px",
                            bottom: bottomBarOpen ? "50px" : "20px",
                        }}
                    >
                        <img
                            className={styles.toggleButtonIcon}
                            draggable={false}
                            src={MenuIcon}
                        />
                    </Button>
                    {bottomBarOpen && (
                        <div className={styles.canvasControls}>
                            {/* {isVector(props.format) ? (
                                <>
                                    <Button
                                        className={styles.bitmapButton}
                                        onClick={props.onSwitchToBitmap}
                                    >
                                        <img
                                            className={styles.bitmapButtonIcon}
                                            draggable={false}
                                            src={bitmapIcon}
                                        />
                                        <span className={styles.buttonText}>
                                            {props.intl.formatMessage(
                                                messages.bitmap
                                            )}
                                        </span>
                                    </Button>{" "}
                                </>
                            ) : isBitmap(props.format) ? (
                                <Button
                                    className={styles.bitmapButton}
                                    onClick={props.onSwitchToVector}
                                >
                                    <img
                                        className={styles.bitmapButtonIcon}
                                        draggable={false}
                                        src={bitmapIcon}
                                    />
                                    <span className={styles.buttonText}>
                                        {props.intl.formatMessage(
                                            messages.vector
                                        )}
                                    </span>
                                </Button>
                            ) : null} */}
                            {/* Zoom controls */}
                            <InputGroup className={styles.s}>
                                <ButtonGroup>
                                    <Button
                                        className={styles.buttonGroupButton}
                                        onClick={props.onZoomOut}
                                    >
                                        <img
                                            alt="Zoom Out"
                                            className={
                                                styles.buttonGroupButtonIcon
                                            }
                                            draggable={false}
                                            src={zoomOutIcon}
                                        />
                                    </Button>
                                    <Button
                                        className={styles.buttonGroupButton}
                                        onClick={props.onZoomReset}
                                    >
                                        <img
                                            alt="Zoom Reset"
                                            className={
                                                styles.buttonGroupButtonIcon
                                            }
                                            draggable={false}
                                            src={zoomResetIcon}
                                        />
                                    </Button>
                                    <Button
                                        className={styles.buttonGroupButton}
                                        onClick={props.onZoomIn}
                                    >
                                        <img
                                            alt="Zoom In"
                                            className={
                                                styles.buttonGroupButtonIcon
                                            }
                                            draggable={false}
                                            src={zoomInIcon}
                                        />
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <Button
                                        className={styles.buttonGroupButton}
                                        onClick={props.onChangeTheme}
                                    >
                                        <img
                                            alt="Change theme"
                                            className={
                                                styles.buttonGroupButtonIcon
                                            }
                                            draggable={false}
                                            src={themeIcon}
                                        />
                                    </Button>
                                </ButtonGroup>
                            </InputGroup>
                        </div>
                    )}
                </div>
            </div>
            {props.canvas !== null ? ( // eslint-disable-line no-negated-condition
                <>
                    {bottomBarOpen && (
                        <div className={styles.editorContainerTop}>
                            {/* First row */}
                            <div className={styles.row}>
                                <FixedToolsContainer
                                    canRedo={props.canRedo}
                                    canUndo={props.canUndo}
                                    name={props.name}
                                    onRedo={props.onRedo}
                                    onUndo={props.onUndo}
                                    onUpdateImage={props.onUpdateImage}
                                    onUpdateName={props.onUpdateName}
                                    width={props.width}
                                />
                            </div>
                            {/* Second Row */}
                            {isVector(props.format) ? (
                                <div className={styles.row}>
                                    <InputGroup
                                        className={classNames(
                                            styles.row,
                                            styles.modDashedBorder,
                                            styles.modLabeledIconHeight
                                        )}
                                    >
                                        {/* fill */}
                                        <FillColorIndicatorComponent
                                            className={styles.modMarginAfter}
                                            onUpdateImage={props.onUpdateImage}
                                        />
                                        {/* stroke */}
                                        <StrokeColorIndicatorComponent
                                            onUpdateImage={props.onUpdateImage}
                                        />
                                        {/* stroke width */}
                                        <StrokeWidthIndicatorComponent
                                            onUpdateImage={props.onUpdateImage}
                                        />
                                    </InputGroup>
                                    <InputGroup className={styles.modModeTools}>
                                        <ModeToolsContainer
                                            onUpdateImage={props.onUpdateImage}
                                            onManageFonts={props.onManageFonts}
                                        />
                                    </InputGroup>
                                </div>
                            ) : isBitmap(props.format) ? (
                                <div className={styles.row}>
                                    <InputGroup
                                        className={classNames(
                                            styles.row,
                                            styles.modDashedBorder,
                                            styles.modLabeledIconHeight
                                        )}
                                    >
                                        {/* fill */}
                                        <FillColorIndicatorComponent
                                            className={styles.modMarginAfter}
                                            onUpdateImage={props.onUpdateImage}
                                        />
                                    </InputGroup>
                                    <InputGroup className={styles.modModeTools}>
                                        <ModeToolsContainer
                                            onUpdateImage={props.onUpdateImage}
                                            onManageFonts={props.onManageFonts}
                                        />
                                    </InputGroup>
                                </div>
                            ) : null}
                        </div>
                    )}
                </>
            ) : null}
        </div>
    );
}

PaintEditorComponent.propTypes = {
    canRedo: PropTypes.func.isRequired,
    canUndo: PropTypes.func.isRequired,
    canvas: PropTypes.instanceOf(Element),
    colorInfo: Loupe.propTypes.colorInfo,
    format: PropTypes.oneOf(Object.keys(Formats)),
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(HTMLImageElement),
    ]),
    imageFormat: PropTypes.string,
    imageId: PropTypes.string,
    intl: intlShape,
    isEyeDropping: PropTypes.bool,
    name: PropTypes.string,
    onChangeTheme: PropTypes.func.isRequired,
    onManageFonts: PropTypes.func,
    onRedo: PropTypes.func.isRequired,
    onSwitchToBitmap: PropTypes.func.isRequired,
    onSwitchToVector: PropTypes.func.isRequired,
    onUndo: PropTypes.func.isRequired,
    onUpdateImage: PropTypes.func.isRequired,
    onUpdateName: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onZoomReset: PropTypes.func.isRequired,
    rotationCenterX: PropTypes.number,
    rotationCenterY: PropTypes.number,
    rtl: PropTypes.bool,
    setCanvas: PropTypes.func.isRequired,
    setTextArea: PropTypes.func.isRequired,
    textArea: PropTypes.instanceOf(Element),
    theme: PropTypes.string,
    width: PropTypes.number,
    zoomLevelId: PropTypes.string,
};

export default injectIntl(PaintEditorComponent);
