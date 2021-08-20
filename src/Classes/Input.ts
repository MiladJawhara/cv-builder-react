
let hasInitialized: boolean = false;
let mousePos: { x: number, y: number } = { x: 0, y: 0 };
export default class Input {
    public static init() {
        if (hasInitialized) {
            console.warn('You are trying to reinitialize the input manager!!');
            return;
        }

        document.addEventListener('mousemove', (e) => {
            mousePos = {
                x: e.clientX,
                y: e.clientY
            }
        });

        hasInitialized = true;
    }


    public static getMousePos() {
        return mousePos;
    }


}