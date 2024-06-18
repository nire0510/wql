"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function extract(browser, query) {
    try {
        const data = (await browser.executeScript(async (query) => {
            const selector = query.where && Array.isArray(query.where.selectors) && query.where.selectors.join(', ') || '*';
            let elements;
            function mapper(property, element) {
                let value;
                switch (property.type) {
                    case 'method':
                        switch (property.name) {
                            case 'attr':
                                value = element.getAttribute(property.args[0].value);
                                break;
                            case 'data':
                                value = element.dataset[property.args[0].value];
                                break;
                            case 'rect':
                                value = element.getBoundingClientRect()[property.args[0].value];
                                break;
                            case 'style':
                                const propertyValue = property
                                    .args[0].value.replace(/([a-z\d])([A-Z])/g, '$1-$2')
                                    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1-$2')
                                    .toLowerCase();
                                value = window.getComputedStyle(element).getPropertyValue(propertyValue);
                                break;
                            default:
                                throw new Error(`Unknown method property: ${property.name}`);
                        }
                        break;
                    case 'preset':
                        switch (property.name) {
                            case 'headers':
                                value = element.textContent;
                                break;
                            case 'html':
                                value = element.outerHTML;
                                break;
                            case 'images':
                                value = element.getAttribute('src');
                                break;
                            case 'links':
                                value = element.getAttribute('href');
                                break;
                            case 'scripts':
                                value = element.getAttribute('src');
                                break;
                            case 'stylesheets':
                                value = element.href ||
                                    Array.from(element.cssRules)
                                        .map((rule) => rule.cssText)
                                        .join('');
                                break;
                            case 'tables':
                                value = Array.from(element.querySelectorAll('table')).map((table) => {
                                    const columns = Array.from(table.querySelectorAll('thead th, thead td, tr:first-child > th, tr:first-child > td')).map((th) => th.textContent || '');
                                    return Array.from(element.querySelectorAll('tr'))
                                        .filter((tr, index) => index > 1 || columns.length === 0)
                                        .map((tr) => Array.from(tr.querySelectorAll('td, th'))
                                        .reduce((row, td, index) => {
                                        (row[(columns && columns[index]) || `col${index}`] = td.textContent);
                                        return row;
                                    }, {}));
                                });
                                break;
                            case 'tag':
                                value = element.tagName;
                                break;
                            case 'text':
                                value = element.textContent;
                                break;
                            default:
                                throw new Error(`Unknown preset property: ${property.name}`);
                        }
                        break;
                    default:
                        throw new Error(`Unknown property type: ${property.type}`);
                }
                return value;
            }
            ['headers', 'images', 'links', 'scripts', 'stylesheets', 'tables'].forEach((preset) => {
                if (query.properties.map((property) => property.name).includes(preset)) {
                    switch (preset) {
                        case 'headers':
                            elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                            break;
                        case 'images':
                            elements = document.images;
                            break;
                        case 'links':
                            elements = document.links;
                            break;
                        case 'scripts':
                            elements = document.scripts;
                            break;
                        case 'stylesheets':
                            elements = document.styleSheets;
                            break;
                        case 'tables':
                            elements = document.querySelectorAll('table');
                            break;
                    }
                }
            });
            return Array.from(elements || document.querySelectorAll(selector)).map((element) => {
                const row = {};
                for (const property of query.properties) {
                    row[property.alias || property.name] = mapper(property, element);
                }
                if (query.where && Array.isArray(query.where.properties)) {
                    query.where.properties.forEach((property) => {
                        if (property.name in row === false) {
                            row[property.name] = mapper(property, element);
                        }
                    });
                }
                if (query.order) {
                    for (const order of query.order) {
                        if (order.name in row === false) {
                            row[order.name] = mapper(order, element);
                        }
                    }
                }
                return row;
            });
        }, query));
        return data;
    }
    catch (error) {
        throw new Error(`Unable to extract data: ${error}`);
    }
}
exports.default = extract;
