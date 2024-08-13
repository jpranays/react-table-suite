import React from "react";
import "./Table.style.scss";

interface Column {
	/*
	 * Unique key for the column
	 */
	key: string;
	/*
	 * Title of the column
	 */
	title: string;
	/*
	 * Visibility of the column
	 */
	show?: boolean;
	/*
	 * Filter configuration of the column
	 */
	filter?: {
		/*
		 * Visibility of the filter
		 */
		show: boolean;
		/* Visibility of filter to show/hide in the global filter */
		showGlobalFilter: boolean;
	};
	/*
	 * Sort configuration of the column
	 */
	sort?: {
		/*
		 * Visibility of the sort
		 */
		show: boolean;
	};
	/*
	 * Minimum width of the column
	 */
	minWidth?: number;
	/*
	 * Resizable configuration of the column
	 */
	resizable?: boolean;
}

interface TableProps {
	/*
	 * Columns of the table
	 */
	columns: Column[];
	/*
	 * Span the table to full width
	 * Default: true
	 */
	fullWidth?: boolean;
}

function Table(props: TableProps) {
	const { columns = [], fullWidth = true } = props;
	return (
		<div className={`react-table-suite-container ${fullWidth && "fw"}`}>
			<div className="react-table-suite-column-container">
				{columns.map(
					({
						key,
						title,
						filter = {
							show: true,
						},
						sort = {
							show: true,
						},
						minWidth,
						resizable = false,
						show = true,
					}) => {
						return (
							<React.Fragment key={key}>
								{show === true && (
									<div
										className="react-table-suite-column"
										style={{ minWidth: minWidth ? `${minWidth}px` : "max-content" }}
									>
										<div className="react-table-suite-column-title">
											{title}
										</div>
										{/* <ColumnFilterPopover
										columnFilter={columnFilter}
										setColumnFilter={setColumnFilter}
										col={col}
										shiftRight={index === 0 ? true : false}
										shiftLeft={
											[
												columns.length - 1,
												columns.length - 2,
												columns.length - 3,
											].includes(index)
												? true
												: false
										}
										filter={filter}
										setFetchList={setFetchList}
										setFilter={setFilter}
									/> */}

										<div className="react-table-suite-column-icons-wrapper">
											{/* <div className="priority-container">
											{sort?.find(({ name }) => name === col.key)
												? sort?.find(({ name }) => name === col.key)?.priority
												: null}
										</div> */}

											<div className="react-table-suite-column-icons">
												{sort?.show !== false && (
													<div className="sort-icons-container">
														{/* <VscTriangleUp
														className={`sort-icon up ${
															sort?.find(
																({ name, order }) =>
																	name === col.key && order === ASCENDING
															) && ACTIVE
														} ${
															sort?.find(
																({ name, order }) =>
																	name === col.key && order === DESCENDING
															) && SEMI_ACTIVE
														}`}
														onClick={() => {
															handleSort(
																col.key,
																ASCENDING,
																sort,
																setSort,
																setReset,
																setTableSorted
															);
														}}
														size={15}
													/> */}

														{/* <VscTriangleDown
														className={`sort-icon down ${
															sort?.find(
																({ name, order }) =>
																	name === col.key && order === DESCENDING
															) && ACTIVE
														} ${
															sort?.find(
																({ name, order }) =>
																	name === col.key && order === ASCENDING
															) && SEMI_ACTIVE
														}`}
														onClick={() => {
															handleSort(
																col.key,
																DESCENDING,
																sort,
																setSort,
																setReset,
																setTableSorted
															);
														}}
														size={15}
													/> */}
													</div>
												)}
												{filter?.show === true ? (
													// ? filter?.find(
													// 		({ name, status }) => name === col.key && status
													//   )
													// 	? filteredIcon(col, setColumnFilter)
													// 	: filterIcon(col, setColumnFilter)
													<div className="filter-icons-container">
														{/* <span>filter icon</span> */}
													</div>
												) : null}
											</div>
										</div>
										{/* {col.resizable === true && (
										<div
											// onMouseDown={() => mouseDown(index)}
											className={`resize-handle`}
										/>
									)} */}
									</div>
								)}
							</React.Fragment>
						);
					}
				)}
			</div>
		</div>
	);
}

export default Table;
