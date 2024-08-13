import React from "react";
import "./Table.style.scss";

interface Column {
	key: string;
	title: string;
}

interface TableProps {
	columns: Column[];
}

function Table(props: TableProps) {
	const { columns } = props;
	return (
		<div className="react-table-suite-container">
			<table className="react-table-suite">
				<thead>
					<tr>
						{columns.map((column) => (
							<th key={column.key}>{column.title}</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>2</td>
					</tr>
					<tr>
						<td>4</td>
						<td>5</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Table;
