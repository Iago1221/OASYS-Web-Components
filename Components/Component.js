class  Component extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.init();
    }

    init() {
        this.draggableComponent = false;
        this.width      = 0;
        this.height     = 0;
    }

    render() {
        this.shadow.innerHTML = '';

        if (this.styles()) {
            this.shadow.appendChild(this.styles());
        }

        this.shadow.appendChild(this.html());

        return this;
    }

    styles() {
        const style = document.createElement('style');

        if (this.width || this.height) {
            
            if (this.width) {
                this.style.width = this.width;
            }
    
            if (this.height) {
                this.style.height = this.height;
            }
        }
        
        return style;
    }

    html() {}

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    createContanier() {
        return document.createElement('container-component');
    }

    /** @todo make ajax from controller witch route */
    doAjaxAction(event) {
        event.preventDefault();
    }

    connectedCallback() {
        this.render();
    }

    setDraggable(draggable = true) {
        this.draggableComponent = draggable; 
    }

    isDraggable() {
        return this.draggableComponent;
    }
}