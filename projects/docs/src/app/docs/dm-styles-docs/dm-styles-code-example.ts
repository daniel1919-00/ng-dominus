import {CodeExample} from "../../components/code-example/code-example";

export const dmStylesFlexExample: CodeExample = {
    html: ``,
    styles: ``,
    ts: ``
};

const namespace = 'dm:';

export interface ClassList {
    category: string;
    class: string;
    properties: string;
    forceFlagSupport: boolean;
    responsiveNamespacesSupport: boolean;
}

function getGridColumnClasses() {
    const columnWidths: {[key: number]: string} = {
        1: '8.33%',
        2: '16.6667%',
        3: '25%',
        4: '33.33%',
        5: '41.6667%',
        6: '50%',
        7: '58.33%',
        8: '66.6667%',
        9: '75%',
        10: '83.33%',
        11: '91.6667%',
        12: '100%'
    };
    const classes: ClassList[] = [];
    for(let i = 1; i < 13; ++i) {
        classes.push({
            category: 'grid',
            class: namespace + `col-${i}`,
            properties: `
            flex: 0 0 auto;
            padding: config.$grid-columns-padding;
            width: ${columnWidths[i]};
        `,
            forceFlagSupport: false,
            responsiveNamespacesSupport: true
        });
    }

    return classes;
}

export const classList: ClassList[] = [
    // Flexbox
    {
        category: 'flexbox',
        class: namespace + 'flex',
        properties: 'display: flex;',
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-row',
        properties: 'flex-direction: row;',
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-row-reverse',
        properties: 'flex-direction: row;',
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-column',
        properties: 'flex-direction: column;',
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-column-reverse',
        properties: 'flex-direction: column-reverse;',
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-wrap',
        properties: 'flex-wrap: wrap;',
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },

    // Grid
    {
        category: 'grid',
        class: namespace + 'grid',
        properties: `
            display: flex;
            flex-wrap: wrap;
        `,
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },
    {
        category: 'grid',
        class: namespace + 'col',
        properties: `
            flex-grow: 1;
            flex-basis: 0;
            padding: config.$grid-columns-padding;
        `,
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },
    {
        category: 'grid',
        class: namespace + 'col-fixed',
        properties: `
            flex: 0 0 auto;
            padding: config.$grid-columns-padding;
        `,
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },
    ...getGridColumnClasses(),

    // Events
];
