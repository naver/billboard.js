/**
 * Copyright (c) 2021 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/**
 * Constants values for plugin option
 * @ignore
 */
export {
	defaultStyle,
	tpl
};

const defaultStyle = {
	id: "__tableview-style__",
	class: "bb-tableview",
	rule: `.bb-tableview {
		border-collapse:collapse;
		border-spacing:0;
		background:#fff;
		min-width:100%;
		margin-top:10px;
		font-family:sans-serif;
		font-size:.9em;
	}
	.bb-tableview tr:hover {
		background:#eef7ff;
	}
	.bb-tableview thead tr {
		background:#f8f8f8;
	}
	.bb-tableview caption,.bb-tableview td,.bb-tableview th {
		text-align: center;
		border:1px solid silver;
		padding:.5em;
	}
	.bb-tableview caption {
		font-size:1.1em;
		font-weight:700;
		margin-bottom: -1px;
	}`
};

// template
const tpl = {
	body: `<caption>{=title}</caption>
		<thead><tr>{=thead}</tr></thead>
		<tbody>{=tbody}</tbody>`,
	thead: `<th scope="col">{=title}</th>`,
	tbodyHeader: `<th scope="row">{=value}</th>`,
	tbody: `<td>{=value}</td>`
};
