"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidate = exports.preValidate = void 0;
function preValidate(ast, query) {
    const astArray = Array.isArray(ast) ? ast : [ast];
    const validation = {
        valid: true,
        message: [],
    };
    astArray.forEach((astObject) => {
        Object.keys(astObject).forEach((key) => {
            switch (key) {
                case 'columns':
                case 'distinct':
                case 'into':
                case 'limit':
                case 'orderby':
                case 'union':
                case 'where':
                case '_next':
                    // all good
                    break;
                case 'set_op':
                    if (astObject.set_op !== 'union') {
                        validation.valid = false;
                        validation.message.push('Only UNION is supported');
                    }
                    break;
                case 'from':
                    if (!astObject.from) {
                        validation.valid = false;
                        validation.message.push('Missing from clause');
                    }
                    else if (astObject.from.length === 0) {
                        validation.valid = false;
                        validation.message.push('From clause must not be empty');
                    }
                    else {
                        astObject.from.forEach((astObjectFrom) => {
                            if (/https?:\/\//.test(astObjectFrom.table) === false) {
                                validation.valid = false;
                                validation.message.push('Invalid website URL');
                            }
                        });
                    }
                    break;
                case 'type':
                    if (astObject.type !== 'select') {
                        validation.valid = false;
                        validation.message.push(`Unsupported query type: ${astObject.type}`);
                    }
                    break;
                default:
                    if (!!astObject[key]) {
                        validation.valid = false;
                        validation.message.push(`Unsupported query clause: ${key}`);
                    }
                    break;
            }
        });
    });
    return validation;
}
exports.preValidate = preValidate;
function postValidate(properties, where) {
    const specialPresets = ['emails', 'headers', 'images', 'links', 'scripts', 'stylesheets', 'tables'];
    const specialPresetsInUse = properties.filter((property) => specialPresets.includes(property.name));
    if (specialPresetsInUse.length > 1) {
        throw new Error('Only one of scripts, links, images, stylesheets, emails, headers is supported');
    }
    if (specialPresetsInUse.length === 1 && where.selectors.length > 0) {
        throw new Error('Special presets and selectors are not supported together');
    }
    return true;
}
exports.postValidate = postValidate;
