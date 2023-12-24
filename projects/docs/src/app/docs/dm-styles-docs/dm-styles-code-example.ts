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
    description: string;
    properties: string;
    /**
     * List of classes that when added alongside the main class, modifies its behaviour
     */
    modifiers: { className: string; description: string }[];
    forceFlagSupport: boolean;
    responsiveNamespacesSupport: boolean;
}

function getGridColumnClasses() {
    const maxColumns = 12;
    const columnWidths: { [key: number]: string } = {
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
    for (let i = 1; i <= maxColumns; ++i) {
        classes.push({
            category: 'grid',
            class: namespace + `col-${i}`,
            description: `Grid column size ${i}/${maxColumns}.`,
            properties: `
                width: ${columnWidths[i]};
            `,
            modifiers: [],
            forceFlagSupport: false,
            responsiveNamespacesSupport: true
        });
    }

    return classes;
}

export const classList: ClassList[] = [
    // General
    {
        category: 'general',
        class: namespace + 'no-padding',
        description: `Removes padding.`,
        properties: `
            padding: 0;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },

    {
        category: 'general',
        class: namespace + 'no-margin',
        description: `Removes margins`,
        properties: `
            margin: 0;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },

    {
        category: 'general',
        class: namespace + 'quote',
        description: `Wraps text in a formatted block.`,
        properties: `
            font-family: var(--dm-quote-font-family);
            display: inline-block;
            vertical-align: middle;
            white-space: pre-wrap;
            font-weight: var(--dm-quote-font-weight);
            padding: var(--dm-quote-padding);
            border-radius: var(--dm-quote-border-radius);
            color: var(--dm-quote-color);
            border: var(--dm-quote-border);
            margin: var(--dm-quote-margin);
        `,
        modifiers: [
            {className: 'code', description: 'Prevents collapsing of whitespace'}
        ],
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },

    // Flexbox
    {
        category: 'flexbox',
        class: namespace + 'flex',
        description: `Makes the element flex.`,
        properties: `
            display: flex;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-row',
        description: `Changes the flex direction to row.`,
        properties: `
            flex-direction: row;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-row-reverse',
        description: `Changes the flex row direction to be reversed.`,
        properties: `
            flex-direction: row;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-column',
        description: `Changes the flex direction to column.`,
        properties: `
            flex-direction: column;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-column-reverse',
        description: `Changes the flex column direction to be reversed.`,
        properties: `
            flex-direction: column-reverse;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'flex-wrap',
        description: `Makes the child elements inside the flexbox wrap.`,
        properties: `
            flex-wrap: wrap;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'justify-content-start',
        description: `Positions the child elements at the start of the flexbox.`,
        properties: `
            justify-content: flex-start;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'justify-content-end',
        description: `Positions the child elements at the end of the flexbox.`,
        properties: `
            justify-content: flex-end;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'justify-content-center',
        description: `Positions the child elements at the center of the flexbox.`,
        properties: `
            justify-content: center;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'justify-content-between',
        description: `Adds spaces between the child elements.`,
        properties: `
            justify-content: space-between;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'justify-content-around',
        description: `Adds spaces around the child elements.`,
        properties: `
            justify-content: space-around;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'justify-content-evenly',
        description: `Positions the child elements with equals spaces around them.`,
        properties: `
            justify-content: space-evenly;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-content-start',
        description: `Aligns the wrapped flex lines inside a flexbox. Note: this property takes effect only when flex-wrap is set to wrap or wrap-reverse and when there is extra space between the lines.`,
        properties: `
            align-content: flex-start;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-content-end',
        description: `Aligns the wrapped flex lines inside a flexbox. Note: this property takes effect only when flex-wrap is set to wrap or wrap-reverse and when there is extra space between the lines.`,
        properties: `
            align-content: flex-end;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-content-center',
        description: `Aligns the wrapped flex lines inside a flexbox. Note: this property takes effect only when flex-wrap is set to wrap or wrap-reverse and when there is extra space between the lines.`,
        properties: `
            align-content: center;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-content-between',
        description: `Aligns the wrapped flex lines inside a flexbox. Note: this property takes effect only when flex-wrap is set to wrap or wrap-reverse and when there is extra space between the lines.`,
        properties: `
            align-content: space-between;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-content-around',
        description: `Aligns the wrapped flex lines inside a flexbox. Note: this property takes effect only when flex-wrap is set to wrap or wrap-reverse and when there is extra space between the lines.`,
        properties: `
            align-content: space-around;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-content-evenly',
        description: `Aligns the wrapped flex lines inside a flexbox. Note: this property takes effect only when flex-wrap is set to wrap or wrap-reverse and when there is extra space between the lines.`,
        properties: `
            align-content: space-evenly;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-items-stretch',
        description: `The child elements are stretched to fit the size of the flexbox along the cross axis.`,
        properties: `
            align-items: stretch;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-items-start',
        description: `The child elements are positioned at the start of the cross axis.`,
        properties: `
            align-items: flex-start;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-items-center',
        description: `The child elements are positioned at the center of the cross axis.`,
        properties: `
            align-items: center;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-items-end',
        description: `The child elements are positioned at the end of the cross axis.`,
        properties: `
            align-items: center;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },
    {
        category: 'flexbox',
        class: namespace + 'align-items-end',
        description: `The child elements are positioned so that their baselines align.`,
        properties: `
            align-items: baseline;
        `,
        modifiers: [],
        forceFlagSupport: true,
        responsiveNamespacesSupport: false
    },

    // Grid
    {
        category: 'grid',
        class: namespace + 'grid',
        description: `This element becomes a grid container, and will arrange all elements inside that has the class dm:col-* in a grid.`,
        properties: `
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding-top: calc(var(--dm-config-grid-columns-padding) * -1);
            padding-right: calc(var(--dm-config-grid-columns-padding) * -1);
            padding-left: calc(var(--dm-config-grid-columns-padding) * -1);
        `,
        modifiers: [],
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },
    {
        category: 'grid',
        class: namespace + 'col',
        description: `Element becomes a column inside the grid`,
        properties: `
            flex-grow: 1;
            flex-basis: 0;
        `,
        modifiers: [],
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },
    {
        category: 'grid',
        class: namespace + 'col-fixed',
        description: `Elements will only occupy as much space as is needed and will not shrink or grow.`,
        properties: `
            flex: 0 0 auto;
        `,
        modifiers: [],
        forceFlagSupport: false,
        responsiveNamespacesSupport: false
    },
    ...getGridColumnClasses(),

    // Events
];
