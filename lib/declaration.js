var Node   = require('./node');
var vendor = require('./vendor');

// CSS declaration like “color: black” in rules
class Declaration extends Node {
    constructor(defaults) {
        this.type = 'decl';
        super(defaults);
    }

    styleMap() {
        return {
            beforeDecl: this.before,
            colon:      this.between
        };
    }

    // Stringify declaration
    stringify(builder, semicolon) {
        var before = this.style('beforeDecl');
        if ( before ) builder(before);

        var between = this.style('colon');
        var string  = this.prop + between + this.stringifyRaw('value');

        if ( this.important ) {
            string += this._important || ' !important';
        }

        if ( semicolon ) string += ';';
        builder(string, this);
    }

    // Clean `before` and `between` property in clone to copy it from new
    // parent rule
    clone(overrides = { }) {
        var cloned = super.clone(overrides);
        delete cloned.before;
        delete cloned.between;
        return cloned;
    }
}

module.exports = Declaration;
