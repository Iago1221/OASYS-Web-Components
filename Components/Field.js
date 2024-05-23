class Field extends Component {
    
    init() {
        super.init();
        this.type  = '';
        this.name  = '';
        this.title = '';
        this.visible = true;
    }

    html() {}

    createInput() {}

    setType(type) {
        this.type = type;
    }

    setName(name) {
        this.name = name;
    }

    setTitle(title) {
        this.title = title;
    }

    setVisible(visible) {
        this.visible = visible;
    }
}

customElements.define('field-component', Field);